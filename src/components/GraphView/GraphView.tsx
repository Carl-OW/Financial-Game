import DrawingCanvas from "./DrawingCanvas/DrawingCanvas";
import Graph from "./Graph/Graph";
import styles from "./graphview.module.scss";
import React from "react";
import { fetchData, ParsedData } from "./GraphService";
import { ClimbingBoxLoader } from "react-spinners";

const themeBackgrounds: { [key: string]: string } = {
  Befolkning: "/footer/footer_theme_befolkning.png",
  Utdanning: "/footer/footer_theme_utdanning.png",
  Arbeid: "/footer/footer_theme_arbeid.png",
  Inntekt: "/footer/footer_theme_inntekt.png",
  Helse: "/footer/footer_theme_helse.png",
  Miljø: "/footer/footer_theme_miljo.png",
  Økonomi: "/footer/footer_theme_okonomi.png",
  Priser: "/footer/footer_theme_priser.png",
};

export const GraphView = ({
  onGraphComplete,
  indicator,
  question,
  url,
  theme,
}: {
  onGraphComplete: (score: number) => void;
  question: string;
  indicator: string;
  url: string;
  theme: string;
}) => {
  const [graphHeight, setGraphHeight] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [showCountdown, setShowCountdown] = React.useState<boolean>(false);
  const [referenceGraph, setReferenceGraph] = React.useState<number[][] | null>(
    null
  );

  const [seconds, setSeconds] = React.useState<number>(3);

  const [data, setData] = React.useState<null | ParsedData>(null);

  const heightChange = (val: number) => {
    setGraphHeight(val);
  };

  const onFinished = (matrix: number[][]) => {
    setShowCountdown(true);
    if (referenceGraph) {
      const calculatedScore = calculateMatrixLikeness(matrix, referenceGraph);
      setScore(calculatedScore);
      setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      setTimeout(() => {
        onGraphComplete(calculatedScore); // Pass the score to the parent component (Game.tsx)
      }, 2950);
    }
  };

  React.useEffect(() => {
    const fetch = async () => {
      const t = await fetchData(url);
      window.setTimeout(() => {
        setData(t);
        setBodyBackground(themeBackgrounds[theme]);
      }, 1000);
    };
    fetch();
  }, []);

  const setBodyBackground = (backgroundImage: string | null) => {
    if (backgroundImage) {
      document.body.style.background = `url(${backgroundImage}) no-repeat center 50px fixed`;
      document.body.style.backgroundSize = "cover";
    } else {
      document.body.style.background = "";
    }
  };

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
    (!data && (
      <div>
        <ClimbingBoxLoader color="#1a9d49" size="50px" />
        <h2>Laster inn graf...</h2>
      </div>
    )) ||
    (data && (
      <div
        style={{
          maxWidth: "1000px",
          margin: "24px",
        }}
      >
        <h2 style={{ color: "#1a9d49" }}>{question}</h2>
        <p>{indicator}</p>
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
          {showCountdown && (
            <div
              style={{
                position: "absolute",
                left: "50px",
                border: "1px solid black",
                padding: "8px",
                margin: "8px",
                lineHeight: "8px",
                backgroundColor: "white",
              }}
            >
              <h3>Neste graf kommer om {seconds} sekunder</h3>
            </div>
          )}
        </div>
      </div>
    ))
  );
};
