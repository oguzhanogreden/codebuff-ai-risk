import React from "react";

interface ColumnHeadersProps {
  labels: string[];
}

export const ColumnHeaders: React.FC<ColumnHeadersProps> = ({ labels }) => {
  return (
    <div className="column-headers">
      {labels.map((label, index) => (
        <div key={index} className="column-header">
          {label}
        </div>
      ))}
    </div>
  );
};
