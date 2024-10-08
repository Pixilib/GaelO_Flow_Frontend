import { Trash } from "../icons";

type DeleteButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement|SVGElement>) => void;
}

const DeleteButton = ({ onClick }: DeleteButtonProps) => (
  <Trash
    size={'1.3rem'}
    className="transition duration-70 hover:scale-110 fill-danger"
    onClick={(e) => {
      e.stopPropagation();
      onClick(e);
    }}
  />
);

export default DeleteButton;
