import React from 'react';

const IconLogo = () => (
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 100 100"
    xmlSpace="preserve"
    role="img"
  >
    <title>Logo</title>
    <polygon
      fill="none"
      stroke="#00FFCC"
      strokeWidth="2"
      strokeMiterlimit="10"
      points="50,2 93,25 93,75 50,98 7,75 7,25"
      transform='scale(1.0)'
    />
    
    <text
      x="37%"
      y="47%"
      dy=".40em"
      textAnchor="middle"
      fontFamily="Arial, Helvetica, sans-serif"
      fontSize="50"
      fontWeight = ""
      fill="#00FFCC"
      transform="scale(1.4, 1)" // Increase width of S by 40%
    >
      S
    </text>
  </svg>
);

export default IconLogo;
