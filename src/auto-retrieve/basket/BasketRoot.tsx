import { useSelector } from "react-redux";
import { createQueryQueue } from "../../services/queues";
import { Button } from "../../ui"
import { Colors, useCustomMutation } from "../../utils"
import { QueryQueueSeriesItem, QueryQueueStudyItem } from "../../utils/types";
import { RootState, store } from "../../store";
import BasketTable from "./BasketTable";
import { Empty } from "../../icons";
import { removeStudyOrSeriesFromBasket, updateBasketSelection } from "../../reducers/AutoRetrieveSlice";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import BasketTour from "../../tour/tours/auto-retrieve/BasketTour";


const BasketRoot = () => {

    const basket = useSelector((state: RootState) => state.autoRetrieve.basket);
    const {t} = useTranslation()

    const basketSelectedRow: Record<number, boolean> = useMemo(() => {
        return basket.reduce((acc, query, index) => {
            acc[query.id] = query.selected;
            return acc;
        }, {});
    }, [basket]);

    const { mutate: mutateCreateQueryQueue } = useCustomMutation(
        ({ studies, series }) => createQueryQueue(studies, series),
        [['queue', 'query']]
    );

    const handleRemoveBasket = () => {
        basket.filter(item => item.selected).forEach(item => {
            store.dispatch(removeStudyOrSeriesFromBasket({ id: item.id }))
        });
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

    const handleRowSelectionChange = (selectedState: Record<string, boolean>) => {
        store.dispatch(updateBasketSelection(selectedState));
    };

    return (
        <div className="flex flex-col">
             <div className="w-full flex justify-end m-1">
                <BasketTour />
            </div >
            <div data-gaelo-flow="basket-datatable">
            <BasketTable
                queryResults={basket}
                onRowSelectionChange={handleRowSelectionChange}
                selectedRow={basketSelectedRow}
            />
            </div>
            <div className="flex justify-center gap-3 m-3">
                <Button data-gaelo-flow="basket-start-robot" color={Colors.success} onClick={handleCreateRobot}>{t("auto-retrieve.basket.start-robot")}</Button>
                <Button data-gaelo-flow="basket-delete" color={Colors.warning} onClick={handleRemoveBasket}><Empty /></Button>
            </div>
        </div>

    )
}

export default BasketRoot