import { ChangeEvent, useState } from "react"
import { previewFrame, previewInstance } from "../../../services/instances"
import { useCustomQuery } from "../../../utils"

type PreviewInstanceMultiframeProps = {
    instanceUID: string
}
const PreviewInstanceMultiframe = ({ instanceUID }: PreviewInstanceMultiframeProps) => {

    const [frame, setFrame] = useState(0)

    const { data } = useCustomQuery<any, string>(
        ['instances', instanceUID, 'preview', 'frames', frame.toString()],
        () => previewFrame(instanceUID, frame),
        {
            select: (data: any) => {
                return URL.createObjectURL(data);
            },
            staleTime: 100000,
            gcTime: 100000
        }

    )

    return (
        <div className="flex flex-col">
            <img className="w-full h-full" src={data} />
            <input className="w-full" type="range" value={frame} min={0} max={undefined} onChange={(event: ChangeEvent<HTMLInputElement>) => setFrame(Number(event.target.value))} />
        </div>

    )

}

export default PreviewInstanceMultiframe