import { Edit } from "../icons";

type EditButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement|SVGElement>) => void;
  className?: string;
}

const EditButton = ({ onClick }: EditButtonProps) => (
  <Edit
    size={'1.3rem'}
    className="transition duration-70 hover:scale-110 fill-warning"
    onClick={(e) => {
      e.stopPropagation();
      onClick(e);
    }}
  />
);

export default EditButton;
