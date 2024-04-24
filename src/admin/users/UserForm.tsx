import { Card, CardBody, CardHeader, SelectionInput } from "../../ui";
import Input2 from "../../ui/Input2";
import { Colors } from "../../utils/enums";

type UserFormProps = {
    title: string;
}
//!WIP 
const UserForm = ({ title }: UserFormProps) => {

    return (
        <Card>
            <CardHeader title={title} color={Colors.success} />
            <CardBody color={Colors.lightGray}>
                <form className="grid grid-cols-3 gap-11">
                    <Input2
                        label={{ value: "Username *" }}
                        size="auto"
                        placeholder="Enter your username"
                        variant={Colors.primary}
                        className="mt-3 rounded-xl"
                    />
                    <Input2
                        label={{ value: "FirstName *" }}
                        size="auto"
                        placeholder="Enter your firstname"
                        variant={Colors.primary}
                        className="mt-3 rounded-xl"
                    />
                    <Input2
                        label={{ value: "LastName *"}}
                        size="auto"
                        placeholder="Enter your lastname"
                        variant={Colors.primary}
                        className="mt-3 rounded-xl"
                    />
                    <div className="grid grid-cols-2 col-span-3 gap-11">

                        <Input2
                            label={{ value: "Mail"}}
                            size="auto"
                            type="email"
                            placeholder="example@example.com"
                            variant={Colors.primary}
                            className="w-auto mt-3 rounded-xl"
                        />
                        <Input2
                            label={{ value: "Password", className: "" }}
                            size="auto"
                            type="password"
                            placeholder="Enter password"
                            variant={Colors.primary}
                            className="w-auto mt-3 rounded-xl"
                        />
                    </div>
                    <div className="grid grid-cols-2 col-span-3 gap-11">
                        <SelectionInput  options={[]} onChange={()=>console.log("on Change")} /> 
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