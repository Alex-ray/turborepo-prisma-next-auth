import { forwardRef } from 'react';
import clsx from 'clsx'

import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

const formClasses =
  'block w-full appearance-none rounded-md  bg-gray-50 px-3 py-2 sm:text-sm'

const blueFocusFormClasses =
  "focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 ";

const grayTextFormClases =
  "border border-gray-200  text-gray-900 placeholder-gray-400";

type LabelProps = {
  id: string,
  children?: React.ReactNode,
  [prop: string]: any
};

type TextFieldProps = {
  id: string,
  label: string,
  type: string,
  className: string,
  error: string,
  [prop: string]: any
};

type SelectFieldProps = {
  id: string,
  label: string,
  className: string
};

const Label = ({ id, children }: LabelProps) => {
  return (
    <label
      htmlFor={id}
      className="mb-3 block text-sm font-medium text-gray-700"
    >
      {children}
    </label>
  )
};


export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    { id, label, type = "text", className = "", error = "", ...props },
    ref
  ) {
    const isError = error.length > 0;

    return (
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <div
          className={clsx("relative mt-1 rounded-md shadow-sm", className, {
            "border-red-300 text-red-900 focus:ring-red-500": isError,
          })}
        >
          <input
            id={id}
            type={type}
            {...props}
            className={clsx(formClasses, {
              [blueFocusFormClasses]: !isError,
              [grayTextFormClases]: !isError,
              "border-red-300 text-red-900 focus:ring-red-500": isError,
            })}
            ref={ref}
          />
          {isError && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {error}
        </p>
      </div>
    );
  }
);

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  function SelectField({ id, label, className = "", ...props }, ref) {
    return (
      <div className={className}>
        {label && <Label id={id}>{label}</Label>}
        <select
          id={id}
          {...props}
          className={clsx(formClasses, "pr-8")}
          ref={ref}
        />
      </div>
    );
  }
);
