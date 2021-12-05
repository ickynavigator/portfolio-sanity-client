import React from 'react';

interface T {
  tip: string;
  location?: 'top' | 'bottom' | 'right' | 'left';
  className?: string;
  tipClass?: string;
}
const Tooltip: React.FC<T> = ({
  tip,
  children,
  className,
  tipClass,
  location = 'top',
}) => {
  const tiplocation = () => {
    switch (location) {
      case 'top':
        return '-mt-10';
      case 'bottom':
        return '-mb-10';
      case 'right':
        return '-mr-10';
      case 'left':
        return '-ml-10';
      default:
        return '-mt-10';
    }
  };

  return (
    <span
      className={`flex flex-row justify-center text-center has-tooltip ${className}`}
    >
      <span
        className={`${tipClass} tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 border-2 border-black ${tiplocation()}`}
      >
        {tip}
      </span>
      <span>{children}</span>
    </span>
  );
};

export default Tooltip;
