import React from 'react';

type ProgressIndicatorProps = {
  progress: number;
};

const ProgressBar: React.FC<ProgressIndicatorProps> = ({ progress }) => {
  return (
    <div className="w-full">
      <div className="relative w-full overflow-hidden bg-neutral-200 dark:bg-neutral-400 rounded-full h-7">
        <div
          className="absolute top-0 transition-all duration-500 ease-out rounded-full h-7 bg-gradient-to-r from-primary to-secondary dark:from-blue-900 dark:to-orange-800"
          style={{ width: `${progress}%` }}
        />
        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-primary border rounded-2xl">
          {progress}%
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
