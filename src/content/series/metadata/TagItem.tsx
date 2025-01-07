import { Tag as TagType } from "../../../utils/types";

type TagProps = {
  address: string;
  tag: TagType;
  children?: React.ReactNode;
};
const TagItem = ({ address, tag }: TagProps) => {
  return (
    <div className="w-full flex justify-between">
      <span>{address} - {tag.Name}</span>
      <span>{tag.Value as string}</span>
    </div>
  );
};

export default TagItem;
