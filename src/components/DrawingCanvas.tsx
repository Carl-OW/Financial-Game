import React, { useRef, useState, MouseEvent } from "react";

interface Position {
  x: number;
  y: number;
}

const DrawingCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [drawnPositions, setDrawnPositions] = useState<Position[]>([]);
  const [matrixOutput, setMatrixOutput] = useState<string>("");

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
    if (!isDrawing.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);

    // Store the drawn position
    setDrawnPositions((prevPositions) => [...prevPositions, { x, y }]);
  };

  // Convert drawn positions to matrix
  const convertToMatrix = () => {
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

    // Set the matrix as a string output
    setMatrixOutput(JSON.stringify(matrix, null, 2));
    console.log(matrix);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Draw on the Canvas</h1>
      <canvas
        ref={canvasRef}
        width="400"
        height="400"
        style={{ border: "1px solid black", cursor: "crosshair" }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
      />
      <button
        style={{ marginTop: "10px", padding: "10px 20px", fontSize: "16px" }}
        onClick={convertToMatrix}
      >
        Convert to Matrix
      </button>
      <pre style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
        {matrixOutput}
      </pre>
    </div>
  );
};

export default DrawingCanvas;
