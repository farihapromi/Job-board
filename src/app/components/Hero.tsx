import React from 'react'

const   Hero = async() => {
     
  return (
    <div>
        <section className='py-12'>
            <h1 className="text-4xl font-bold text-center">Find your next <br />Dream Job</h1>
       
<form action="" className='flex gap-2 mt-4 max-w-xl mx-auto'>
   <input type="search" 
   className='border  border-gray-400 w-full py-2 px-3 rounded-md '
   placeholder='Search phrase...'
   />
   <button className='bg-blue-600 text-white px-4 py-2 rounded-md'>Search</button>
</form>
            
        </section>
      
    </div>
  )
}

export default Hero
