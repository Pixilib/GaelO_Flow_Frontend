import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CheckBox, Input, Label } from "../ui";
import { Colors } from "../utils";
import { updateAnonymizePatientValue } from "../reducers/AnonymizeSlice";
import { RootState } from "../store";

const AutoFillInput = () => {
    const dispatch = useDispatch();

    const [autoIncrement, setAutoIncrement] = useState(false);
    const [autoFillPatientValue, setAutoFillPatientValue] = useState<string>('');
    const [autoFillStudyDescriptionValue, setAutoFillDescriptionValue] = useState<string>('');

    const anonPatientList = useSelector((state: RootState) => state.anonymize.patients);

    const handleAutoFillPatient = () => {
        Object.values(anonPatientList).forEach((patient, i) => {
            const currentValue = autoIncrement ? autoFillPatientValue + (i + 1) : autoFillPatientValue;
            dispatch(
                updateAnonymizePatientValue({
                    patientId: patient.originalPatient.id,
                    newPatientName: currentValue,
                    newPatientId: currentValue,
                })
            );
        });
    };

    const handleAutoFillStudyDescription = () => {

    }
    return (
        <div className="flex flex-col gap-3 items-center w-full">
            <div className="w-full flex items-center gap-3 shadow p-3 justify-around">
                <Label value="Patient Name/ID" className="text-black mb-2"></Label>
                <span>
                    <Input
                        type="text"
                        placeholder="Enter value"
                        className="w-full p-2"
                        value={autoFillPatientValue}
                        onChange={(e) => { console.log(e.target.value); setAutoFillPatientValue(e.target.value) }}
                    />
                    <div className="flex items-center w-full mt-2">
                        <CheckBox checked={autoIncrement} onChange={(event) => setAutoIncrement(event.target.checked)} bordered={false} className="mr-2" />
                        <span className="text-black">Auto Increment</span>
                    </div>
                </span>
                <Button
                    onClick={handleAutoFillPatient}
                    color={Colors.secondary}
                    className="mx-auto rounded-lg hover:bg-secondary"
                >
                    <span className="ml-2">Auto Fill</span>
                </Button>
            </div>
            <div className="w-full flex items-center gap-3 shadow p-3 justify-around">
                <Label value="Study Description" className="text-black mb-2"></Label>
                <span>
                    <Input
                        type="text"
                        placeholder="Enter value"
                        className="w-full p-2"
                        value={autoFillStudyDescriptionValue}
                        onChange={(e) => { console.log(e.target.value); setAutoFillDescriptionValue(e.target.value) }}
                    />
                </span>
                <Button
                    onClick={handleAutoFillStudyDescription}
                    color={Colors.secondary}
                    className="mx-auto rounded-lg hover:bg-secondary"
                >
                    <span className="ml-2">Auto Fill</span>
                </Button>
            </div>

        </div>
    );
};

export default AutoFillInput;