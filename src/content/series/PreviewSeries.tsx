/**
 * Component for a modal to preview a series
 * @name PreviewSeries
 */

import React, { ChangeEvent, useMemo, useState } from "react";
import { getInstancesOfSeries } from "../../services/orthanc";
import { useCustomQuery } from "../../utils";

import { Input, Spinner } from "../../ui";
import PreviewInstance from "./PreviewInstance";
import { Instances } from "../../utils/types";

type PreviewSeriesProps = {
    seriesId: string;
}

const PreviewSeries: React.FC<PreviewSeriesProps> = ({ seriesId}) => {

    const [rows, setRows] = useState(1)
    const [columns, setColumns] = useState(3)

    const [imageIndex, setImageIndex] = useState(0)

    const pageSize = useMemo(() => {
        return rows * columns
    }, [rows, columns])

    const { data: instanceUIDs, isLoading } = useCustomQuery(
        ['series', seriesId, 'instances'],
        () => getInstancesOfSeries(seriesId),
        {
            select: (instances: Instances[]) => {
                return instances.sort((a, b) => a.indexInSeries - b.indexInSeries)
            }
        }
    )

    const selectedInstanceUIDs = useMemo(() => {
        if (!instanceUIDs) return null
        const start = Math.max(imageIndex, 0)
        const end = Math.min(start + (pageSize - 1), instanceUIDs.length - 1)
        console.log(start, end)
        const selectedUIDs = []
        for (let i = start; i <= end; i++) {
            selectedUIDs.push(instanceUIDs[i])
        }

        return selectedUIDs

    }, [pageSize, imageIndex, instanceUIDs])

    if (isLoading) return <Spinner />

    const handleColumnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setColumns(Number(event.target.value));
    };

    const handleRowChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRows(Number(event.target.value));
    };

    return (
        <>
            <div className={"flex w-full h-full"} style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}>
                {
                    selectedInstanceUIDs?.map((instance: Instances) => {
                        return <PreviewInstance key={instance.id} instanceUID={instance.id} />
                    })
                }
            </div>
            <input className="w-full" type="range" value={imageIndex} min={0} max={(instanceUIDs?.length ?? 1) - 1} onChange={(event: ChangeEvent<HTMLInputElement>) => setImageIndex(Number(event.target.value))} />
            <div className={"flex w-full justify-center"}>
                <div className="flex gap-3">
                    <Input
                        label="Columns :"
                        type="number"
                        id="number"
                        name="columns"
                        min={0}
                        max={10}
                        value={columns}
                        onChange={handleColumnChange}
                    />
                    <Input
                        label="Rows :"
                        type="number"
                        id="number"
                        name="rows"
                        min={1}
                        max={10}
                        value={rows}
                        onChange={handleRowChange}
                    />
                </div>
            </div>
        </>
    );
};

export default PreviewSeries;
