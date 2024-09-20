"use client";

import Button from "@/components/common/button";
import { useState } from "react";

interface PlusProps {
  min: number;
  max: number;
  value: number;
  onChange: (newQuantity: number) => void; // Prop for handling changes
}

export default function PlusMinusButton({
  min,
  max,
  value,
  onChange,
}: PlusProps) {
  const [showValue, setValue] = useState(value);

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
        className="bg-[#a0a] px-[12px] py-[3px] text-white rounded-full hover:bg-[#888] transition duration-200"
        aria-label={`Decrease quantity by 1 (current: ${showValue})`}
      />
      <span className="mx-2 text-lg font-semibold">{showValue}</span>
      <Button
        handleClick={handlePlus}
        text="+"
        className="bg-[#a0a] px-[10px] py-[3px] text-white rounded-full hover:bg-[#888] transition duration-200"
        aria-label={`Increase quantity by 1 (current: ${showValue})`}
      />
    </div>
  );
}
