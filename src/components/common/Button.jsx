import React from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

const Button = ({
  label = 'Click Me',
  onClick,
  className = '',
  type = 'button',
  to,
  variant = 'gray', // can be extended later
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={clsx(
        'px-6 py-3 rounded-lg text-white shadow-lg',
        'transition-all duration-200 ease-in-out',
        'hover:scale-105 hover:brightness-110 active:scale-100',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400',
        {
          'bg-gradient-to-r from-blue-600 to-blue-500': variant === 'gray',
        },
        className
      )}
    >
      {label}
    </button>
  );
};

export default Button;
