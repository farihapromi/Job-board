import React from 'react'

const JobRow = () => {
  return (
   <>
    <div className="bg-white p-4 rounded-lg shadow-md flex gap-2">
       <div className='content-center'>
        <img 
        className='size-12'
        src='https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green-300x300.png'/>

       </div>
       <div className='grow'>
        <div className='text-gray-500 text-sm'>Spotify</div>
        <div className='font-bold mb-2 text-lg'>Product designer</div>
        <div className='content-end text-gray-600 text-xs'>
            Remote &middot; New York,Us &middot; Fulltime</div>
       </div>
       <div className='content-end text-gray-600 text-sm'>
         2 weeks ago

       </div>

      </div>
   </>
  )
}

export default JobRow
