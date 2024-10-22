type ProgressCircleProps = {
  progress: number;
  text?: string;
  size?: number; // This defines the size of the circle
  children?: React.ReactNode;
  className?: string; // Prop for custom CSS class
  progressColor?: string; // Ajout pour la couleur de progression
};

const ProgressCircle = ({
  progress,
  text = 'Average',
  size = 120,
  children,
  className = '', // Default to an empty string if no class is provided
  progressColor = 'text-orange-600', // Couleur de progression par défaut
}: ProgressCircleProps) => {
  const radius = 15; // Increased radius for a larger circle
  const circumference = 2 * Math.PI * radius;
  const progressValue = (progress / 100) * circumference;

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
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
          strokeWidth="3" // Increased stroke width for better visibility
        />

        {/* Progress circle */}
        <circle
          cx="18"
          cy="18"
          r={radius}
          fill="none"
          className={`stroke-current ${progressColor}`} // Utilisation de la couleur de progression
          strokeWidth="3" // Increased stroke width for better visibility
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
