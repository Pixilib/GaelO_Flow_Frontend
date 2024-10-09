
import React from 'react';

type ProgressIndicatorProps = {
  progress: number;
};

const ProgressBar: React.FC<ProgressIndicatorProps> = ({ progress }) => {
  return (
    <div className="w-full">
      <div className="relative w-full h-2 bg-gray-200 rounded">
        <div
          className="absolute top-0 h-2 transition-all duration-500 ease-out rounded bg-gradient-to-r from-primary to-secondary"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-1 text-sm text-center text-primary">{progress}%</p>
    </div>
  );
};

export default ProgressBar;
