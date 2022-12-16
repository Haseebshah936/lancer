import { useEffect, useState } from "react";

const useRem = () => {
    const [rem ,setRem] = useState(10);
    const calculateRem = () => {
      const {innerWidth} = window;
      innerWidth>=2000?setRem(16):innerWidth<=1024?setRem(9):setRem(10)
    }
    useEffect(() => {
      window.addEventListener('resize', calculateRem)
  
      return () => {
        window.removeEventListener('resize', calculateRem)
      }
    }, [])
  
    return rem;
  }

  export default useRem;