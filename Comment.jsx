import React from 'react'

function Comment(props) {
  return (
   
    <div className="bg-white mt-3  rounded-lg p-4 " >
        <div className="flex gap-4 items-center mb-3">
        <div className="h-8 w-8 bg-slate-500 rounded-full"></div>
        <span className='text-xl'>{props.createdBy}</span>
        </div>
        {props.text}

    </div>
  )
}

export default Comment