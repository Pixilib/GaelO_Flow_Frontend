// CloseButton.tsx
import { IoIosCloseCircle as CloseWindows } from "react-icons/io";

type CloseButtonProps = {
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  variant?: "default" | "danger" | "success" |"warning";
};

const CloseButton = ({ onClose, variant="default", className}: CloseButtonProps) => {
  
  const variants = {
    default: "fill-white",
    warning: "fill-warning",
    danger: "fill-danger",
    success: "fill-success",
  };
 
  const color = variants[variant];
  return (
    <button title="Close" onClick={onClose}>
      <CloseWindows
        size={"1.7rem"}
        className={`mr-3 ${color} ${className} transition cursor-pointer t duration-70 hover:scale-110`}
      />
    </button>
  );
};

export default CloseButton;