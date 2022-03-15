import * as React from "react"

const RightSemiCircleSVG = (props) => (
   <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 200 300"
      {...props}
   >
      <defs>
         <style>{".cls-1{fill:url(#linear-gradient);}"}</style>
         <linearGradient
            id="linear-gradient"
            x1={231.85}
            y1={22.67}
            x2={97.39}
            y2={255.56}
            gradientUnits="userSpaceOnUse"
         >
            <stop offset={0} stopColor="#cee2ff" />
            <stop offset={1} stopColor="#f9d8ff" />
         </linearGradient>
      </defs>
      <path
         className="cls-1"
         d="M152.15,88.08A90.8,90.8,0,0,1,200,73.61V4.28a144.51,144.51,0,0,0,0,289V256.37A91.4,91.4,0,0,1,152.15,88.08Z"
      />
   </svg>
)

export default RightSemiCircleSVG;
