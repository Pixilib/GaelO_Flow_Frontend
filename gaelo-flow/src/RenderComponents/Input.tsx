
type InputProps = {
  className?: string;
  placeholder?: string;
  label?: string;
  svg?: React.ReactNode;
  [key: string]: any;
};

const Input = ({ className = "", placeholder = "", label = "", svg = null, ...props }: InputProps) => {

  return (
    <fieldset className="relative space-y-1">
      <legend className="font-bold ">{label}</legend>
      <input
        className={"peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600" + " " + className}
        type="text"
        placeholder={placeholder}
        {...props}
      />
      <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
        {svg}
      </div>
    </fieldset>
  );
};

export default Input;
