
//! This is a basic spinner component , maybe needs to change later
type SpinnerProps = {
  className? : string
}
const Spinner = ({className = ""} : SpinnerProps) => {
    return (
      <div className={"flex items-center justify-center"+ className}>
        <div className="border-b-2 rounded-full size-16 animate-spin border-primary"></div>
      </div>
    );
  };

  export default Spinner;
