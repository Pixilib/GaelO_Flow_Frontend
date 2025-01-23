import { useSelector } from "react-redux";
import { createQueryQueue } from "../../services/queues";
import { Button } from "../../ui"
import { Colors, useCustomMutation } from "../../utils"
import { QueryQueueSeriesItem, QueryQueueStudyItem } from "../../utils/types";
import { RootState } from "../../store";

const BasketRoot = () => {

    const studyResults = useSelector((state: RootState) => state.autoRetrieve.studyResults);
    const seriesResults = useSelector((state: RootState) => state.autoRetrieve.seriesResults);

    const { mutate: mutateCreateQueryQueue } = useCustomMutation(
        ({ studies, series }) => createQueryQueue(studies, series),
        [['queue', 'query']]
    );

    const handleCreateRobot = () => {

        const studies: QueryQueueStudyItem[] = studyResults.map(study => ({
            patientName: '',
            patientId: '',
            studyDate: '',
            modality: '',
            studyDescription: '',
            accessionNumber: '',
            studyInstanceUID: study.studyInstanceUID,
            aet: study.originAET,
        }))

        const series: QueryQueueSeriesItem[] = seriesResults.map(series => ({
            studyInstanceUID: series.studyInstanceUID,
            modality: '',
            seriesDescription: '',
            seriesNumber: '',
            seriesInstanceUID: series.seriesInstanceUID,
            aet: series.originAET,
            protocolName: ''
        }))

        mutateCreateQueryQueue({ studies, series })
    };

    return (
        <Button color={Colors.success} onClick={(handleCreateRobot)}>Start Robot</Button>
    )
}

export default BasketRoot