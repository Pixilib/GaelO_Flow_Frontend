import React, { useState } from 'react';
import Card, { CardHeader, CardBody, CardFooter } from '../../ui/Card';
import Button from '../../ui/Button';
import { AiOutlinePlus as MoreIcon } from "react-icons/ai";
import NewModalityCard from './NewModalityCard';
import { Colors } from '../../utils/enums';
import { useCustomQuery, useCustomMutation } from '../../utils/reactQuery';
import ModalitiesTable from './ModalitiesTable'
import Toast from '../../ui/toast/Toast';
import { updateModality, deleteModality } from '../../services/modalities';

interface AetData {
    name: string;
    aet: number;
    host: string;
    manufacturer: string;
}

const ModalitiesRoot: React.FC = () => {
    const [showNewAetCard, setShowNewAetCard] = useState(false);

    /*
    const { data: aets } = useCustomQuery<AetData[]>(
        ['modalities'],
        () => getModalities(),
        {
            select : (data) => {

                //A voir comment orthanc répond
                return {
                    name : 
                    aet : data.Aet,
                    host : data.Host,
                    manufacturer : data.Manufacturer
                }
            }
        }
    )
    */

    const updateModalityMutation = useCustomMutation(
        ({ name, aet, host, port, manufacturer }) => updateModality(name, aet, host, port, manufacturer),
        [['modalities']] 
    );

    const deleteModalityMutation = useCustomMutation(
        ({name}) => deleteModality(name),
        [['modalities']]
    )

    const handleNewAetClick = () => {
        setShowNewAetCard(true);
    };

    const createAetHandler = (aet: AetData) => {
        updateModalityMutation.mutate(aet, {
            onSuccess: () => {
                toastSuccess("successfully");
            },
            onError: (error) => {
                console.error("Error", error);
                toastError("An error occurred while creating the AET.");
            }
        });
    };

    const deleteAetHandler = (aetName: string) => {
        if (window.confirm(`Are you sure you want to delete the modality named "${aetName}"?`)) {
            deleteModalityMutation.mutate({ name: aetName }, {
                onSuccess: () => {
                },
                onError: (error) => {
                    console.error("Error deleting modality: ", error);
                }
            });
        }
    }
    return (
        <Card>
            <CardHeader title="Modalities" color={Colors.primary} />
            <CardBody color={Colors.light}>
                <div className="flex flex-col items-center">
                    <div className="w-full mb-8">
                        <ModalitiesTable data={aetData} onDeleteAet={deleteAetHandler} />
                    </div>
                    <div className="flex justify-center w-full mt-2 mb-4">
                        <Button color={Colors.success} onClick={handleNewAetClick}>
                            <span className="flex items-center mr-2">
                                <MoreIcon className="mr-2" size={24} />New modality
                            </span>
                        </Button>
                    </div>
                </div>
            </CardBody>
            <CardFooter color={Colors.light}>
                {showNewAetCard && (
                    <div className="w-full">
                        <NewModalityCard onClose={() => setShowNewAetCard(false)} onCreateAet={createAetHandler} />
                    </div>
                )}
            </CardFooter>
        </Card>
    );
};

export default ModalitiesRoot;

