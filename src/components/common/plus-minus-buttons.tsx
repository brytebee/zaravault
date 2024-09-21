"use client";

import Button from "@/components/common/button";
import { useState, useEffect } from "react";

interface PlusProps {
  min: number;
  max: number;
  value: number;
  onChange: (newQuantity: number) => void; // Prop for handling changes
  disabled?: boolean; // Optional disabled prop
}

export default function PlusMinusButton({
  min,
  max,
  value,
  onChange,
  disabled = false, // Default to false if not provided
}: PlusProps) {
  const [showValue, setValue] = useState(value);

  useEffect(() => {
    setValue(value); // Sync with the parent value
  }, [value]);

  const handlePlus = () => {
    if (showValue < max) {
      const newValue = showValue + 1;
      setValue(newValue);
      onChange(newValue); // Notify parent component
    }
  };

  const handleMinus = () => {
    if (showValue > min) {
      const newValue = showValue - 1;
      setValue(newValue);
      onChange(newValue); // Notify parent component
    }
  };

  return (
    <div className="flex items-center">
      <Button
        handleClick={handleMinus}
        text="-"
        className="bg-[#a0a] px-[11px] py-[4px] text-white rounded-[7px] hover:bg-[#888] transition duration-200"
        aria-label={`Decrease quantity by 1 (current: ${showValue})`}
        disabled={disabled || showValue <= min} // Disable if at minimum or if overall disabled
      />
      <span className="mx-2 text-lg font-semibold">{showValue}</span>
      <Button
        handleClick={handlePlus}
        text="+"
        className="bg-[#a0a] px-[10px] py-[4px] text-white rounded-[7px] hover:bg-[#888] transition duration-200"
        aria-label={`Increase quantity by 1 (current: ${showValue})`}
        disabled={disabled || showValue >= max} // Disable if at maximum or if overall disabled
      />
    </div>
  );
}
