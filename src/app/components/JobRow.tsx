'use client';
import React from 'react';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { Jobs } from '@/models/Job';
import { Job } from '@/models/Job';
import TimeAgo from './TimeAgo';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { WorkOS } from '@workos-inc/node';
import Link from 'next/link';
import axios from 'axios';

const JobRow = ({ jobDoc }: { jobDoc: Jobs }) => {
  return (
    <div className='bg-white p-4 rounded-lg shadow-md relative'>
      <div className='absolute top-2 right-4  hover:text-red-500 cursor-pointer'>
        <FontAwesomeIcon className='size-6 text-gray-400' icon={faHeart} />
      </div>

      <div className='flex grow gap-4'>
        <div className='content-center w-12 basis-12 shrink-0'>
          <img className='size-12' src={jobDoc?.jobIcon} alt='' />
        </div>
        <div className='grow sm:flex'>
          <div className='grow '>
            <div className='text-gray-500 text-sm'>{jobDoc.orgName}</div>
            <div className='font-bold mb-2 text-lg '>{jobDoc.title}</div>
            <div className='text-gray-600 text-sm capitalize'>
              {jobDoc.remote} - {jobDoc.city}, {jobDoc.country} - {jobDoc.type}
              -time
              {jobDoc.isAdmin && (
                <>
                  {' '}
                  &middot; <Link href={'/jobs/edit/' + jobDoc._id}>
                    Edit
                  </Link>{' '}
                  &middot;{' '}
                  <button
                    type='button'
                    onClick={async () => {
                      await axios.delete('/api/jobs?id=' + jobDoc._id);
                      window.location.reload();
                    }}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
          {jobDoc.createdAt && (
            <div className='content-end text-gray-500 text-sm'>
              <TimeAgo createdAt={jobDoc.createdAt} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobRow;
