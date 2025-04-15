import React from 'react';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { Jobs } from '@/models/Job';
import { Job } from '@/models/Job';
import TimeAgo from './TimeAgo';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { WorkOS } from '@workos-inc/node';

const JobRow = ({ jobDoc }: { jobDoc: Jobs }) => {
  return (
    <div className='bg-white p-4 rounded-lg shadow-md relative'>
      <div className='absolute top-2 right-4  hover:text-red-500 cursor-pointer'>
        <FontAwesomeIcon className='size-6 text-gray-400' icon={faHeart} />
      </div>

      <div className='flex gap-4'>
        <div className='content-center'>
          <img
            className='size-12'
            src='https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green-300x300.png'
            alt='Spotify'
          />
        </div>
        <div className='grow sm:flex'>
          <div className='grow '>
            <div className='text-gray-500 text-sm'>{jobDoc.orgName}</div>
            <div className='font-bold mb-2 text-lg mb-1'>{jobDoc.title}</div>
            <div className='text-gray-600 text-sm capitalize'>
              {jobDoc.remote} - {jobDoc.city}, {jobDoc.country} - {jobDoc.type}
              -time
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
