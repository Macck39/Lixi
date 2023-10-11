import React, { useState } from "react";
import Lottie from "lottie-react";
import animationData from "../animation/button.json"; // Replace with your animation JSON file

const styles = {
  container: {
    position: "fixed",
    bottom: 5,
    left: 5,
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  lottieContainer: {
    position: "relative",
  },
  lottie: {
    width: "90px", // Adjust the Lottie container width
    height: "90px",
    // transition: "width 0.1s, height 0.2s", // Add transition for smooth size change
  },
  callingIcon: {
    position: "absolute",
    bottom: "35%",
    left: "35%",
    transform: "translate(-50%, -50%)", // Center the calling icon
    animation: "iconVibrate 0.2s infinite",
    width: "28px", // Adjust the calling icon width
    height: "28px",
  },
};

export default function CallingButton() {
  const [isHovered, setHovered] = useState(false);

  return (
    <div
      style={styles.container}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => window.open('tel:8618888210')}
    >
      <div style={styles.lottieContainer}>
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          style={{
            ...styles.lottie,
            width: isHovered ? "100px" : "90px", // Adjust the Lottie size
            height: isHovered ? "100px" : "90px", // Adjust the Lottie size
          }}
        />
        <span role="img" aria-label="Phone Icon" style={styles.callingIcon}>
          <img
            src="/images/call.png" // Adjust the path to your PNG file
            alt="Phone Icon"
            width="100%"
            height="100%"
          />
        </span>
      </div>
    </div>
  );
}
