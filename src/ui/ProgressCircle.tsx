type ProgressCircleProps = {
    progress: number;
    text?: string;
    size?: number;
    children?: React.ReactNode
};

const ProgressCircle = ({ progress, text = '%', size = 150, children }: ProgressCircleProps) => {
    const radius = 16;
    const circumference = 2 * Math.PI * radius;
    const progressValue = (progress / 100) * circumference;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg
                className="rotate-[135deg] w-full h-full"
                viewBox="0 0 36 36"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Cercle d'arrière-plan */}
                <circle
                    cx="18"
                    cy="18"
                    r={radius}
                    fill="none"
                    className="stroke-current text-primary dark:text-neutral-700"
                    strokeWidth="2"
                    strokeDasharray="75 100"
                />

                {/* Cercle de progression */}
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

            {/* Texte au centre */}
            <div className="absolute text-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                <span className="text-4xl font-bold text-primary dark:text-primary">
                    {progress}
                </span>
                <span className="block text-primary dark:text-primary">{text}</span>
                <span>
                    {children}
                </span>
            </div>
        </div>
    );
};

export default ProgressCircle;
