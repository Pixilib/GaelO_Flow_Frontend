import { Colors, useCustomQuery } from "../../utils";
import { Card, CardBody, CardHeader, Spinner } from "../../ui";
import { getOptions } from "../../services";
import CdBurnerAdminForm from "./CdBurnerAdminForm";
import CDBurnerAdminTour from "../../tour/tours/admin/CDBurnerTour";
import { useTranslation } from "react-i18next";

const CdBurnerAdminRoot = () => {
    const { data, isPending } = useCustomQuery(["options"], () =>
        getOptions()
    );
    const {t} = useTranslation()
    if (isPending) return <Spinner />;

    return (
        <>
            <div className="w-full flex justify-end m-1">
                <CDBurnerAdminTour />
            </div>
            <Card >
                <CardHeader
                    centerTitle
                    color={Colors.primary}
                    title={t("admin.cd-burner.cd-burner-conf")}
                >
                </CardHeader>
                <CardBody className="dark:bg-neutral-500" color={Colors.almond}>
                    <CdBurnerAdminForm options={data} />
                </CardBody>
            </Card>
        </>);
}

export default CdBurnerAdminRoot;