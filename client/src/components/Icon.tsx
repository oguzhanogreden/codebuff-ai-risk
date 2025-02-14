import React from "react";

interface IconProps {
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ className }) => {
  return <span className={`icon ${className || ''}`}>⬢</span>;
};
