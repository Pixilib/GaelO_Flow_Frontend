import { useCustomMutation } from "src/utils/reactQuery";
import { Card, CardBody, CardHeader, Input, Label, SelectionInput } from "../../ui";
import { Colors } from "../../utils/enums";

type UserFormProps = {
    title: string;
}

const roleMutation = useCustomMutation
//!WIP 
const UserForm = ({ title }: UserFormProps) => {

    return (
        <Card>
            <CardHeader title={title} color={Colors.success} />
            <CardBody color={Colors.lightGray}>
                <form className="grid grid-cols-3 gap-11">
                    <Input
                        label={
                            <Label value="Username *" 
                            className="text-sm font-medium text-center" 
                            align="left" spaceY={2} />
                        }
                        placeholder="Enter your username"
                        className="mt-3 rounded-xl"
                    />
                    <Input 
                        label={
                            <Label value="Firstname *" 
                            className="text-sm font-medium text-center" 
                            align="left" spaceY={2}
                            />
                        }
                        placeholder="Enter your firstname"
                    />
                    <Input 
                        label={
                            <Label value="Lastname *" 
                            className="text-sm font-medium text-center" 
                            align="left" spaceY={2}
                            />
                        }  
                        placeholder="Enter your lastname"
                    />
                    <div className="grid grid-cols-2 col-span-3 gap-11">
                    
                    <Input
                        label={
                            <Label value="Password *" 
                            className="text-sm font-medium text-center" 
                            align="left" spaceY={2} />
                        }
                        size="auto"
                        type="password"
                        placeholder="Enter your password"
                        className="mt-3 rounded-xl"
                    />
                    <Input
                        label={
                            <Label value="Email *" 
                            className="text-sm font-medium text-center" 
                            align="left" spaceY={2} />
                        }
                        size="auto"
                        type="email"
                        placeholder="example@example.com"
                        className="mt-3 rounded-xl"
                    />
    
                    </div>
                    <div className="grid grid-cols-2 col-span-3 gap-11">
                        <label className="flex flex-col">
                           <span className="mb-2 text-sm font-bold"> Rôles *</span> 
                        <SelectionInput options={[]} onChange={()=>console.log("on Change")}/> 
                        </label>
                        <label htmlFor="superAdmin" className="flex items-center">
                            <input type="checkbox" id="superAdmin" defaultChecked={false} />
                            <span className="ml-2">Super Admin</span>
                        </label>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
};
export default UserForm;