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
        className='container mt-6 flex flex-col gap-4'
      >
        {jobDoc && <input type='hidden' name='id' value={jobDoc?._id} />}

        <TextField.Root
          name='title'
          placeholder='Job title'
          defaultValue={jobDoc?.title || ''}
        />

        <div className='grid sm:grid-cols-3 gap-6 *:grow'>
          <div>
            Remote?
            <RadioGroup.Root
              defaultValue={jobDoc?.remote || 'hybrid'}
              name='remote'
            >
              <RadioGroup.Item value='onsite'>On-site</RadioGroup.Item>
              <RadioGroup.Item value='hybrid'>Hybrid-remote</RadioGroup.Item>
              <RadioGroup.Item value='remote'>Fully remote</RadioGroup.Item>
            </RadioGroup.Root>
          </div>

          <div>
            Full time?
            <RadioGroup.Root defaultValue={jobDoc?.type || 'full'} name='type'>
              <RadioGroup.Item value='project'>Project</RadioGroup.Item>
              <RadioGroup.Item value='part'>Part-time</RadioGroup.Item>
              <RadioGroup.Item value='full'>Full-time</RadioGroup.Item>
            </RadioGroup.Root>
          </div>

          <div>
            Salary
            <TextField.Root name='salary' defaultValue={jobDoc?.salary || ''}>
              <TextField.Slot>$</TextField.Slot>
              <TextField.Slot>k/year</TextField.Slot>
            </TextField.Root>
          </div>
        </div>

        <div>
          Location
          <div className='flex flex-col sm:flex-row gap-4 *:grow'>
            <CountrySelect
              value={countryId || undefined}
              onChange={(e) => {
                const { id, name } = e as { id: number; name: string };
                setCountryId(id);
                setCountryName(name);
              }}
              placeHolder='Select Country'
            />

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

        <div className='sm:flex'>
          <div className='w-1/3'>
            <h3>Job icon</h3>
            <ImageUpload
              name='jobIcon'
              icon={faStar}
              defaultValue={jobDoc?.jobIcon || ''}
            />
          </div>
          <div className='grow'>
            <h3>Contact person</h3>
            <div className='flex gap-2'>
              <div className=''>
                <ImageUpload
                  name='contactPhoto'
                  icon={faUser}
                  defaultValue={jobDoc?.contactPhoto || ''}
                />
              </div>
              <div className='grow flex flex-col gap-1'>
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

        <TextArea
          defaultValue={jobDoc?.description || ''}
          placeholder='Job description'
          resize='vertical'
          name='description'
        />

        <div className='flex justify-center'>
          <Button size='3'>
            <span className='px-8'>Save</span>
          </Button>
        </div>
      </form>
    </Theme>
  );
}
