
type InputProps = {
    bordered?: boolean
    placeholder?: string;
    label?: string;
    
}

const Input = ({ bordered = false, placeholder = "", label = "" }: InputProps) => {

    const inputClasses = {
        'username': 'bg-white-500 hover:border-violet-500',
    }


    return (
        <fieldset className="border">

            <legend>test</legend>
            <input
                className={bordered ? inputClasses.username : inputClasses.mailAddress + ` border w-full rounded border-purple-300 text-gray-900`}
                type="text"
                placeholder={placeholder}
                onChange={(e) => { }} />
        </fieldset>
    );
}

export default Input;
