import React from 'react'
import Skeleton  from '@mui/material/Skeleton';
const SkeletonButton=(width , height)=>{
  return (
    <Skeleton
        variant="rectangular"
        width={width }
        height={height }
        animation="wave"
        style={{ marginTop: "20px" }}
    />
  )
}
export default SkeletonButton ;