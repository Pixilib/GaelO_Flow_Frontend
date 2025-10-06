import { useCustomQuery } from "../../utils";
import { FormCard, Spinner } from "../../ui";
import { getOptions } from "../../services";
import CdBurnerAdminForm from "./CdBurnerAdminForm";

const CdBurnerAdminRoot = () => {
    const { data, isPending } = useCustomQuery(["options"], () =>
        getOptions()
    );

    if (isPending) return <Spinner />;

    return <FormCard title="CD Burner Configuration" >
        <CdBurnerAdminForm options={data} />
    </FormCard>;
}

export default CdBurnerAdminRoot;