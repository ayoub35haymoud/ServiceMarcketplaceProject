import React from 'react'
import Skeleton from '@mui/material/Skeleton';
 const SkeletonText=(width , height)=>{
  return (
    <Skeleton
       variant='text'
       width={width}
       height={height}
       animation="wave"
       style={{ marginBottom: "10px" }}
    />
  )
}
export default SkeletonText;
