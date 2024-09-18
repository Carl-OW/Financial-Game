import DrawingCanvas from "./DrawingCanvas/DrawingCanvas";
import Graph from "./Graph/Graph";

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
      <h2>{data.title}</h2>
      <p>{data.description}</p>
      <div className={styles.graphArea}>
        <div className={styles.graph}>
          <Graph heightChange={heightChange} data={data.data} />
        </div>
        <div className={styles.drawArea}>
          <DrawingCanvas graphHeight={graphHeight} />
        </div>
      </div>
    </>
  );
};
