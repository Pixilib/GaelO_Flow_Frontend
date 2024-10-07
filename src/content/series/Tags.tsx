import { useState } from "react"
import { getInstancesOfSeries } from "../../services/orthanc"
import { Input, Spinner } from "../../ui"
import { useCustomQuery } from "../../utils"
import { instanceHeader, instanceTags } from "../../services/instances"

type TagsProps = {
    seriesId: string
}
const Tags = ({ seriesId }: TagsProps) => {

    const { data: instances } = useCustomQuery(['series', seriesId, 'instances'], () => getInstancesOfSeries(seriesId))
    const [instanceNumber, setInstanceNumber] = useState<number>(1)

    const currentInstanceId = (instanceNumber != null && instances != null) ? instances[instanceNumber - 1].id : null

    const { data: header } = useCustomQuery(
        ['instances', currentInstanceId, 'metadata'],
        () => instanceHeader(currentInstanceId),
        {
            enabled: (currentInstanceId !== null)
        }
    )

    const { data: tags } = useCustomQuery(
        ['instances', currentInstanceId, 'tags'],
        () => instanceTags(currentInstanceId),
        {
            enabled: (currentInstanceId !== null)
        }
    )

    const json = JSON.parse(JSON.stringify(header, null, 2))
    const json_values = Object.values(json)
    var names_list = []
    var values_list = []
    for (var index = 0; index < json_values.length; index++) {
        names_list.push(json_values[index]["Name"])
        values_list.push(json_values[index]["Value"])
    }
    const jsonNameValues = Object.fromEntries(names_list.map((key, index) => [key, values_list[index]]));

    const json2 = JSON.parse(JSON.stringify(tags, null, 2))
    const json_values2 = Object.values(json2)
    var names_list2 = []
    var values_list2 = []
    for (var index = 0; index < json_values2.length; index++) {
        names_list2.push(json_values2[index]["Name"])
        values_list2.push(json_values2[index]["Value"])
    }
    const jsonNameValues2 = Object.fromEntries(names_list2.map((key, index) => [key, values_list2[index]]));

    if (!instances) return <Spinner />
    return (
        <>
            <Input label="Instance Number" min={1} max={instances.length} value={instanceNumber ?? 1} onChange={(event) => setInstanceNumber(Number(event.target?.value))} />
            <pre>
                {Object.entries(jsonNameValues).map(([key, value]) => (
                    <div key={key}>
                        <strong>{key}:</strong> {JSON.stringify(value)}
                    </div>
                ))}
                <hr />
                {Object.entries(jsonNameValues2).map(([key, value]) => (
                    <div key={key}>
                        <strong>{key}:</strong> {JSON.stringify(value)}
                    </div>
                ))}
                {/* {JSON.stringify(header, null, 2)}  */}
                {/* {JSON.stringify(tags, null, 2)} */}
            </pre>
        </>
    )
}

export default Tags