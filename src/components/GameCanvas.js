import React, { useEffect, useRef } from "react";

export default function GameCanvas({ gameBoard, width, height }) {
  const canvasRef = useRef(null);
  const context = canvasRef.current?.getContext("2d");

  useEffect(() => {
    if (gameBoard) {
      refreshDisplay();
    }
  }, [gameBoard]);

  function refreshDisplay() {
    clearCanvas();
    drawGrid(gameBoard.rows, gameBoard.cols);
  }

  function clearCanvas() {
    context.clearRect(0, 0, width, height);
    context.beginPath();
  }

  function drawGrid(rows, cols) {
    const rowWidth = height / rows;
    const colWidth = width / cols;

    /// draw rows
    for (let i = 1; i < rows; i++) {
      context.moveTo(0, i * rowWidth);
      context.lineTo(width, i * rowWidth);
    }

    /// draw cols
    for (let i = 1; i < cols; i++) {
      context.moveTo(i * colWidth, 0);
      context.lineTo(i * colWidth, height);
    }

    context.strokeStyle = "black";
    context.stroke();
  }

  return (
    <canvas
      style={{ border: "1px solid black" }}
      ref={canvasRef}
      width={`${width}px`}
      height={`${height}px`}
    ></canvas>
  );
}