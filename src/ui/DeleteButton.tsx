import { BsTrashFill as Delete } from "react-icons/bs";

type DeleteButtonProps = {
  onClick: () => void;
}

const DeleteButton = ({ onClick }: DeleteButtonProps) => (
  <Delete
    size={'1.3rem'}
    className="transition duration-70 hover:scale-110"
    color="#FF0000"
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
  />
);
export default DeleteButton;
