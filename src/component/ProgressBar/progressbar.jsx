import { useEffect, useState } from "react";

export const ProgressBar = ({progress, imageArray}) => {
    let items = Math.floor(100/ imageArray.length);
    
  const containerStyles = {
    height: 10,
    width:`${items}%`,
    backgroundColor: "grey",
    overflow: "hidden",
    border: "2px solid",
    borderLeft: "1px solid",
    borderRight: "1px solid",
    marginBottom: "6px"
  };

  const fillerStyles = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: "white",
    textAlign: "right"
  };



  return (
    <div className="progress-bar" style={containerStyles}>
      <div style={fillerStyles}>
      </div>
    </div>
  );
};
