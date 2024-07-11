import { BsPencilFill as Edit } from 'react-icons/bs';
import { Colors } from '../utils';

type EditButtonProps = {
  onClick: () => void;
}

const EditButton = ({ onClick }: EditButtonProps) => (
  <Edit
    size={'1.3rem'}
    className="transition duration-70 hover:scale-110 fill-warning"
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
  />
);

export default EditButton;
