import React from 'react';
import JobRow from './JobRow';
import type { Jobs } from '@/models/Job';

export default function Jobs({
  header,
  jobs,
}: {
  header: string;
  jobs: Jobs[];
}) {
  return (
    <div className='bg-slate-200 py-6 rounded-3xl'>
      <div className='container'>
        <h2 className='font-bold m-4'>{header || 'Recent jobs'}</h2>

        <div className='flex flex-col gap-4 m-6'>
          {!jobs?.length && <div>No jobs found</div>}
          {jobs && jobs.map((job) => <JobRow jobDoc={job} />)}
        </div>
      </div>
    </div>
  );
}
