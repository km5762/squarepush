import React, { useEffect, useRef } from "react";

export default function GameCanvas({ gameBoard, width, height }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    // Set actual size in memory (scaled to account for extra pixel density).
    const scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
    canvas.width = Math.floor(width * scale);
    canvas.height = Math.floor(width * scale);

    // Normalize coordinate system to use CSS pixels.
    context.scale(scale, scale);
  }, [width]);

  useEffect(() => {
    const rows = gameBoard?.rows;
    const cols = gameBoard?.cols;
    const context = canvasRef.current?.getContext("2d");
    const rowWidth = height / rows;
    const colWidth = width / cols;
    const colorTiles = gameBoard?.colorTiles;
    const ninjaSe = gameBoard?.ninjaSe;

    if (gameBoard) {
      refreshDisplay();
    }

    function refreshDisplay() {
      clearCanvas();
      drawTiles();
      drawGrid();
      drawNinjaSe();
    }

    function clearCanvas() {
      context.clearRect(0, 0, width, height);
      context.beginPath();
    }

    function drawGrid() {
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
      context.lineWidth = 3;
      context.stroke();
    }

    function drawTiles() {
      colorTiles.forEach((tile) => {
        context.strokeStyle = tile.color;
        context.fillStyle = tile.color;
        context.fillRect(
          tile.col * colWidth,
          tile.row * rowWidth,
          rowWidth,
          colWidth
        );
      });
    }

    function drawNinjaSe() {
      context.strokeStyle = "#22b14c";
      context.fillStyle = "#22b14c";
      context.fillRect(
        ninjaSe.anchorCol * colWidth + 1,
        ninjaSe.anchorRow * rowWidth + 1,
        rowWidth * 2 - 1,
        colWidth * 2 - 1
      );
    }
  }, [gameBoard, height, width]);

  return (
    <canvas
      style={{ border: "3px solid black" }}
      ref={canvasRef}
      width={`${width}px`}
      height={`${height}px`}
    ></canvas>
  );
}
