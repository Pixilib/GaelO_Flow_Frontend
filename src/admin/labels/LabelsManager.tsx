import { IoMdAddCircleOutline } from "react-icons/io"; 
import { ChangeEvent, useState } from "react";
import { Card, CardHeader, CardBody, Label, Input, Button } from "../../ui";
import { Colors } from "../../utils";



const LabelsManager = () => {
    const [labelTag, setLabelTag] = useState<string>("");
    return (
        <Card>
            <CardHeader title="Manage Labels" color={Colors.success} />
            <CardBody>
                <div className="flex justify-center">
                    <form >
                        <Input
                            label={
                                <Label value="Add Label *"
                                    className="text-sm font-medium text-center"
                                    align="left"
                                />
                            }
                            placeholder="Enter your Tag"
                            className="mt-1 lg:mt-3"
                            value={labelTag}
                            required
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setLabelTag(event.target.value)}
                        />
                            <IoMdAddCircleOutline size={'1.8rem'} className="transition text-success duration-70 hover:scale-110" />
                    </form>
                </div>
            </CardBody>
        </Card>

    )
}
export default LabelsManager;