/* eslint-disable react/prop-types */

/* eslint-disable no-unused-vars */

import React , {useEffect , useState} from 'react';
import Prospin from '../assets/spin.gif'



const Spinner = ({duration}) => {
  
  

  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(true);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);



  return (
    <div>
       {showSpinner ? (
      <img src={Prospin} />
     ) : ("")}
    </div>
  );
}

export default Spinner;
