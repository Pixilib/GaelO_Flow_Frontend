import { useMemo, useState } from "react"
import { getInstancesOfSeries } from "../../services/orthanc"
import { Input, Spinner } from "../../ui"
import { useCustomQuery } from "../../utils"
import { instanceHeader, instanceTags } from "../../services/instances"

type TagsProps = {
    seriesId: string
}
const Tags = ({ seriesId }: TagsProps) => {

    const { data: instances } = useCustomQuery(['series', seriesId, 'instances'], () => getInstancesOfSeries(seriesId))
    const [instanceNumber, setInstanceNumber] = useState<number>(0)

    const currentInstanceId = useMemo(()=>{
        if(!instances ) return null
        return instances[instanceNumber].id


    }, [instances, instanceNumber])


    const { data: header } = useCustomQuery(
        ['instances', currentInstanceId, 'metadata'],
        () => instanceHeader(currentInstanceId),
        {
            enabled: (currentInstanceId  != null)
        }
    )

    const { data: tags } = useCustomQuery(
        ['instances', currentInstanceId, 'tags'],
        () => instanceTags(currentInstanceId),
        {
            enabled: (currentInstanceId !== null)
        }
    )

    if (!instances) return <Spinner />

    return (
        <>
            <Input label="Instance Number" min={1} max={instances.length} value={instanceNumber} onChange={(event) => setInstanceNumber(Number(event.target?.value) - 1)} />
            <pre>
                {JSON.stringify(header, null, 2)}
                {JSON.stringify(tags, null, 2)}
            </pre>
        </>
    )
}

export default Tags