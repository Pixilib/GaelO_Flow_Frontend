import React, { ChangeEvent, useState } from 'react';

import { AiOutlineCheck as CheckIcon } from "react-icons/ai";
import { CgClose as CloseIcon } from "react-icons/cg";

import { Card, Button, Input, CardHeader, CardBody, CardFooter } from '../../ui';
import { Colors } from "../../utils/enums";
import { Peer } from '../../utils/types';

interface NewPeerCardProps {
    onClose: () => void;
    onCreatePeer: (peer: Peer) => void;
}

const NewPeerCard: React.FC<NewPeerCardProps> = ({ onClose, onCreatePeer }) => {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        onCreatePeer({ name, username, url, password });
    };

    return (
        <Card className="flex flex-col h-full">
            <CardHeader title="Create New Peer" color={Colors.success}>
                <CloseIcon size="24px" title="Close" onClick={onClose} className="ml-auto mr-[8px] cursor-pointer" />
            </CardHeader>

            <CardBody className="p-4 bg-stone-100">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-2">
                        <div className="w-1/2 px-2">
                            <Input required label="Name" bordered value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                        </div>
                        <div className="w-1/2 px-2">
                            <Input required label="Url" bordered value={url} onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)} />
                        </div>
                        <div className="w-1/2 px-2">
                            <Input label="Username" bordered value={username} autocomplete="off" onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
                        </div>
                        <div className="w-1/2 px-2">
                            <Input label="Password" type="password" autocomplete="off" bordered value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <CardFooter className="flex justify-center bg-stone-100">
                        <Button type="submit" color={Colors.success}><CheckIcon size="20px" /></Button>
                    </CardFooter>
                </form>
            </CardBody>
        </Card>
    );
}

export default NewPeerCard;

