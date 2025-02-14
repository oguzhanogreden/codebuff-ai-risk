import React from "react";
import { ScoringGrid } from "./ScoringGrid.tsx";
import { ColumnHeaders } from "./ColumnHeaders.tsx";
import { RowHeaders } from "./RowHeaders.tsx";

interface GridContainerProps {
  rows: number;
  cols: number;
}

export const GridContainer: React.FC<GridContainerProps> = ({ rows, cols }) => {
  const colLabels = [
    "", // Aligning withd extra low labels
    "Extraordinarily positive",
    "Substantially Good",
    "Ambiguous",
    "Substantially bad",
    "Catastrophic or Existential"
  ];

  const rowLabelsOuter = [
    10, 9, 8, 7, 6
  ];

  const rowLabelsInner = [
    "Holocene",
    "Industrial revolution",
    "Electricity",
    "Social media",
    "Microwave"
  ];

  return (
    <div className="grid-container">
      <div className="grid-container-header">
        <div className="corner"></div>
        <ColumnHeaders labels={colLabels} />
      </div>
      <div className="grid-container-body">
        <RowHeaders labels={rowLabelsOuter} />
        <RowHeaders labels={rowLabelsInner} />
        <ScoringGrid rows={rows} cols={cols} />
      </div>
    </div>
  );
};
