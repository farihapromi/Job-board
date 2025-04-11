import React from 'react'
import JobRow from './JobRow'

const Jobs = () => {
  return (
    <div className='max-w-4xl mx-auto bg-gray-300 p-6 rounded-3xl'>
      <div className="container">
      <h2 className='text-xl font-semibold mb-4'>Recent Jobs</h2>
      <div className="flex flex-col gap-4">
        <JobRow/>
        <JobRow/>
         <JobRow/>
         <JobRow/>
       </div>
      </div>
     </div>
  )
}

export default Jobs
