
//! This is a basic spinner component , maybe needs to change later
type SpinnerProps = {
  className? : string
}
const Spinner = ({className = ""} : SpinnerProps) => {
    return (
      <div className={"flex items-center justify-center"+ className}>
        <div className="size-16 animate-spin rounded-full border-b-2 border-primary bg-white"></div>
      </div>
    );
  };
  
  export default Spinner;
  