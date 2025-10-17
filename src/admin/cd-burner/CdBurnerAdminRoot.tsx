import { useCustomQuery } from "../../utils";
import { FormCard, Spinner } from "../../ui";
import { getOptions } from "../../services";
import CdBurnerAdminForm from "./CdBurnerAdminForm";
import CDBurnerAdminTour from "../../tour/tours/admin/CDBurnerTour";

const CdBurnerAdminRoot = () => {
    const { data, isPending } = useCustomQuery(["options"], () =>
        getOptions()
    );

    if (isPending) return <Spinner />;

    return <FormCard title="CD Burner Configuration" >
        <div className="w-full flex justify-end m-1">
            <CDBurnerAdminTour />
        </div>
        <CdBurnerAdminForm options={data} />
    </FormCard>;
}

export default CdBurnerAdminRoot;