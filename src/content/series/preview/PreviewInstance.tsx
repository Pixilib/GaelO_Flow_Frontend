import { previewInstance } from "../../../services/instances"
import { useCustomQuery } from "../../../utils"

type PreviewInstanceProps = {
    instanceUID: string
}
const PreviewInstance = ({ instanceUID }: PreviewInstanceProps) => {

    const { data } = useCustomQuery<any, string>(
        ['instances', instanceUID, 'preview'],
        () => previewInstance(instanceUID),
        {
            select: (data: any) => {
                return URL.createObjectURL(data);
            },
            staleTime : 100000,
            gcTime : 100000
        }

    )

    return (
        <img className="w-full h-full" src={data}/>
    )

}

export default PreviewInstance