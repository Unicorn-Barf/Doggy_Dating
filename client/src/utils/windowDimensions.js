import { useState, useEffect } from 'react';

function getWindowDimensions() {
   const { innerWidth: width, innerHeight: height } = window;
   return {
      width,
      height
   }
}

export default function useWindowDimension() {
   const [windowDimensions, setWindowDimenison] = useState(getWindowDimensions());
   useEffect(() => {
      function handleResize() {
         setWindowDimenison(getWindowDimensions());
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
   }, []);

   return windowDimensions;
}