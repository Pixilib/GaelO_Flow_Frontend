type ToggleProps = {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  children?: React.ReactNode;
  className?: string;
  [key :string] : any;
};
const ToggleSwitch = ({onChange, checked, children, className = '', ...props} : ToggleProps)  => {

  return (
    <label className="flex items-center cursor-pointer">
      {/* The real hidden checkbox input */}
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
      />
      {/* switch design */}
      <div
        {...props}
        className={`relative flex items-center h-7 w-14 rounded-full transition-colors ${className}`}
      >
        {/* Circle toggle with moon or sun */}
        <div
          className={`absolute top-0 ${
            checked ? "right-0 translate-x-0.5" : "left-0 translate-x-0"
          } w-7 h-7 flex items-center justify-center rounded-full shadow-lg transition-transform duration-200 ease-in-out bg-white`}
        >
          {children}
        </div>
      </div>
    </label>
  );
};

export default ToggleSwitch;
