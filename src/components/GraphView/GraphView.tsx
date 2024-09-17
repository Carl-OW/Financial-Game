import DrawingCanvas from "./DrawingCanvas/DrawingCanvas";
import PopulationGrowthGraph from "./PopulationGrowthGraph/PopulationGrowthGraph";

import styles from "./graphview.module.scss";
import { data } from "./db/population";
import React from "react";

export const GraphView = () => {
  const [graphHeight, setGraphHeight] = React.useState(0);

  const heightChange = (val: number) => {
    setGraphHeight(val);
  };
  return (
    <>
      <div className={styles.graphArea}>
        <div className={styles.graph}>
          <PopulationGrowthGraph heightChange={heightChange} data={data} />
        </div>
        <div className={styles.drawArea}>
          <DrawingCanvas graphHeight={graphHeight} />
        </div>
      </div>
    </>
  );
};
