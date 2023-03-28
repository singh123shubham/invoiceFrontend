import React from 'react'
import { PropagateLoader } from "react-spinners";

const Loder = () => {
  return (
    <div className='loding'>
        <PropagateLoader color={"#357ae8"} loading={true} />
    </div>
  )
}

export default Loder    