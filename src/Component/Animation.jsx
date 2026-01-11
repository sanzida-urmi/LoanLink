// import { useEffect, useLayoutEffect, useRef } from "react";
// import { gsap } from "gsap";

import {useLayoutEffect,useRef} from "react";
import { gsap } from "gsap";

export default function Animation (){
  const lettersRef = useRef([]);
  const text = "Your Smart Loan Management Companion";

  useLayoutEffect(()=>{
    let ctx = gsap.context(()=>{
      gsap.from(lettersRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  },[]);

  return (
    <h1 className="text-4xl font-bold text-center mt-5 overflow-hidden">
      {text.split("").map((letter, i) => (
        <span
        key={i}
        ref={(el) => (lettersRef.current[i] = el)}
        className="inline-block"
        >
          {letter}
        </span>
      ))}
    </h1>
  );


}

// export default function SplitTextAnimation() {
//   const lettersRef = useRef([]);

//   const text = "Your Smart Loan Management Companion";

//   useLayoutEffect(() => {
//     let ctx = gsap.context(() => {
//       gsap.from(lettersRef.current, {
//         opacity: 0,
//         y: 30,
//         duration: 0.8,
//         stagger: 0.05,
//         ease: "power3.out",
//       });
//     });

//     return () => ctx.revert(); 
//   }, []);

//   return (
//     <h1 className="text-4xl font-bold text-center mt-20 overflow-hidden">
//       {text.split("").map((letter, i) => (
//         <span
//           key={i}
//           ref={(el) => (lettersRef.current[i] = el)}
//           className="inline-block"
//         >
//           {letter}
//         </span>
//       ))}
//     </h1>
//   );
// }
