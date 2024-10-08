import React, { useRef, useState, MouseEvent, TouchEvent } from "react";
import styles from "./DrawingCanvas.module.scss";

interface Position {
  x: number;
  y: number;
}
interface DrawingCanvasProps {
  graphHeight: number;
  onFinished: (matrix: number[][]) => void;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  graphHeight,
  onFinished,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [drawnPositions, setDrawnPositions] = useState<Position[]>([]);
  const [background, setBackground] = useState<boolean>(true);
  const [drawingMode, setDrawingMode] = useState<boolean>(true);

  const isDrawing = useRef<boolean>(false);

  // Start drawing when mouse or touch is pressed
  const startDrawing = (
    e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>
  ) => {
    if ("touches" in e) {
      e.preventDefault();
    }
    isDrawing.current = true;
    draw(e);
  };

  // Stop drawing when mouse or touch is released or moved out of canvas
  const stopDrawing = (
    e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>
  ) => {
    if (isDrawing.current) {
      isDrawing.current = false;
      const ctx = canvasRef.current?.getContext("2d");
      ctx?.beginPath();
      if ("touches" in e) {
        e.preventDefault();
      }
    }
  };

  // Draw on the canvas
  const draw = (
    e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>
  ) => {
    if (!drawingMode) {
      return;
    }
    if (!isDrawing.current) return;

    if ("touches" in e) {
      e.preventDefault();
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x: number, y: number;

    if ("touches" in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#00824d";

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);

    // Store the drawn position
    setDrawnPositions((prevPositions) => [...prevPositions, { x, y }]);
  };

  // Convert drawn positions to matrix
  const convertToMatrix = () => {
    setBackground(false);
    setDrawingMode(false);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.width;
    const height = canvas.height;

    // Create a matrix of 0s
    const matrix: number[][] = Array.from({ length: height }, () =>
      Array(width).fill(0)
    );

    // Convert drawn positions to 1 in the matrix
    drawnPositions.forEach((pos) => {
      const x = Math.round(pos.x);
      const y = Math.round(pos.y);
      if (x >= 0 && y >= 0 && x < width && y < height) {
        matrix[y][x] = 1;
      }
    });

    onFinished(matrix);
  };

  const cleanCanvas = () => {
    const ctx = canvasRef.current?.getContext("2d");

    if (ctx && canvasRef.current) {
      // Clear the entire canvas
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    } else {
      console.error("Failed to get 2D rendering context");
    }
  };
  return (
    <div style={{ position: "relative", width: "400px" }}>
      <canvas
        ref={canvasRef}
        className={styles.rainbow}
        width="400"
        height={graphHeight}
        style={{
          border: "4px dashed black",
          background: background ? "white" : "none",
          position: "absolute",
          top: "0",
          right: "0",
          touchAction: "none", // Prevents default touch behaviors like scrolling
        }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      {drawingMode && (
        <div style={{ top: 0, left: 0, position: "absolute", display: "flex" }}>
          <button
            style={{
              marginTop: "10px",
              fontSize: "16px",
              border: "1px solid black",
              marginRight: "2px",
              padding: "10px",
              top: 0,
              left: 0,
              display: "block",
            }}
            onClick={convertToMatrix}
          >
            ✅
          </button>
          <button
            style={{
              marginTop: "10px",
              fontSize: "16px",
              padding: "10px",
              border: "1px solid black",
            }}
            onClick={cleanCanvas}
          >
            ❌
          </button>
        </div>
      )}
    </div>
  );
};

export default DrawingCanvas;
