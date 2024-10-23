import Button from "../../ui/Button";
import Card, { CardHeader, CardBody, CardFooter } from "../../ui/Card";
import { Colors } from "../../utils/enums";
import { useSelector } from "react-redux";
import { getExistingAnonymizeQueues, getAnonymizeQueue } from "../../services/queues";
import { useCustomQuery } from "../../utils";
import { useMemo } from "react";
import ProgressQueueCircle from "../../queue/ProgressQueueCircle";
import { Spinner } from "../../ui";
import { AnonQueue } from "../../utils/types";

const CardAnon = () => {
    const currentUserId = useSelector((state) => state.user.currentUserId);

    // Récupération des files d'attente existantes
    const { data: existingAnonymizeQueues } = useCustomQuery<string[]>(
        ['queue', 'anonymize', currentUserId?.toString() || ''],
        () => getExistingAnonymizeQueues(currentUserId)
    );

    const firstQueue = existingAnonymizeQueues?.[0];

    // Récupération des données de la première file d'attente
    const { data, isPending, isFetching } = useCustomQuery<AnonQueue[]>(
        ['queue', 'anonymize', firstQueue],
        () => getAnonymizeQueue(firstQueue),
        {
            refetchInterval: 2000, // Initialement défini, sera remplacé par globalProgress
            enabled: !!firstQueue,
        }
    );

    // Calcul de la progression globale
    const globalProgress = useMemo(() => {
        if (!data || data.length === 0) return 0;

        const totalJobs = data.length;
        const completedJobs = data.filter(job => job.state === 'completed' || job.state === 'in progress').length;

        return (totalJobs === 0) ? 0 : (completedJobs / totalJobs) * 100;
    }, [data]);

    // Réinitialiser le refetchInterval si la progression atteint 100
    useCustomQuery<AnonQueue[]>(['queue', 'anonymize', firstQueue], () => getAnonymizeQueue(firstQueue), {
        refetchInterval: globalProgress < 100 ? 2000 : false,
        enabled: !!firstQueue,
    });

    // Si aucune file d'attente n'est trouvée, ne rien afficher
    if (!firstQueue) return null;
    // Si les données sont en cours de chargement, afficher un spinner
    if (isPending || isFetching) return <Spinner />;

    return (
        <Card className="flex-1">
            <CardHeader centerTitle title="Anonymisation" color={Colors.blueCustom} />
            <CardBody className="flex items-center justify-center" color={Colors.light}>
                <ProgressQueueCircle
                    onDelete={() => { }} // Ajoutez votre fonction de suppression ici
                    queueData={{
                        progress: globalProgress,
                        state: "", // Vous pouvez mettre à jour ceci si nécessaire
                        id: "",    // Mettez l'ID de la queue ici si nécessaire
                        results: undefined, // Mettez à jour si vous avez des résultats à afficher
                        userId: currentUserId || 0
                    }}
                    colors={{ background: 'text-gray-300', progress: Colors.primary }}
                />
            </CardBody>
            <CardFooter color={Colors.light}>
                <Button className="self-center" color={Colors.blueCustom}>
                    Empty List
                </Button>
            </CardFooter>
        </Card>
    );
};

export default CardAnon;
