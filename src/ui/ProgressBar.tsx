
import React from 'react';

type ProgressIndicatorProps = {
  progression: number;
};

const ProgressBar: React.FC<ProgressIndicatorProps> = ({ progression }) => {
  return (
    <div className="w-full">
      <div className="relative w-full h-2 bg-gray-200 rounded">
        <div
          className="absolute top-0 h-2 transition-all duration-500 ease-out rounded bg-gradient-to-r from-primary to-secondary"
          style={{ width: `${progression}%` }}
        />
      </div>
      <p className="mt-1 text-sm text-center text-primary">{progression}%</p>
    </div>
  );
};

export default ProgressBar;
