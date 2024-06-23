import React from 'react';
import classNames from 'classnames';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isFullWidth?: boolean;
    isDisabled?: boolean;
    isLoading?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'medium',
    isFullWidth = false,
    isDisabled = false,
    isLoading = false,
    children,
    onClick
}) => {
    const baseClasses = 'rounded focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center transition-all duration-200';
    const sizeClasses = classNames({
        'px-2 py-1 text-xs': size === 'small',
        'px-4 py-2 text-sm': size === 'medium',
        'px-6 py-3 text-lg': size === 'large',
    });

    const variantClasses = classNames({
        'bg-neonPurple text-white hover:bg-neonPurple-dark': variant === 'primary',
        'bg-gray-700 text-white hover:bg-gray-600': variant === 'secondary',
        'bg-green-500 text-white hover:bg-green-400': variant === 'success',
        'bg-red-500 text-white hover:bg-red-400': variant === 'danger',
        'bg-yellow-500 text-black hover:bg-yellow-400': variant === 'warning',
        'bg-blue-500 text-white hover:bg-blue-400': variant === 'info',
    });

    const disabledClasses = 'bg-gray-400 cursor-not-allowed opacity-70';

    const fullWidthClass = isFullWidth ? 'w-full' : '';

    return (
        <button
            className={classNames(
                baseClasses,
                sizeClasses,
                variantClasses,
                { [disabledClasses]: isDisabled },
                fullWidthClass
            )}
            onClick={onClick}
            disabled={isDisabled || isLoading}
        >
            {isLoading ? (
                <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM12 20a8 8 0 010-16V0c6.627 0 12 5.373 12 12h-4z"
                    ></path>
                </svg>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
