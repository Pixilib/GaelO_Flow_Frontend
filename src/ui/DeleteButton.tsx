import { Trash } from "../icons";

type DeleteButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement | SVGElement>) => void;
  disabled?: boolean;
};

const DeleteButton = ({ onClick, disabled }: DeleteButtonProps) => (
  <button
    type="button"
    className="transition duration-70 hover:scale-110"
    onClick={(e) => {
      e.stopPropagation();
      onClick(e);
    }}
    disabled={disabled}
    style={{ background: "none", border: "none", padding: 0, cursor: disabled ? "not-allowed" : "pointer" }}
    tabIndex={disabled ? -1 : 0}
  >
    <Trash
      size={'1.3rem'}
      className={`fill-danger ${disabled ? "opacity-50" : ""}`}
    />
  </button>
);

export default DeleteButton;