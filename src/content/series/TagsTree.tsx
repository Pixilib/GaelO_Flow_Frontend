import { useMemo, useState } from "react";
import { getInstancesOfSeries } from "../../services/orthanc";
import { Badge, Input, Spinner } from "../../ui";
import { useCustomQuery } from "../../utils";
import { instanceHeader, instanceTags } from "../../services/instances";
import { Metadata, Tag as TagType } from "../../utils/types";
import Tag from "./metadata/tag";

type TagsProps = {
  seriesId: string;
};

const TagsTree = ({ seriesId }: TagsProps) => {
  const { data: instances } = useCustomQuery(
    ["series", seriesId, "instances"],
    () => getInstancesOfSeries(seriesId)
  );
  const [instanceNumber, setInstanceNumber] = useState<number>(1);

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

  const getComponent = (tagAddress: string, tag: TagType) => {
    if (Array.isArray(tag.Value)) {
      return (
        <li key={tagAddress} className="ml-4">
          <Tag tag={tag}>
            {tag.Value.map((metadata, index) => (
              <li key={`${tagAddress}-${index}`}>
                <ul>
                  {Object.entries(metadata).map(([addressTag, tag]) =>
                    getComponent(addressTag, tag)
                  )}
                </ul>
              </li>
            ))}
          </Tag>
        </li>
      );
    } else {
      return (
        <li className="ml-4 px-2" key={tagAddress}>
          <Badge value={tag.Name +" - "+ (tag.Value as string)}/>
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
        <ul className="list-disc space-y-3">
          {Object.entries(metadata).map(([tagAddress, tag]) =>
            getComponent(tagAddress, tag)
          )}
        </ul>
      </div>
    </>
  );
};

export default TagsTree;
