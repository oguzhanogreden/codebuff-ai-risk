import React from "react";

interface RowHeadersProps {
  labels: string[];
}

export const RowHeaders: React.FC<RowHeadersProps> = ({ labels }) => {
  return (
    <div className="row-headers">
      {labels.map((label, index) => (
        <div key={index} className="row-header">
          {label}
        </div>
      ))}
    </div>
  );
};
