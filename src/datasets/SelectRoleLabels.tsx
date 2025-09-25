import { useSelector } from "react-redux";
import { RootState } from "../store";
import { getLabelsByRoleName } from "../services";
import { useCustomQuery } from "../utils";
import { SelectInput, Spinner } from "../ui";
import { useTranslation } from "react-i18next";

type SelectRoleLabelsProps = {
  values: string[];
  onChange: (labels: string[]) => void;
}

const SelectRoleLabels = ({ onChange, values }: SelectRoleLabelsProps) => {

  const {t} = useTranslation()

  const roleName = useSelector(
    (state: RootState) => state.user.role?.name || ""
  );

  const { data: labelsOptions, isPending } = useCustomQuery(
    ["roles", roleName, "labels"],
    () => getLabelsByRoleName(roleName),
    {
      select: (labels) => {
        const formattedOptions = labels.map((label) => ({
          value: label,
          label,
        }));
        return formattedOptions;
      },
      enabled: roleName != null
    }
  );

  const handleChange = (options) => {
    onChange(options.map((option) => option.value))
  }

  if (isPending) return <Spinner />;

  return (
    <SelectInput
      isMulti
      menuPosition="fixed"
      options={labelsOptions}
      onChange={handleChange}
      closeMenuOnSelect={true}
      placeholder={t("select-labels")}
      value={values}
    />
  );
};

export default SelectRoleLabels;
