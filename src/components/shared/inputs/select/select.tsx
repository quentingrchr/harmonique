import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import * as RadixSelect from "@radix-ui/react-select";
import { default as classNames, default as cn } from "classnames";
import React from "react";
import { SelectOption } from "./type";

export interface SelectProps extends RadixSelect.SelectProps {
  options: SelectOption[];
  placeholder?: string;
  labelIcon?: React.ReactNode;
  label: string;
  tabIndex?: number;
  className?: string;
  withCheckIcons?: boolean;
}
interface SelectItemProps extends RadixSelect.SelectItemProps {
  children?: React.ReactNode;
  isSelected?: boolean;
  withCheckIcons?: boolean;
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, isSelected, withCheckIcons, ...rest }, forwardedRef) => {
    if (!children) return null;

    return (
      <RadixSelect.Item
        ref={forwardedRef}
        className={classNames(
          "flex items-center py-2 font-helvetica text-sm font-light text-white hover:bg-gray-900 data-[highlighted]:bg-gray-900 rounded-md outline-none",
          {
            "bg-gray-900": isSelected,
            "px-2": !withCheckIcons,
          }
        )}
        {...rest}
      >
        {!isSelected && withCheckIcons && (
          <div className={cn("w-4 h-4 mx-2")}></div>
        )}
        {withCheckIcons && (
          <RadixSelect.ItemIndicator>
            <CheckIcon className={cn("w-4 h-4 mx-2")} />
          </RadixSelect.ItemIndicator>
        )}
        <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      </RadixSelect.Item>
    );
  }
);

export default function Select(props: SelectProps) {
  const {
    className,
    options,
    placeholder,
    labelIcon,
    label,
    tabIndex,
    withCheckIcons = true,
    ...rest
  } = props;

  function getValue() {
    return options.find((option) => option.value === rest.value)?.label;
  }

  return (
    <RadixSelect.Root {...rest}>
      <RadixSelect.Trigger
        className={cn(
          "group flex border items-center justify-between border-gray-900 rounded-md py-2 px-3 text-sm text-white bg-black gap-2 outline-none focus:border-white overflow-hidden",
          className
        )}
        aria-label={label}
      >
        <div className="flex  justify-start flex-row items-center gap-[10px]">
          {labelIcon && labelIcon}
          {!getValue() && (
            <span
              className={cn(
                "block justify-start overflow-hidden overflow-ellipsis whitespace-nowrap leading-5 tracking-[0.1px]"
              )}
            >
              {placeholder}
            </span>
          )}
          {getValue() && (
            <RadixSelect.Value
              placeholder={placeholder}
              aria-label={rest.value}
              asChild
            >
              <span
                className={cn(
                  "block justify-start overflow-hidden overflow-ellipsis whitespace-nowrap leading-5 tracking-[0.1px] text-left"
                )}
              >
                {getValue()}
              </span>
            </RadixSelect.Value>
          )}
        </div>
        <RadixSelect.Icon
          className={cn(
            "rotate-180 transform transition-all duration-150 group-data-[state=open]:rotate-0",
            {}
          )}
        >
          <ChevronDownIcon className="h-4 w-4" />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Content
        className="z-20 w-[100%] overflow-hidden bg-gray-950 mt-2 p-2 rounded-md shadow-gray-800 shadow-sm"
        position="popper"
        style={{
          width: "var(--radix-select-trigger-width)",
        }}
        role="listbox"
      >
        <RadixSelect.Viewport>
          <RadixSelect.Group>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                isSelected={option.value === rest.value}
                withCheckIcons={withCheckIcons}
              >
                {option.label}
              </SelectItem>
            ))}
          </RadixSelect.Group>
        </RadixSelect.Viewport>
      </RadixSelect.Content>
    </RadixSelect.Root>
  );
}
