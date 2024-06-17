import { BsPencilFill as Edit } from 'react-icons/bs';

type EditButtonProps = {
  onClick: () => void;
}

const EditButton = ({ onClick }:EditButtonProps) => (
  <Edit
    size={'1.3rem'}
    className="transition duration-70 hover:scale-110"
    color="#FF9500"
    onClick={onClick}
  />
);

export default EditButton;