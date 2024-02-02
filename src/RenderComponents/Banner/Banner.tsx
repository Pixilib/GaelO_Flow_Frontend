import { useLocation, useNavigate } from "react-router-dom";
import BannerHome from "../../assets/banner-home.svg?react";
import ArrowBack from "../../assets/arrow-back.svg?react";
//WIP - Banner component
export type BannerProps = {
  title: string;
  children?: React.ReactNode;
  className?: string;
};

export const Banner = ({ title, children, className }: BannerProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div
      className={`h-24 shadow-lg border-transparent rounded-br-20 flex items-center justify-between w-full ${className}`}
    >
      <div className="flex items-center ml-12">
        <span className="mr-8">
          {location.pathname === "/" ? (
            <BannerHome />
          ) : (
            <span className="cursor-pointer"onClick={()=> navigate("/")}>
              <ArrowBack />
            </span>
          )}
        </span>

        <span>
          <h1 className="text-2xl font-medium text-primary">{title}</h1>
        </span>
      </div>
      {children}
    </div>
  );
};
