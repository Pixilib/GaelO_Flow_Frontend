import React from "react";


type Size = "sm" | "lg" | "xl" | "w-full";

interface ModalProps {
  show: boolean;
  size?: Size;
  children?: React.ReactNode;
  [key: string]: any;
}
const ModalGaeloUi = ({ show, size = "lg", children, ...props }: ModalProps) => {
  const SizeClasses:Record<Size, string>  = {
    "sm": "min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[300px]",
    "lg": "min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px] min-[992px]:max-w-[800px]",
    "xl": "min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px] min-[992px]:max-w-[800px] min-[1200px]:max-w-[1140px]",
    "w-full": "h-full w-full"
  };
  return (
    <div
      data-gaelo-ui='modal'
      className={
        "fixed left-0 top-0 z-[1055] w-full h-full overflow-y-auto overflow-x-hidden bg-gray-600 bg-opacity-50 dark:text-white " +
        (show ? "open" : "hidden")
      }
      {...props}
    >
      {show ? (
        <div
          className={
            "relative flex min-h-[calc(100%-1rem)] w-auto items-center hs-overlay-open:opacity-100 hs-overlay-open:duration-500 opacity-0 transition-all " +
            SizeClasses[size]
          }
        >
          <div className="relative flex w-full flex-col bg-white border shadow-sm rounded-2xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            {children}
          </div>

        </div>
      ) : null}
    </div>
  );
};

interface HeaderProps {
  children?: React.ReactNode;
  className? : string;
  onClose?: () => void;
  [key: string]: any;
}
const ModalHeader = ({
  title = "Modal",
  className = "",
  onClose = () => { },
  children,
  ...props
}: HeaderProps) => {
  return (
    <div
      data-gaelo-ui='modal-header'
      className={"flex justify-between w-full py-3 px-4 border-b dark:border-gray-700 " + className}
      {...props}
    >
      <div>
        {children}
      </div>
      <div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center justify-center w-8 h-8 text-gray-500 transition-all rounded-md hs-dropdown-toggle hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-3.5 h-3.5"
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
              fill="currentColor"
            />
          </svg>

        </button>
      </div>
    </div>
  );
};

interface TitleProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}
const ModalTitle = ({ children, className= "", ...props }: TitleProps) => {
  return (
    <div data-gaelo-ui='modal-title' className={"relative text-3xl font-semibold text-primary dark:text-white" + className} {...props}>
      {children}
    </div>
  );
};

interface FooterProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}
const ModalFooter = ({ children, className = "", ...props }: FooterProps) => {
  return (
    <div data-gaelo-ui='modal-footer' className={"relative w-full gap-x-2 py-3 px-4 border-t dark:border-gray-700 " + className} {...props}>
      {children}
    </div>
  );
};

interface BodyProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}
const ModalBody = ({ className = "", children, ...props }: BodyProps) => {
  return <div data-gaelo-ui='modal-body' className={"relative w-full gap-x-2 py-3 px-4 overflow-auto " + className} {...props} >{children}</div>;
};

export default ModalGaeloUi;
export { ModalHeader, ModalTitle, ModalFooter, ModalBody };