import { useState } from "react"
import Card, { CardHeader, CardBody, CardFooter } from '../../RenderComponents/Card';
import Input from "../../RenderComponents/Input";

const redisCard = () => {
    const [address, setAddress] = useState('');
    const [port, setPort] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Card>
            <CardHeader title="Redis Setting" />
            <CardBody>
                <div className="flex justify-center">
                    <div className="w-1/2">
                        <div className="mb-4">
                            
                        <Input className="w-full" label="Address" type="text" onChange={(e :ChangeEvent<HTMLInputElement>)=>setAddress(e.target.value)} value={address}/>
                        <Input className="w-full"  label="Port" type="number" onChange={(e :ChangeEvent<HTMLInputElement>)=>setPort(e.target.value)} value={port}/>
                        <Input className="w-full" label="Password" type="text" onChange={(e :ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)} value={password}/>

                       
                        </div>
                    </div>
                </div>
            </CardBody>
            <CardFooter>
            </CardFooter>
        </Card>
    )
}

export default redisCard