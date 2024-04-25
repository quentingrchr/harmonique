import { forwardRef } from "react";

const ClearButton = forwardRef<
  HTMLButtonElement,
  {
    disabled: boolean;
    onClick: () => void;
  }
>(({ disabled, onClick }, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className="text-white text-xs hover:cursor-pointer disabled:cursor-not-allowed underline disabled:opacity-50"
      onClick={onClick}
    >
      Clear
    </button>
  );
});

export default ClearButton;
