import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CheckBox, Input } from "../ui";
import { Colors } from "../utils";
import { updateAnonymizePatientValue } from "../reducers/AnonymizeSlice";
import { RootState } from "../store";

const AutoFillInput = () => {
    const dispatch = useDispatch();

    const [autoIncrement, setAutoIncrement] = useState(false);
    const [autoFillValue, setAutoFillValue] = useState('');

    const anonPatientList = useSelector((state: RootState) => state.anonymize.patients);

    const handleAutoFill = () => {
        Object.values(anonPatientList).forEach((patient, i) => {
            const currentValue = autoIncrement ?  autoFillValue + (i + 1) : autoFillValue;
            dispatch(
                updateAnonymizePatientValue({
                    patientId: patient.originalPatient.id,
                    newPatientName: currentValue,
                    newPatientId: currentValue,
                })
            );
        });
    };

    return (
        <div className="flex flex-col items-center">
            <Input
                type="text"
                placeholder="Enter value"
                className="w-full p-2 border"
                value={autoFillValue}
                onChange={(e) => setAutoFillValue(e.target.value)}
            />
            <div className="flex items-center w-full mt-2">
                <CheckBox checked={autoIncrement} onChange={(event) => setAutoIncrement(event.target.checked)} bordered={false} className="mr-2" />
                <span className="text-black">Auto Increment</span>
            </div>
            <Button
                onClick={handleAutoFill}
                color={Colors.secondary}
                className="mx-auto rounded-lg hover:bg-secondary group"
            >
                <span className="ml-2">Auto Fill</span>
            </Button>
        </div>
    );
};

export default AutoFillInput;