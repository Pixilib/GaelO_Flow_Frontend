import React, { ChangeEvent, useState } from 'react';
import { AiOutlineCheck as CheckIcon } from "react-icons/ai";
import { CgClose as CloseIcon } from "react-icons/cg";
import Card, { CardHeader, CardBody, CardFooter } from '../../ui/Card';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
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

    const onSubmitPeer = () => {
        onCreatePeer({ name, username, url, password });
    };

    return (
        <Card className="flex flex-col h-full">
            <CardHeader title="Create New Peer" color={Colors.success}>
                <CloseIcon size="24px" title="Close" onClick={onClose} className="mr-4 cursor-pointer" />
            </CardHeader>
            <CardBody className="p-4 bg-stone-100">
                <div className="mb-4">
                    <Input required label="Name" bordered value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                    <Input required label="Url" bordered value={url} onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)} />
                    <Input label="Username" bordered value={username} onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
                    <Input label="Password" type="password" bordered value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                </div>
            </CardBody>
            <CardFooter className="flex justify-center bg-stone-100">
                <Button color={Colors.success} onClick={onSubmitPeer}><CheckIcon size="20px" /></Button>
            </CardFooter>
        </Card>
    );
}

export default NewPeerCard;
