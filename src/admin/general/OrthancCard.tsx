import { ChangeEvent, useEffect, useState } from "react";
import Card, { CardBody, CardFooter, CardHeader } from "../../RenderComponents/shared/Card";
import Button from "../../RenderComponents/shared/Button";
import { Colors } from "../../utils/enums";

import Check from '../../assets/check.svg?react';
import Restart from '../../assets/restart.svg?react';
import Shutdown from '../../assets/shutdown.svg?react';
import Input from "../../RenderComponents/shared/Input";
import { useCustomQuery } from "../../utils/reactQuery";
import { getOptions } from "../../services/options";

const orthancCard = () => {
    const [address, setAddress] = useState('');
    const [port, setPort] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const { data, isLoading, isError } = useCustomQuery(
        ['options'],
        () => getOptions()
    )

    useEffect(()=> {
        if(!data) return
        setAddress(data.burnerSupportType)
        setPort(data.autoQueryHourStop)
        setUsername(data.burnerSupportType)
        setPassword(data.burnerSupportType)
    }, [data])
    
    if(isLoading) return "Loading"
    
    return (
        <Card>
            <CardHeader title="Orthanc Setting" />
            <CardBody>
                <div className="flex flex-col items-center w-full ">
                    <div className="w-1/2 space-y-3">
                        <div className="flex space-x-3">
                            <Input disabled className="w-full" label="Address" type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)} value={address} />
                            <Input disabled className="w-full" min={0} label="Port" type="number" onChange={(e: ChangeEvent<HTMLInputElement>) => setPort(e.target.value)} value={port} />
                        </div>
                    </div>
                    <div className="w-1/2 space-y-3">
                        <div className="flex space-x-3">
                            <Input disabled className="w-full" label="Username" type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} value={username} />
                            <Input disabled className="w-full" label="Password" type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} value={password} />
                        </div>
                    </div>
                </div>
            </CardBody>
            <CardFooter className="flex justify-center">
                <div className="flex items-center space-x-2">
                    <Button color={Colors.success}><Check /></Button>
                    <Button color={Colors.orange}><Restart /></Button>
                    <Button color={Colors.danger}><Shutdown /></Button>
                </div>
            </CardFooter>
        </Card>
    )
}

export default orthancCard