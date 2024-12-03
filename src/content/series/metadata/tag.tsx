import React, { useState } from "react";
import { Tag as TagType } from "../../../utils/types";
import { Badge } from "../../../ui";

type TagProps = {
  tag: TagType;
  children: React.ReactNode;
};
const Tag = ({ children, tag }: TagProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  console.log(tag)

  return (
    <ul className="list-none ml-4">
      <Badge
        value = {tag.Name + (isExpanded ? "▲" : "▼")}
        onClick={() => setIsExpanded((expanded) => !expanded)}
        className="text-blue-600 p-1"
      />
      {isExpanded && children}
    </ul>
  );
};

export default Tag;
