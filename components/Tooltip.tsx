import React from 'react';

interface T {
  tip: string;
  location?: 'top' | 'bottom' | 'right' | 'left';
  className?: string;
}
const Tooltip: React.FC<T> = ({
  tip,
  children,
  className,
  location = 'top',
}) => {
  return (
    <span
      className={`flex flex-row justify-center text-center has-tooltip ${className}`}
    >
      <span
        className={`tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 border-2 border-black -m${location.charAt(
          0,
        )}-12`}
      >
        {tip}
      </span>
      <span>{children}</span>
    </span>
  );
};

export default Tooltip;
