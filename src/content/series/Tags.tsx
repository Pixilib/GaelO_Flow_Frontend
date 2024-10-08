import { useMemo, useState } from "react";
import { getInstancesOfSeries } from "../../services/orthanc";
import { Input, Spinner } from "../../ui";
import { useCustomQuery } from "../../utils";
import { instanceHeader, instanceTags } from "../../services/instances";

type TagsProps = {
  seriesId: string;
};
const Tags = ({ seriesId }: TagsProps) => {
  const { data: instances } = useCustomQuery(
    ["series", seriesId, "instances"],
    () => getInstancesOfSeries(seriesId)
  );
  const [instanceNumber, setInstanceNumber] = useState<number>(1);

  const currentInstanceId =
    instanceNumber != null && instances != null
      ? instances[instanceNumber - 1].id
      : null;

  const { data: header } = useCustomQuery(
    ["instances", currentInstanceId, "metadata"],
    () => instanceHeader(currentInstanceId),
    {
      enabled: currentInstanceId !== null,
    }
  );

  const { data: tags } = useCustomQuery(
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

  const getComponent = (
    tagName: string,
    tag: string | Record<string, string>[]
  ) => {
    if (Array.isArray(tag)) {
      return tag.map((tagItem) => {
        return Object.entries(tagItem).map(([key, tag]) => {
          return getComponent(key, tag);
        });
      });
    } else {
      return (
        <span>
          <strong>{tagName}:</strong> {tag}
        </span>
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
      <ul>
        {Object.entries(metadata).map(([key, tag]) => (
          <li key={key}>{getComponent(key, tag)}</li>
        ))}
      </ul>
    </>
  );
};

export default Tags;
