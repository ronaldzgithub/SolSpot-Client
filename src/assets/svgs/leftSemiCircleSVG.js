import * as React from "react"

const LeftSemiCircleSVG = (props) => (
   <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 200 300"
      {...props}
   >
      <defs>
         <style>{".cls-g1{fill:url(#linear-gradient);}"}</style>
         <linearGradient
            id="linear-gradient"
            x1={118.31}
            y1={240.1}
            x2={-56.9}
            y2={64.89}
            gradientUnits="userSpaceOnUse"
         >
            <stop offset={0} stopColor="#cee2ff" />
            <stop offset={1} stopColor="#f9d8ff" />
         </linearGradient>
      </defs>
      <path
         className="cls-g1"
         d="M146.05,152.49A144.52,144.52,0,0,1,1.54,297H0V260.08c.51,0,1,0,1.54,0a91.4,91.4,0,0,0,0-182.8c-.51,0-1,0-1.54,0V8H1.54A144.51,144.51,0,0,1,146.05,152.49Z"
      />
   </svg>
)

export default LeftSemiCircleSVG;
