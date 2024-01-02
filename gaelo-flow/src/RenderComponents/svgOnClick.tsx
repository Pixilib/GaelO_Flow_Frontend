type SvgIconProps = {
    onClick: () => void;
  };
  
  export const svgWithOnClick = (SvgComponent: () => JSX.Element) => {
    const svgOnClick: React.FC<SvgIconProps> = ({ onClick }) => (
      <div onClick={onClick}>
        {SvgComponent()}
      </div>
    );
  
    return svgOnClick;
  };