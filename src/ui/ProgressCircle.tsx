type ProgressCircleProps = {
    progress: number;
    text?: string;
    size?: number; // This defines the size of the circle
    children?: React.ReactNode;
};

const ProgressCircle = ({ progress, text = '%', size = 100, children }: ProgressCircleProps) => { // Reduced default size
    const radius = 12; // Reduced radius for a smaller circle
    const circumference = 2 * Math.PI * radius;
    const progressValue = (progress / 100) * circumference;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg
                className="rotate-[135deg] w-full h-full"
                viewBox="0 0 36 36"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Background circle */}
                <circle
                    cx="18"
                    cy="18"
                    r={radius}
                    fill="none"
                    className="stroke-current text-primary dark:text-neutral-700"
                    strokeWidth="2"
                    strokeDasharray="75 100"
                />

                {/* Progress circle */}
                <circle
                    cx="18"
                    cy="18"
                    r={radius}
                    fill="none"
                    className="stroke-current text-primary dark:text-primary"
                    strokeWidth="2"
                    strokeDasharray={`${progressValue} ${circumference}`}
                />
            </svg>

            {/* Centered text */}
            <div className="absolute text-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                <span className="text-xl font-bold text-primary dark:text-primary"> {/* Reduced text size */}
                    {progress}
                </span>
                <span className="block text-sm text-darj dark:text-primary">{text}</span>
                <span>
                    {children}
                </span>
            </div>
        </div>
    );
};

export default ProgressCircle;
