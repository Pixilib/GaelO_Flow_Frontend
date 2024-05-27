import { Button } from "../../ui";
import { Colors } from "../../utils";

const LabelInputForm = ({ onCreate }) => {
    
    return (
        <div className="flex items-center">
            <input
                type="text"
                placeholder="Add new label"
                className="flex-grow p-2 b"
            />
            <Button
                type="button"
                color={Colors.success}
                className="p-2 text-whi rounded-l-mdfocus:outline-none focus:ring-2"
            >
            </Button>
        </div>
    );
};

export default LabelInputForm;
