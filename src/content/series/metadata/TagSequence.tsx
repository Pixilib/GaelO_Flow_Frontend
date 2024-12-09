import React, { useState } from "react";
import { Tag as TagType } from "../../../utils/types";
import { Button } from "../../../ui";
import { Colors } from "../../../utils";

type TagProps = {
  tag: TagType;
  children?: React.ReactNode;
};
const TagSequence = ({ tag, children }: TagProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <ul className="list-none ml-4 m-3 space-y-3">
      <Button
        color={Colors.primary}
        onClick={() => setIsExpanded((expanded) => !expanded)}
      >
        {tag.Name + (isExpanded ? "▲" : "▼")}
      </Button>
      {isExpanded && children}
    </ul>
  );
};

export default TagSequence;
