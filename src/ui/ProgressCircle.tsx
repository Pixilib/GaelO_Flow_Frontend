type ProgressCircleProps = {
  progress: number;
  text?: string;
  size?: number;
  children?: React.ReactNode;
  className?: string;
  progressColor?: string;
  [props: string]: any;
};

const ProgressCircle = ({
  progress,
  text = 'Average',
  size = 120,
  children,
  className = '',
  progressColor = 'text-orange-600',
  ...props
}: ProgressCircleProps) => {
  const radius = 15;
  const circumference = 2 * Math.PI * radius;
  const progressValue = (progress / 100) * circumference;

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }} {...props}>
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
          className={`stroke-current text-neutral-300 dark:text-neutral-700`}
          strokeWidth="3"
        />

        {/* Progress circle */}
        <circle
          cx="18"
          cy="18"
          r={radius}
          fill="none"
          className={`stroke-current ${progressColor}`}
          strokeWidth="3"
          strokeDasharray={`${progressValue} ${circumference}`}
        />
      </svg>

      {/* Centered text in black color */}
      <div className="absolute text-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <span className="text-3xl font-bold text-black">
          {progress}
        </span>
        <span className="block text-sm text-black">
          {text}
        </span>
        {children}
      </div>
    </div>
  );
};

export default ProgressCircle;
