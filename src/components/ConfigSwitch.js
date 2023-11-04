import React from "react";

export default function ConfigSwitch({ configList, chooseConfig }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "space-evenly",
        justifyContent: "center",
        gap: "2rem",
      }}
    >
      {configList.map((config, index) => (
        <button key={index} onClick={() => chooseConfig(index)}>
          Config {index}
        </button>
      ))}
    </div>
  );
}
