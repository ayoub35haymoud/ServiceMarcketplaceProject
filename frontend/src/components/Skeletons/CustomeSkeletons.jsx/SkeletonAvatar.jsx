import React from 'react'
import Skeleton from '@mui/material/Skeleton';
const SkeletonAvatar=({ height, width })=>{
  return (
    <Skeleton
        variant="circular"
        width={width}
        height={height}
        animation="wave"
        style={{ margin: "0 auto"}}
    />
  )
}
export default SkeletonAvatar;
