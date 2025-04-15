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
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@radix-ui/react-alert-dialog';

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
            <div>
              <Link
                href={`/jobs/${jobDoc.orgId}`}
                className='hover:underline text-gray-500 text-sm'
              >
                {jobDoc.orgName || '?'}
              </Link>
            </div>
            <div className='font-bold text-lg mb-1'>
              <Link className='hover:underline' href={'/show/' + jobDoc._id}>
                {jobDoc.title}
              </Link>
            </div>
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
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        type='button'
                        className='text-red-500 hover:underline'
                      >
                        Delete
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className='rounded-lg bg-gray-500 p-4 shadow-xl max-w-xs mx-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'>
                      <AlertDialogTitle className='text-lg font-semibold text-white'>
                        Confirm Deletion
                      </AlertDialogTitle>
                      <AlertDialogDescription className='text-white mt-2'>
                        Are you sure you want to delete this job? This action
                        cannot be undone.
                      </AlertDialogDescription>
                      <div className='mt-4 flex justify-end gap-2'>
                        <AlertDialogCancel className='px-4 py-2 rounded-md border text-black'>
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className='px-4 py-2 bg-red-500 text-white rounded-md'
                          onClick={async () => {
                            await axios.delete('/api/jobs?id=' + jobDoc._id);
                            window.location.reload();
                          }}
                        >
                          Delete
                        </AlertDialogAction>
                      </div>
                    </AlertDialogContent>
                  </AlertDialog>
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
