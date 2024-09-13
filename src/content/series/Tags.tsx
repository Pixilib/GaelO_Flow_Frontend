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
    const [instanceNumber, setInstanceNumber] = useState<number | null>(null)

    const currentInstanceId = instanceNumber!=null ? instances[instanceNumber].id : null

    const {data : header}  = useCustomQuery(
        ['instances', currentInstanceId, 'metadata'],
        () => instanceHeader(instances[instanceNumber].id),{
            enabled : (instanceNumber !== null)
        }
    )

    const {data : tags}  = useCustomQuery(
        ['instances', currentInstanceId, 'tags'],
        () => instanceTags(instances[instanceNumber].id),{
            enabled : (instanceNumber !== null)
        }
    )

    if (!instances) return <Spinner />
    return (
        <>
            <Input min={1} max={instances.length} value={instanceNumber ?? 0 }  onChange={(event) => setInstanceNumber(Number(event.target?.value))} />
            <pre>
                {JSON.stringify(header, null, 2)}
                {JSON.stringify(tags, null, 2)}
            </pre>
        </>
    )
}

export default Tags