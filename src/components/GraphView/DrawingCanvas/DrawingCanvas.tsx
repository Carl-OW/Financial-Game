import React, { useRef, useState, MouseEvent } from "react";

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

  // Start drawing when mouse is pressed
  const startDrawing = (e: MouseEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    draw(e);
  };

  // Stop drawing when mouse is released or moved out of canvas
  const stopDrawing = () => {
    isDrawing.current = false;
    const ctx = canvasRef.current?.getContext("2d");
    ctx?.beginPath();
  };

  // Draw on the canvas
  const draw = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!drawingMode) {
      return;
    }
    if (!isDrawing.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = 2;
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
        width="400"
        height={graphHeight}
        style={{
          border: "4px dashed black",
          cursor: drawingMode ? "crosshair" : "",
          background: background ? "white" : "none",
          position: "absolute",
          top: "0",
          right: "0",
        }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
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
