'use client'
import { useRouter } from "next/navigation";

export const Parent = ({children}) => {
   let rot = useRouter()

   return(
    <div>
       <div className='page-parent' onClick={() => rot.push('/')}>All Blog Post</div>
       <div className='page-Drake'>Create page</div>
      {children}
      </div>
   ) 
  };