import { ChangeEvent, useState } from 'react';
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
}

interface NewPeerCardProps {
    onClose: () => void;
    onCreatePeer: (peerData: PeerData) => void;
}

const NewPeerCard: React.FC<NewPeerCardProps> = ({ onClose, onCreatePeer }) => {
    const { toastWarning } = useCustomToast();
    const [username, setUsername] = useState('');
    const [peername, setPeerName] = useState('');
    const [url, setUrl] = useState('');

    const onSubmitPeer = () => {
        if (!username.trim() || !peername.trim() || !url.trim()) {
            toastWarning("Please fill in all fields correctly.");
            return;
        }

        const newPeerData: PeerData = {
            username,
            peername,
            url,
        };

        onCreatePeer(newPeerData);
    };

    return (
        <Card className="flex flex-col h-full">
            <CardHeader title="Create New Peer" color={Colors.success}>
                <CloseIcon size="24px" title="Close" onClick={onClose} className="cursor-pointer" />
            </CardHeader>
            <CardBody className="p-4 bg-stone-100">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <Input label="Username" bordered value={username} onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
                    <Input label="Peer Name" bordered value={peername} onChange={(e: ChangeEvent<HTMLInputElement>) => setPeerName(e.target.value)} />
                    <Input label="URL" bordered value={url} onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)} />
                </div>
            </CardBody>
            <CardFooter className="flex justify-center bg-stone-100">
                <Button color={Colors.success} onClick={onSubmitPeer}><CheckIcon size="20px" /></Button>
            </CardFooter>
        </Card>
    );
}

export default NewPeerCard;
