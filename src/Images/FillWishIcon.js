import React from "react";

function FillWishIcon(props) {
  return (
    <svg
      width="12"
      height="16"
      viewBox="0 0 12 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.2857 0H1.71429C0.771429 0 0.00857162 0.8 0.00857162 1.77778L0 16L6 13.3333L12 16V1.77778C12 0.8 11.2286 0 10.2857 0Z"
        fill={props.color}
      />
    </svg>
  );
}

export default FillWishIcon;
