import React from 'react';
import { clsx } from 'clsx';

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
}

const colorClasses = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  red: 'bg-red-500',
  yellow: 'bg-yellow-500',
  purple: 'bg-purple-500'
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  value, 
  max, 
  className,
  color = 'blue' 
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <div className={clsx('w-full bg-gray-200 rounded-full h-2', className)}>
      <div
        className={clsx('h-2 rounded-full transition-all duration-300', colorClasses[color])}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};