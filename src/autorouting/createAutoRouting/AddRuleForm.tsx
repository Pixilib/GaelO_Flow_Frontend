import { Rule } from "../../utils/types";
import { Button, Input, SelectInput } from "../../ui";
import { autoRoutingRuleConditionOptions, autoRoutingRuleDicomTagOptions, autoRoutingRuleValueRepresentation } from "../types";
import { Colors } from "../../utils";
import { Trash } from "../../icons";
import { useTranslation } from "react-i18next";

type AddRuleFormProps = {
    rule: Rule;
    id: string;
    onChange: (id: string, rule: Rule) => void;
    onDelete: () => void;
}

const AddRuleForm = ({ rule, id, onChange, onDelete }: AddRuleFormProps) => {
    const {t} = useTranslation()

    return (
        <div>
            <div className="flex gap-5 flex-row">
                <SelectInput
                    placeholder="Dicom Tag"
                    options={autoRoutingRuleDicomTagOptions}

                    value={rule?.DicomTag || ""}
                    onChange={(e: any) => onChange(id, {
                        ...rule,
                        DicomTag: e.value
                    })}
                />
                <SelectInput
                    placeholder="Condition"
                    value={rule?.Condition || ""}
                    options={autoRoutingRuleConditionOptions}
                    onChange={(e: any) => onChange(id, {
                        ...rule,
                        Condition: e.value
                    })}
                />
                <Input
                    placeholder={t("autorouting.createAutoRooting.value")}
                    value={rule?.Value || ""}
                    onChange={(e) => onChange(id, {
                        ...rule,
                        Value: e.target.value
                    })}
                />
                <SelectInput
                    placeholder={t("autorouting.createAutoRooting.value-representation")}
                    value={rule?.ValueRepresentation || ""}
                    options={autoRoutingRuleValueRepresentation}
                    onChange={(e: any) => onChange(id, {
                        ...rule,
                        ValueRepresentation: e.value
                    })}
                />
                <Button
                    color={Colors.danger}
                    children={<Trash />}
                    onClick={onDelete}
                />
            </div>
        </div>
    );
}

export default AddRuleForm;