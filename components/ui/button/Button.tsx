import clsx from 'clsx';
import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import { Spinner } from '../spinner/Spinner';

interface Props {
  disabled?: boolean;
  loading: boolean;
  children: ReactNode;
  className: React.StyleHTMLAttributes<HTMLButtonElement>['className'];
  type: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  btnClass?: 'btn-primary' | 'btn-danger';
  onClick?: () => void;
}

export const Button: FC<Props> = ({
  disabled = false,
  loading,
  children,
  className,
  type = 'submit',
  btnClass = 'btn-primary',
  onClick,
}) => {
  return (
    <button
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
      className={clsx(className + ' flex items-center justify-center', {
        [btnClass]: !disabled,
        'btn-disabled': disabled,
      })}
    >
      {loading ? (
        <>
          <Spinner />
          Loading...
        </>
      ) : (
        <>{children}</>
      )}
    </button>
  );
};
