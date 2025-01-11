import React from 'react'
import SkeletonAvatar from './CustomeSkeletons.jsx/SkeletonAvatar';
import SkeletonText from './CustomeSkeletons.jsx/SkeletonText';
import SkeletonButton from './CustomeSkeletons.jsx/SkeletonButton';

const SkeletonProfile=()=>{
  return (
     <div className="container mt-5">
           <div className="card shadow-sm p-4">
             <div className="row align-items-center">
               <div className="col-md-6 text-center">
                   <SkeletonAvatar height={'130px'} width={'130px'}/>
               </div>
               <div className="col-md-6">
                 <SkeletonText width="50x" height="50px" />  
                 <SkeletonButton  height="50px" width="20px"/>
               </div>
             </div>
           </div>
      </div>
  )
}
export default SkeletonProfile ;
