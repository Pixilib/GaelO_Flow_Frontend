import { useMemo, useState } from "react";
import { Badge, Input, Spinner } from "../../ui";
import { instanceHeader, instanceTags } from "../../services/instances";
import { getInstancesOfSeries } from "../../services/orthanc";
import { Metadata, Tag as TagType } from "../../utils/types";
import { useCustomQuery } from "../../utils";
import TagSequence from "./metadata/TagSequence";
import TagItem from "./metadata/TagItem";

type TagsProps = {
  seriesId: string;
};

const TagsTree = ({ seriesId }: TagsProps) => {
  const [instanceNumber, setInstanceNumber] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data: instances } = useCustomQuery(
    ["series", seriesId, "instances"],
    () => getInstancesOfSeries(seriesId)
  );

  const currentInstanceId = useMemo(() => {
    return instanceNumber != null && instances != null
      ? instances[instanceNumber - 1]?.id
      : null;
  }, [instanceNumber, instances]);

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

  const filteredMetadata = useMemo(() => {
    if (!searchTerm) return metadata;
    const lowerSearchTerm = searchTerm.toLowerCase();

    return Object.entries(metadata).reduce((filtered, [tagAddress, tag]) => {
      const tagValue = String(tag.Value).toLowerCase();
      const tagName = tag.Name?.toLowerCase();

      if (
        tagAddress.toLowerCase().includes(lowerSearchTerm) ||
        tagName?.includes(lowerSearchTerm) ||
        tagValue.includes(lowerSearchTerm)
      ) {
        filtered[tagAddress] = tag;
      }

      return filtered;
    }, {} as Metadata);
  }, [metadata, searchTerm]);

  const getComponent = (tagAddress: string, tag: TagType) => {
    if (Array.isArray(tag.Value)) {
      return (
        <li key={tagAddress} className="ml-4 list-none ">
          <TagSequence tag={tag}>
            {tag.Value.map((metadata, index) => (
              <li key={`${tagAddress}-${index}`} >
                <ul className="list-disc">
                  {Object.entries(metadata).map(([addressTag, tag]) =>
                    getComponent(addressTag, tag)
                  )}
                </ul>
              </li>
            ))}
          </TagSequence>
        </li>
      );
    } else {
      return (
        <li className="ml-4 list-none odd:bg-white even:bg-light-gray" key={tagAddress}>
          <TagItem address={tagAddress} tag={tag} />
        </li>
      );
    }
  };

  return (
    <div className="space-y-3">
      <Input
        label={"Instance Number " + (instanceNumber ?? 1)}
        type="range"
        min={1}
        max={instances?.length ?? 0}
        value={instanceNumber ?? 1}
        onChange={(event) => setInstanceNumber(Number(event.target?.value))}
      />
      <Input
        label="Search Metadata"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target?.value)}
        placeholder="Search by tag address, name, or value"
      />
      <div className="overflow-auto min-h-[800px] max-h-[800px] p-3 pl-0">
        <ul className="list-disc">
          {Object.entries(filteredMetadata)
            .sort()
            .map(([tagAddress, tag]) => getComponent(tagAddress, tag))}
        </ul>
      </div>
    </div>
  );
};

export default TagsTree;
