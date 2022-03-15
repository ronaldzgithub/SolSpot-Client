import * as React from "react"

const CircleGradient = (props) => (
   <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 150 150"
      {...props}
   >
      <defs>
         <style>{".cls-1{fill:url(#linear-gradient);}"}</style>
         <linearGradient
            id="linear-gradient"
            x1={0.96}
            y1={75}
            x2={149.04}
            y2={75}
            gradientUnits="userSpaceOnUse"
         >
            <stop offset={0} stopColor="#cee2ff" />
            <stop offset={1} stopColor="#f9d8ff" />
         </linearGradient>
      </defs>
      <circle className="cls-1" cx={75} cy={75} r={74.04} />
   </svg>
)

export default CircleGradient;
