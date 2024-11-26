import React, { useState } from "react";
import { Tag as TagType } from "../../../utils/types";

type TagProps = {
  tag: TagType;
  children: React.ReactNode;
};
const Tag = ({ children, tag }: TagProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <ul className="list-disc pl-4">
      <button
        onClick={() => setIsExpanded((expanded) => !expanded)}
        className="text-blue-600 underline"
      >
        {tag.Name} {isExpanded ? "▲" : "▼"}
      </button>
      {isExpanded && children}
    </ul>
  );
};

export default Tag;
