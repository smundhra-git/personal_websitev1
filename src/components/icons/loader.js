import React from 'react';

const IconLogo = () => (
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 200 200" // Increased viewBox size
    xmlSpace="preserve"
    role="img"
  >
    <title>Logo</title>
    <polygon
      fill="none"
      stroke="#00FFCC"
      strokeWidth="6"
      strokeMiterlimit="10"
      points="100,10 180,55 180,145 100,190 20,145 20,55"
    />
    <text
      x="37%"
      y="47%"
      dy=".30em"
      textAnchor="middle"
      fontFamily="Arial, Helvetica, sans-serif"
      fontSize="120" // Increased font size
      fontWeight="bold"
      fill="#00FFCC"
      transform="translate(0, 10) scale(1.4, 1)" // Adjusted transform to fit within the new viewBox
    >
      S
    </text>
  </svg>
);

export default IconLogo;
