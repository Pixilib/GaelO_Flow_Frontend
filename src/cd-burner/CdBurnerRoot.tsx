import { useEffect, useState } from "react";

import { Colors, useCustomQuery } from "../utils";
import { Button, Card, CardBody, CardHeader } from "../ui";
import CdBurnerJobTable from "./CdBurnerJobTable";
import { CdBurnerItem } from "../utils/types";
import { getCdBurnerItems } from "../services/cd-burner";
import SoundEnabled from "../icons/SoundEnabled";
import SoundDisabled from "../icons/SoundDisabled";
import audioError from './sounds/error.wav';
import audioSuccess from './sounds/success.wav';
import CDBurnerTour from "../tour/tours/CDBurnerTour";

const CdBurnerRoot = () => {

    const [burnerJobs, setBurnerJobs] = useState<CdBurnerItem[]>([])
    const [playSound, setPlaySound] = useState<boolean>(localStorage.getItem('cdburner-playsound') === 'true');

    const { data: jobData } = useCustomQuery<
        CdBurnerItem[]
    >(["jobs"],
        () => getCdBurnerItems(),
        {
            enabled: true,
            refetchInterval: 1000,
            refetchIntervalInBackground: true,
        }
    );

    useEffect(() => {
        if (!jobData) return;
        if (!playSound) {
            setBurnerJobs(jobData as CdBurnerItem[]);
            return;
        }

        for (const job of (jobData as CdBurnerItem[])) {
            const previousJob = (burnerJobs as Record<string, any>).find((d) => d.jobID === job.jobID);
            if (!previousJob) continue;
            if (job.jobStatus !== previousJob.jobStatus) {
                if (job.jobStatus === 'BURNING_DONE') {
                    new Audio(audioSuccess).play();
                    break;
                } else if (job.jobStatus === 'BURNING_ERROR') {
                    new Audio(audioError).play();
                    break;
                }
            }
        };

        setBurnerJobs(jobData as CdBurnerItem[]);

    }, [jobData]);

    const clickSoundHandler = () => {
        setPlaySound(!playSound)
        localStorage.setItem('cdburner-playsound', (!playSound).toString());
    }


    return (
        <>
            <div className="w-full flex justify-end m-1">
                <CDBurnerTour />
            </div>
            <Card>
                <CardHeader color={Colors.primary}>
                    <div className="flex w-full">
                        <div className="flex w-4/5 justify-center text-lg font-bold m-3">CD Burner</div>
                        <div className="flex justify-end w-1/5">
                            <Button
                                data-gaelo-flow="cd-burner-speaker"
                                color={playSound ? Colors.success : Colors.danger}
                                onClick={clickSoundHandler}
                                title={playSound ? "Disable sound" : "Enable sound"}
                                className="flex justify-end m-2"
                            >
                                {playSound ? <SoundEnabled /> : <SoundDisabled />}
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    <CdBurnerJobTable data-gaelo-flow="cd-burner-datatable" data={burnerJobs} />
                </CardBody>
            </Card>
        </>
    );
};

export default CdBurnerRoot;