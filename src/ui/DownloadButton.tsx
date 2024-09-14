import { RiDownload2Line as Download } from "react-icons/ri";

type DownloadButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement|SVGElement>) => void;
}

const DownloadButtonProps = ({ onClick }: DownloadButtonProps) => (
  <Download
    size={'1.3rem'}
    className="transition duration-70 hover:scale-110 fill-success"
    onClick={(e) => {
      e.stopPropagation();
      onClick(e);
    }}
  />
);

export default DownloadButtonProps;
