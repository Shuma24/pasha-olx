import clsx from 'clsx';
import { ForwardedRef, PropsWithRef, SelectHTMLAttributes, useId } from 'react';
import React from 'react';

export type UiSelectOption = {
  value: string;
  label: string;
};

export type UiSelectFieldProps = {
  className?: string;
  label?: string;
  error?: string;
  selectProps?: PropsWithRef<SelectHTMLAttributes<HTMLSelectElement>>;
  options?: UiSelectOption[];
};

export const UiSelectField = React.forwardRef(
  (
    { className, error, label, selectProps: inputProps, options }: UiSelectFieldProps,
    ref: ForwardedRef<HTMLSelectElement>,
  ) => {
    const id = useId();
    return (
      <div className={clsx(className, 'flex flex-col gap-1')}>
        {label && (
          <label htmlFor={id} className='block'>
            {label}
          </label>
        )}
        <select
          {...inputProps}
          id={id}
          ref={ref}
          className={clsx(
            inputProps?.className,
            'rounded border border-slate-300 focus:border-teal-600 px-2 h-10 outline-none',
          )}>
          {options?.map((option, i) => (
            <option key={i} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <div className='text-rose-400 text-sm'>{error}</div>}
      </div>
    );
  },
);

UiSelectField.displayName = 'UiSelectField';
