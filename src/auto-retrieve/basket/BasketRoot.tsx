import { useSelector } from "react-redux";
import { createQueryQueue } from "../../services/queues";
import { Button } from "../../ui"
import { Colors, useCustomMutation } from "../../utils"
import { QueryQueueSeriesItem, QueryQueueStudyItem } from "../../utils/types";
import { RootState, store } from "../../store";
import BasketTable from "./BasketTable";
import { Empty } from "../../icons";
import { clearBasket } from "../../reducers/AutoRetrieveSlice";

const BasketRoot = () => {

    const basket = useSelector((state: RootState) => state.autoRetrieve.basket);

    const { mutate: mutateCreateQueryQueue } = useCustomMutation(
        ({ studies, series }) => createQueryQueue(studies, series),
        [['queue', 'query']]
    );

    const  handleClearRobot = () => {
        store.dispatch(clearBasket())
    };

    const handleCreateRobot = () => {

        const studies: QueryQueueStudyItem[] = basket.filter(item => !item.seriesInstanceUID).map(study => ({
            patientName: '',
            patientId: '',
            studyDate: '',
            modality: '',
            studyDescription: '',
            accessionNumber: '',
            studyInstanceUID: study.studyInstanceUID,
            aet: study.originAET,
        }))


        const series: QueryQueueSeriesItem[] = basket.filter(item => item.seriesInstanceUID).map(series => ({
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
        <div className="flex flex-col">
            <BasketTable queryResults={basket} />
            <div className="flex justify-center gap-3 m-3">
                <Button color={Colors.success} onClick={handleCreateRobot}>Start Robot</Button>
                <Button color={Colors.warning} onClick={handleClearRobot}><Empty/></Button>
            </div>
        </div>

    )
}

export default BasketRoot