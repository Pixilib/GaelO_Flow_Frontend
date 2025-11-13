import React, { ChangeEvent, useState } from 'react';

import { FormCard, Button, Input } from '../../ui';
import { Check } from '../../icons';
import { Colors } from '../../utils/enums';
import { Peer } from '../../utils/types';
import { useTranslation } from "react-i18next";

interface NewPeerCardProps {
    onClose: () => void;
    onCreatePeer: (peer: Peer) => void;
}

const NewPeerCard: React.FC<NewPeerCardProps> = ({ onClose, onCreatePeer }) => {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {t} = useTranslation()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onCreatePeer({ name, url, username, password });
    };

    return (
        <div data-gaelo-flow="peers-form-peers" className="w-full">
        <FormCard
            className="w-full bg-light-gray dark:bg-neutral-500"
            title={t("admin.peers.create-new-peer")}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <div className="grid w-full grid-cols-2 gap-4 p-4">
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
                />
                <Input
                    label="Password"
                    type="password"
                    bordered
                    value={password}
                    autoComplete="off"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
            </div>
            <div className="flex justify-center my-4"> {/* Ajout de margin vertical */}
                <Button data-gaelo-flow="peers-submit" type="submit" color={Colors.success} aria-label="Submit New Peer">
                    <Check size="20px" />
                </Button>
            </div>
        </FormCard>
    </div>
    );
};

export default NewPeerCard;
