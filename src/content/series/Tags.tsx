import { useMemo, useState } from "react";
import { getInstancesOfSeries } from "../../services/orthanc";
import { Input, Spinner } from "../../ui";
import { useCustomQuery } from "../../utils";
import { instanceHeader, instanceTags } from "../../services/instances";
import { Metadata, Tag } from "../../utils/types";
import { Meta } from "@storybook/react";

type TagsProps = {
  seriesId: string;
};

const Tags = ({ seriesId }: TagsProps) => {
  const { data: instances } = useCustomQuery(
    ["series", seriesId, "instances"],
    () => getInstancesOfSeries(seriesId)
  );
  const [instanceNumber, setInstanceNumber] = useState<number>(1);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const currentInstanceId =
    instanceNumber != null && instances != null
      ? instances[instanceNumber - 1].id
      : null;

  const { data: header } = useCustomQuery<Metadata>(
    ["instances", currentInstanceId, "metadata"],
    () => instanceHeader(currentInstanceId),
    {
      enabled: currentInstanceId !== null,
    }
  );

  const { data: tags } = useCustomQuery<Metadata>(
    ["instances", currentInstanceId, "tags"],
    () => instanceTags(currentInstanceId),
    {
      enabled: currentInstanceId !== null,
    }
  );

  const metadata = useMemo(() => {
    if (!header || !tags) return {};
    return {
      ...header,
      ...tags,
    };
  }, [header, tags]);

  const toggleExpand = (key: string) => {
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getComponent = (tagAddress: string, tag: Tag) => {
    if (Array.isArray(tag.Value)) {
      return (
        <li key={tagAddress} className="ml-4">
          <button
            onClick={() => toggleExpand(tagAddress)}
            className="text-blue-600 underline"
          >
            {tag.Name} {expanded[tagAddress] ? "▲" : "▼"}
          </button>
          {expanded[tagAddress] && (
            <ul className="list-disc pl-4">
              {tag.Value.map((metadata, index) => (
                <li key={`${tagAddress}-${index}`}>
                  <ul>
                    {Object.entries(metadata).map(([addressTag, tag]) =>
                      getComponent(addressTag, tag)
                    )}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </li>
      );
    } else {
      return (
        <li className="ml-4 px-2" key={tagAddress}>
          {tag.Name} - {tag.Value}
        </li>
      );
    }
  };

  if (!instances) return <Spinner />;

  return (
    <>
      <Input
        label="Instance Number"
        min={1}
        max={instances.length}
        value={instanceNumber ?? 1}
        onChange={(event) => setInstanceNumber(Number(event.target?.value))}
      />
      <div>
        <ul className="list-disc">
          {Object.entries(metadata).map(([tagAddress, tag]) =>
            getComponent(tagAddress, tag)
          )}
        </ul>
      </div>
    </>
  );
};

export default Tags;
