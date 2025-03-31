import React from "react";

type ToastProps = {
    content: string | React.ReactNode;
    type: "success" | "danger" | "warning" | "info";
    animation: "slide-left" | "slide-right";
    position: "bottom-left" | "bottom-right" | "top-left" | "top-right";
    onClose?: () => void;
};

function Toast({ content, type, animation = 'slide-right', position = "bottom-right", onClose }: ToastProps) {
    const getType = () => {
        switch (type) {
            case "success":
                return "bg-success";
            case "danger":
                return "bg-danger";
            case "warning":
                return "bg-warning";
            case "info":
                return "bg-primary"
            default:
        }
    }

    const getPosition = () => {
        switch (position) {
            case "bottom-left":
                return "bottom-2 left-2";
            case "bottom-right":
                return "bottom-2 right-2";
            case "top-left":
                return "top-2 left-2";
            case "top-right":
                return "top-2 right-2"
        }
    }

    const getAnimation = () => {
        switch (animation) {
            case "slide-left":
                return "animate-[slide-out-left_0.3s_ease-in-out]";
            case "slide-right":
                return "animate-[slide-out-right_0.3s_ease-in-out]";
        }
    }

    return (
        <div data-gaelo-ui='toast' onClick={onClose} className={`${getType()}  ${getAnimation()} ${getPosition()} rounded-xl text-sm text-white shadow-lg dark:bg-gray-900 max-w-56 leading-6	text-wrap text-justify`} role="alert">
            <div className="flex p-4">
                {content}
                <div className="ms-auto">
                    <button onClick={onClose} type="button" className="inline-flex items-center justify-center text-white rounded-lg opacity-50 size-5 shrink-0 hover:text-white hover:opacity-100 focus:opacity-100 focus:outline-hidden">
                        <span className="sr-only">Close</span>
                        <svg className="h-12 size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" ><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
}


export default Toast

