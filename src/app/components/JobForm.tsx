'use client';

import { saveJobAction } from './actions/JobAction';
import ImageUpload from './ImageUpload';

import type { Jobs } from '@/models/Job';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  RadioGroup,
  TextArea,
  TextField,
  Theme,
} from '@radix-ui/themes';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import 'react-country-state-city/dist/react-country-state-city.css';
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from 'react-country-state-city';

import {
  faEnvelope,
  faPhone,
  faStar,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

export default function JobForm({
  orgId,
  jobDoc,
}: {
  orgId: string;
  jobDoc?: Jobs;
}) {
  const [countryId, setCountryId] = useState(Number(jobDoc?.countryId) || 0);
  const [stateId, setStateId] = useState(Number(jobDoc?.stateId) || 0);
  const [cityId, setCityId] = useState(Number(jobDoc?.cityId) || 0);
  const [countryName, setCountryName] = useState(jobDoc?.country || '');
  const [stateName, setStateName] = useState(jobDoc?.state || '');
  const [cityName, setCityName] = useState(jobDoc?.city || '');

  async function handleSaveJob(data: FormData) {
    data.set('country', countryName.toString());
    data.set('state', stateName.toString());
    data.set('city', cityName.toString());
    data.set('countryId', countryId.toString());
    data.set('stateId', stateId.toString());
    data.set('cityId', cityId.toString());
    data.set('orgId', orgId);

    const jobDoc = await saveJobAction(data);
    redirect(`/jobs/${jobDoc.orgId}`);
  }

  return (
    <Theme>
      <form
        action={handleSaveJob}
        className='max-w-3xl mx-auto shadow-md rounded-xl p-8 space-y-6 mt-8'
      >
        {jobDoc && <input type='hidden' name='id' value={jobDoc?._id} />}

        {/* Job Details */}
        <div className='space-y-2'>
          <h2 className='text-xl font-semibold text-gray-800 border-b pb-2'>
            Job Details
          </h2>
          <label className='text-sm font-medium text-gray-700'>Job Title</label>
          <TextField.Root
            name='title'
            placeholder='e.g. Frontend Developer'
            defaultValue={jobDoc?.title || ''}
          />
        </div>

        {/* Work Mode & Type */}
        <div className='grid sm:grid-cols-3 gap-6'>
          <div>
            <label className='text-sm font-medium text-gray-700'>Remote?</label>
            <RadioGroup.Root
              defaultValue={jobDoc?.remote || 'hybrid'}
              name='remote'
              className='flex flex-col gap-1 mt-1'
            >
              <RadioGroup.Item value='onsite'>On-site</RadioGroup.Item>
              <RadioGroup.Item value='hybrid'>Hybrid</RadioGroup.Item>
              <RadioGroup.Item value='remote'>Remote</RadioGroup.Item>
            </RadioGroup.Root>
          </div>

          <div>
            <label className='text-sm font-medium text-gray-700'>
              Job Type
            </label>
            <RadioGroup.Root
              defaultValue={jobDoc?.type || 'full'}
              name='type'
              className='flex flex-col gap-1 mt-1'
            >
              <RadioGroup.Item value='project'>Project</RadioGroup.Item>
              <RadioGroup.Item value='part'>Part-time</RadioGroup.Item>
              <RadioGroup.Item value='full'>Full-time</RadioGroup.Item>
            </RadioGroup.Root>
          </div>

          <div>
            <label className='text-sm font-medium text-gray-700'>Salary</label>
            <TextField.Root name='salary' defaultValue={jobDoc?.salary || ''}>
              <TextField.Slot>$</TextField.Slot>
              <TextField.Slot>k/year</TextField.Slot>
            </TextField.Root>
          </div>
        </div>

        {/* Location */}
        <div className='space-y-2'>
          <h2 className='text-xl font-semibold text-gray-800 border-b pb-2'>
            Location
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            <div>
              <label className='text-sm font-medium text-gray-700'>
                Country
              </label>
              <CountrySelect
                value={countryId || undefined}
                onChange={(e) => {
                  const { id, name } = e as { id: number; name: string };
                  setCountryId(id);
                  setCountryName(name);
                }}
                placeHolder='Select Country'
              />
            </div>
            <div>
              <label className='text-sm font-medium text-gray-700'>State</label>
              <StateSelect
                value={stateId || undefined}
                countryid={Number(countryId)}
                onChange={(e) => {
                  const { id, name } = e as { id: number; name: string };
                  setStateId(id);
                  setStateName(name);
                }}
                placeHolder='Select State'
              />
            </div>
            <div>
              <label className='text-sm font-medium text-gray-700'>City</label>
              <CitySelect
                value={cityId || undefined}
                countryid={Number(countryId)}
                stateid={Number(stateId)}
                onChange={(e) => {
                  const { id, name } = e as { id: number; name: string };
                  setCityId(id);
                  setCityName(name);
                }}
                placeHolder='Select City'
              />
            </div>
          </div>
        </div>

        {/* Job Icon & Contact Info */}
        <div className='space-y-2'>
          <h2 className='text-xl font-semibold text-gray-800 border-b pb-2'>
            Job Icon & Contact Info
          </h2>
          <div className='sm:flex gap-6'>
            <div className='w-full sm:w-1/3 grow'>
              <label className='text-sm font-medium text-gray-700 p-2'>
                Job Icon
              </label>
              <ImageUpload
                name='jobIcon'
                icon={faStar}
                defaultValue={jobDoc?.jobIcon || ''}
              />
            </div>
            <div className='grow'>
              <label className='text-sm font-medium text-gray-700'>
                Contact Person
              </label>
              <div className='flex gap-4 mt-2'>
                <ImageUpload
                  name='contactPhoto'
                  icon={faUser}
                  defaultValue={jobDoc?.contactPhoto || ''}
                />
                <div className='grow flex flex-col gap-2'>
                  <TextField.Root
                    placeholder='John Doe'
                    name='contactName'
                    defaultValue={jobDoc?.contactName || ''}
                  >
                    <TextField.Slot>
                      <FontAwesomeIcon icon={faUser} />
                    </TextField.Slot>
                  </TextField.Root>
                  <TextField.Root
                    placeholder='Phone'
                    type='tel'
                    name='contactPhone'
                    defaultValue={jobDoc?.contactPhone || ''}
                  >
                    <TextField.Slot>
                      <FontAwesomeIcon icon={faPhone} />
                    </TextField.Slot>
                  </TextField.Root>
                  <TextField.Root
                    placeholder='Email'
                    type='email'
                    name='contactEmail'
                    defaultValue={jobDoc?.contactEmail || ''}
                  >
                    <TextField.Slot>
                      <FontAwesomeIcon icon={faEnvelope} />
                    </TextField.Slot>
                  </TextField.Root>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className='space-y-2'>
          <h2 className='text-xl font-semibold text-gray-800 border-b pb-2'>
            Job Description
          </h2>
          <TextArea
            defaultValue={jobDoc?.description || ''}
            placeholder='Write a clear job description including responsibilities, skills, and expectations...'
            resize='vertical'
            name='description'
            className='min-h-[120px]'
          />
        </div>

        {/* Submit */}
        <div className='pt-4'>
          <Button
            size='3'
            className='w-full bg-blue-600 hover:bg-blue-700 text-white'
          >
            <span className='px-8'>Save Job</span>
          </Button>
        </div>
      </form>
    </Theme>
  );
}
