import React, { ChangeEvent, useState } from 'react';

import { AiOutlineCheck as CheckIcon } from 'react-icons/ai';

import { FormCard, Button, Input } from '../../ui';
import { Colors } from '../../utils/enums';
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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onCreatePeer({ name, url, username, password });
    };

    return (
        <FormCard
            className="bg-light-gray"
            title="Create New Peer"
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-2 gap-4 p-4">
                <Input
                    label="Name"
                    bordered
                    value={name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    aria-label="Peer Name"
                    required
                />
                <Input
                    label="Url"
                    bordered
                    value={url}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
                    aria-label="Url"
                    required
                />
                <Input
                    label="Username"
                    bordered
                    value={username}
                    autoComplete="off"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    aria-label="Username"
                />
                <Input
                    label="Password"
                    type="password"
                    bordered
                    value={password}
                    autoComplete="off"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    aria-label="Password"
                />
            </div>
            <div className='flex justify-center'>
            <Button type="submit" color={Colors.success} aria-label="Submit New Peer">
                    <CheckIcon size="20px" />
                </Button>
            </div>
        </FormCard>
    );
};

export default NewPeerCard;
