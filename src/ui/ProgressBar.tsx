import React from 'react';

type ProgressIndicatorProps = {
  progress: number;
};

const ProgressBar: React.FC<ProgressIndicatorProps> = ({ progress }) => {
  return (
    <div className="w-full">
      <div className="relative w-full h-6 bg-gray-200">
        <div
          className="absolute top-0 transition-all duration-500 ease-out rounded-xl h-7 bg-gradient-to-r from-primary to-secondary"
          style={{ width: `${progress}%` }}
        />
        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
          {progress}%
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
