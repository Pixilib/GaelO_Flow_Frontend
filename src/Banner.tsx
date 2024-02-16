import { useLocation, useNavigate } from "react-router-dom";
import BannerHome from "./assets/banner-home.svg?react";
import ArrowBack from "./assets/arrow-back.svg?react";
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
      data-gaelo-flow="banner"
      className={`flex h-24 w-full items-center justify-between rounded-br-20 border-transparent shadow-lg ${className}`}
    >
      <div className="ml-12 flex items-center">
        <span className="mr-8">
          {location.pathname === "/" ? (
            <BannerHome />
          ) : (
            <span className="cursor-pointer" onClick={() => navigate("/")}>
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

