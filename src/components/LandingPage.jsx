import React from "react";
// import { Link } from "react-router-dom";
import "./LandingPage.css";
import Spline from '@splinetool/react-spline';
function LandingPage() {
  return (
    <div className="container">
      <Spline scene="src\components\scene.splinecode" />
    </div>
  );
}

export default LandingPage;

// import Spline from '@splinetool/react-spline';

// export default function App() {
//   return (
//     <Spline scene="https://prod.spline.design/zjfHa1Sv1lzZFfKM/scene.splinecode" />
//   );
// }
