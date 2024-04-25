import React, { ChangeEvent, useState } from 'react';
import { AiOutlineCheck as CheckIcon } from "react-icons/ai";
import { CgClose as CloseIcon } from "react-icons/cg";
import Card, { CardHeader, CardBody, CardFooter } from '../../ui/Card';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import { Colors } from "../../utils/enums";
import { useCustomToast } from "../../utils/toastify";

interface PeerData {
    username: string;
    peername: string;
    url: string;
    isUserCreated?: boolean;
    port: number;
    ipAddress: string;
    password: string;
}

interface NewPeerCardProps {
    onClose: () => void;
    onCreatePeer: (peerData: PeerData) => void;
}

const NewPeerCard: React.FC<NewPeerCardProps> = ({ onClose, onCreatePeer }) => {
    const { toastWarning } = useCustomToast();
    const [peername, setPeerName] = useState('');
    const [url, setUrl] = useState('');
    const [port, setPort] = useState('');
    const [ipAddress, setIpAddress] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitPeer = () => {
        if (!peername.trim() || !url.trim() || !port.trim() || !ipAddress.trim() || !password.trim()) {
            toastWarning("Please fill in all fields correctly.");
            return;
        }

        const newPeerData: PeerData = {
            peername,
            url,
            port: parseInt(port, 10),
            ipAddress,
            password,
            isUserCreated: true,
            username: ''
        };

        onCreatePeer(newPeerData);
    };

    return (
        <Card className="flex flex-col h-full">
            <CardHeader title="Create New Peer" color={Colors.success}>
            <CloseIcon size="24px" title="Close" onClick={onClose} className="mr-4 cursor-pointer" />
            </CardHeader>
            <CardBody className="p-4 bg-stone-100">
                <div className="mb-4">
                    <Input label="Peer Name" bordered fullWidth value={peername} onChange={(e: ChangeEvent<HTMLInputElement>) => setPeerName(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Input label="URL" bordered value={url} onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)} />
                    <Input label="Port" bordered value={port} onChange={(e: ChangeEvent<HTMLInputElement>) => setPort(e.target.value)} />
                    <Input label="IP Address" bordered value={ipAddress} onChange={(e: ChangeEvent<HTMLInputElement>) => setIpAddress(e.target.value)} />
                    <Input label="Password" bordered value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                </div>
            </CardBody>
            <CardFooter className="flex justify-center bg-stone-100">
                <Button color={Colors.success} onClick={onSubmitPeer}><CheckIcon size="20px" /></Button>
            </CardFooter>
        </Card>
    );
}

export default NewPeerCard;
