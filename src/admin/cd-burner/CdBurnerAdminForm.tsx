
import { useState, useEffect } from "react";
import { Options } from "../../utils/types";
import { Input, SelectInput, Button, ToggleSwitch } from "../../ui";
import { Colors } from "../../utils/enums";
import { updateCdBurnerOptions } from "../../services/options";
import { TRANSCODING_OPTIONS } from "../../utils/constants";
import { useCustomMutation, useCustomToast } from "../../utils";

const FormComponent = ({ label, children }: { label: string; children: React.ReactNode }) => {
    return (
        <div className="flex flex-row items-center w-full">
            <div className="w-1/4 font-medium">
                {label}
            </div>
            <div className="w-3/4">
                {children}
            </div>
        </div>
    );
};

const CdBurnerAdminForm = ({ options }: { options: Options }) => {
    const [formData, setFormData] = useState(options);
    const { toastSuccess, toastError } = useCustomToast();

    const updateMutation = useCustomMutation<void, Options>(
        (payload: Options) => updateCdBurnerOptions(payload),
        [["options"]],
        {
            onSuccess: () => {
                toastSuccess("Saving successful");
            },
            onError: (error: any) => {
                toastError(`An error occurred: ${(error?.data?.message ?? "")}`);
            },
        }
    );

    useEffect(() => {
        setFormData(options);
    }, [options]);

    const handleChange = (field: keyof Options, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return <div data-gaelo-flow="burner-form" className="relative flex items-center flex-col space-y-4">
        <FormComponent label="Mounted Data Path">
            <Input
                disabled
                type="text"
                placeholder="Absolute Path to your data folder"
                value={formData?.burnerDataPath || ''}
                onChange={(e) => handleChange('burnerDataPath', e.target.value)}
            />
        </FormComponent>
        <FormComponent label="Label Path">
            <Input
                type="text"
                placeholder="Absolute Path to your label file"
                value={formData?.burnerLabelPath || ''}
                onChange={(e) => handleChange('burnerLabelPath', e.target.value)}
            />
        </FormComponent>

        <FormComponent label="Viewer Path">
            <Input
                type="text"
                placeholder="Absolute Path to your DICOM viewer"
                value={formData?.burnerViewerPath || ''}
                onChange={(e) => handleChange('burnerViewerPath', e.target.value)}
            />
        </FormComponent>
        <FormComponent label="Manufacturer">
            <SelectInput
                isMulti={false}
                value={formData?.burnerManufacturer || ''}
                onChange={(value) => handleChange('burnerManufacturer', value["value"])}
                options={["Epson", "Primera"].map((opt) => ({ label: opt, value: opt }))}
            />
        </FormComponent>
        <FormComponent label="Support Type">
            <SelectInput
                isMulti={false}
                value={formData?.burnerSupportType || ''}
                onChange={(e) => handleChange('burnerSupportType', e['value'])}
                options={["CD", "DVD", "Auto"].map((opt) => ({ label: opt, value: opt }))}
            />
        </FormComponent>
        <FormComponent label="Transfer Syntax">
            <SelectInput
                placeholder="Select transcoding (No transcoding if not selected)"
                options={TRANSCODING_OPTIONS}
                value={formData?.burnerTransferSyntax || ''}
                onChange={(value) => handleChange('burnerTransferSyntax', value["value"])}

            />
        </FormComponent>
        <FormComponent label="Date Format">
            <SelectInput
                placeholder=""
                options={[{ label: "FR - DD/MM/YYYY", value: "fr" }, { label: "UK - MM/DD/YYYY", value: "uk" }]}
                value={formData?.burnerDateFormat || ''}
                onChange={(value) => handleChange('burnerDateFormat', value["value"])}
            />
        </FormComponent>
        <FormComponent label="Delete Study After Sent">
            <ToggleSwitch
                checked={formData?.burnerDeleteStudyAfterSent || false}
                className={` ${formData?.burnerDeleteStudyAfterSent || false ? "bg-green-500" : "bg-red-500"}`}
                onChange={(e) => handleChange('burnerDeleteStudyAfterSent', e.target.checked)}
            />
        </FormComponent>

        <hr className="my-4 w-full border-t border-gray-300" />
        <div className="justify-center flex w-full space-x-4">
            <Button
                data-gaelo-flow="burner-button-save"
                disabled={JSON.stringify(formData) === JSON.stringify(options)}
                type="button"
                color={Colors.primary}
                onClick={() => updateMutation.mutate(formData)}
                className="pl-5 pr-5"
            >
                Save
            </Button>
        </div>
    </div>;
};

export default CdBurnerAdminForm;