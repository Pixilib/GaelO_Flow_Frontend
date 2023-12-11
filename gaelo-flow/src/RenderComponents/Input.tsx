
type InputProps = {
  placeholder?: string;
  label?: string;
  svg?: React.ReactNode;
  [key: string]: any;
};

const Input = ({ placeholder = "", label = "", svg =null, ...props }: InputProps) => {

  const inputStyle = {
    base: 'bg-gray-100 rounded-lg p-2 shadow-md',
    hover: 'hover:border-blue-500 hover:bg-white',
    placeholder: 'placeholder-gray-400',

  };

  const containerStyle = {
    position: 'relative',
  };

  const svgContainerStyle = {
    position: 'absolute',
    top: '50%'
    left: '10px'
  };

  return (
    <fieldset>
      <legend>{label}</legend>
      <input
        className={`${inputStyle.base} ${inputStyle.hover} ${inputStyle.placeholder} w-full text-gray-600 peer`}
        type="text"
        placeholder={placeholder}
        {...props}
      />
      <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-2 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
        {svg}
      </div>
    </fieldset>
  );
};

export default Input;
