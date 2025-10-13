import { Cd } from "../icons";

type CdButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement|SVGElement>) => void;
}

const CdButton = ({ onClick }: CdButtonProps) => (
  <Cd
    size={'1.3rem'}
    className="transition duration-70 hover:scale-110"
    onClick={(e) => {
      e.stopPropagation();
      onClick(e);
    }}
  />
);

export default CdButton;
