type ProgressCircleProps = {
  progress: number;
  text?: string;
  className?: string;
  size?: number; 
};

const ProgressCircle = ({ progress, text, className, size = 90 }: ProgressCircleProps) => {
  const radius = (size / 2) - 16;
  const circumference = 2 * Math.PI * radius;

  return (
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
          <svg width={size} height={size}>
              <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke="#4746B8"
                  strokeWidth="10"
                  fill="none"
                  className="origin-center transform -rotate-90"
                  style={{
                      strokeDasharray: circumference,
                      strokeDashoffset: circumference - (progress / 100) * circumference,
                  }}
              />
          </svg>
          <svg className="absolute" width={size} height={size}>
              <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke="#8C8BD3"
                  strokeWidth="10"
                  fill="none"
                  opacity="0.3"
              />
          </svg>
          <div className={`absolute flex items-center justify-center ${className}`}>
              {text}
          </div>
      </div>
  );
};

export default ProgressCircle;
