import DrawingCanvas from "./DrawingCanvas/DrawingCanvas";
import Graph from "./Graph/Graph";

import styles from "./graphview.module.scss";
import React from "react";
import { fetchData, ParsedData, shuffleArray } from "./GraphService";
import { graphEntries } from "./db/db";

export const GraphView = () => {
  const [graphHeight, setGraphHeight] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [referenceGraph, setReferenceGraph] = React.useState<number[][] | null>(
    null
  );

  const [data, setData] = React.useState<null | ParsedData>(null);
  const heightChange = (val: number) => {
    setGraphHeight(val);
  };

  const onFinished = (matrix: number[][]) => {
    if (referenceGraph) {
      setScore(calculateMatrixLikeness(matrix, referenceGraph));
    }
  };

  const shuffled = shuffleArray(graphEntries);

  React.useEffect(() => {
    const fetch = async () => {
      const t = await fetchData(shuffled[0].savedQuery);
      setData(t);
    };
    fetch();
  }, []);

  function calculateMatrixLikeness(
    matrix1: number[][],
    matrix2: number[][]
  ): number {
    const width = 400;
    const height = 400;

    let totalLikeness = 0;

    for (let x = 0; x < width; x++) {
      const yPositions1: Set<number> = new Set();
      const yPositions2: Set<number> = new Set();

      let hasPixel1 = false;
      let hasPixel2 = false;

      // Check if the column exists in both matrices
      const column1 = matrix1[x] || [];
      const column2 = matrix2[x] || [];

      // Collect y positions in matrix1 at x
      for (let y = 0; y < height; y++) {
        if (column1[y] === 1) {
          yPositions1.add(y);
          hasPixel1 = true;
        }
      }
      if (!hasPixel1) {
        yPositions1.add(0); // Assume pixel at y=0 if no pixel at this x in matrix1
      }

      // Collect y positions in matrix2 at x
      for (let y = 0; y < height; y++) {
        if (column2[y] === 1) {
          yPositions2.add(y);
          hasPixel2 = true;
        }
      }
      if (!hasPixel2) {
        yPositions2.add(0); // Assume pixel at y=0 if no pixel at this x in matrix2
      }

      // Calculate intersection and union
      const intersection = new Set<number>();
      for (let y of yPositions1) {
        if (yPositions2.has(y)) {
          intersection.add(y);
        }
      }

      const union = new Set<number>([...yPositions1, ...yPositions2]);

      const likeness = intersection.size / union.size;

      totalLikeness += likeness;
    }

    // Average percentage likeness over all x positions
    const averageLikeness = (totalLikeness / width) * 100; // Multiply by 100 to get percentage

    const premultiplicator = 100 - averageLikeness;

    if (premultiplicator > 30) {
      return premultiplicator * 1.3;
    }

    return (100 - averageLikeness) * 4;
  }

  return (
    data && (
      <>
        {/* <h1>Score: {score}</h1> */}
        <h2>{shuffled[0].question}</h2>
        <p>{shuffled[0].indicator}</p>
        <div className={styles.graphArea}>
          <div className={styles.graph}>
            <Graph
              onRendered={setReferenceGraph}
              heightChange={heightChange}
              data={data.data}
            />
          </div>
          <div className={styles.drawArea}>
            <DrawingCanvas onFinished={onFinished} graphHeight={graphHeight} />
          </div>
        </div>
      </>
    )
  );
};
