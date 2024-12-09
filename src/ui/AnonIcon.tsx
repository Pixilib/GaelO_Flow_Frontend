// AnonIcon.tsx
const AnonIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="23"
        fill="none"
        viewBox="0 0 24 23"
        className={`${className} transition-colors duration-300 cursor-pointer`}
    >
        <path
            className="fill-current"
            d="M17.091 14.374a4.368 4.368 0 0 0-4.114 2.876h-1.953a4.368 4.368 0 0 0-4.115-2.876c-2.406 0-4.364 1.935-4.364 4.313C2.545 21.067 4.503 23 6.91 23c2.159 0 3.955-1.556 4.303-3.593h1.577c.346 2.037 2.143 3.593 4.3 3.593 2.407 0 4.365-1.934 4.365-4.313 0-2.378-1.958-4.313-4.365-4.313ZM6.91 20.844c-1.203 0-2.182-.967-2.182-2.157s.979-2.157 2.182-2.157c1.204 0 2.183.968 2.183 2.157 0 1.19-.98 2.157-2.183 2.157Zm10.182 0c-1.203 0-2.182-.967-2.182-2.157s.979-2.157 2.182-2.157c1.204 0 2.183.968 2.183 2.157 0 1.19-.98 2.157-2.183 2.157Zm5.818-10.781h-2.848l-.665-3.45-.001-.004-.803-4.162a1.083 1.083 0 0 0-.771-.834L12.267.042a1.103 1.103 0 0 0-.604 0L6.175 1.615a1.083 1.083 0 0 0-.768.833L4.604 6.61l-.001.005-.665 3.449H1.09A1.081 1.081 0 0 0 0 11.14c0 .595.488 1.078 1.09 1.078h21.82c.602 0 1.09-.483 1.09-1.078 0-.596-.488-1.079-1.09-1.079ZM11.967 2.2l4.608 1.303.433 2.247H6.991l.434-2.25 4.543-1.3ZM6.16 10.062l.416-2.156h10.85l.416 2.157H6.16Z"
        />
    </svg>
);

export default AnonIcon;