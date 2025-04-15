'use client';

import { useRef, useState, ChangeEvent } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Button } from '@radix-ui/themes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faSpinner } from '@fortawesome/free-solid-svg-icons';

interface ImageUploadProps {
  name: string;
  icon: IconDefinition;
  defaultValue?: string;
}

export default function ImageUpload({
  name,
  icon,
  defaultValue = '',
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [url, setUrl] = useState<string>(defaultValue);

  async function uploadFile(ev: ChangeEvent<HTMLInputElement>) {
    const file = ev.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setIsUploading(true);
    try {
      const response = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setUrl(response.data.url);
      setIsImageLoading(true);
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  }

  const isLoading = isUploading || isImageLoading;

  return (
    <>
      <div className='bg-gray-100 rounded-md size-24 inline-flex items-center justify-center'>
        {isLoading && (
          <FontAwesomeIcon
            icon={faSpinner}
            className='text-gray-400 animate-spin'
          />
        )}
        {!isUploading && url && (
          <Image
            src={url}
            alt='Uploaded image'
            width={1024}
            height={1024}
            onLoadingComplete={() => setIsImageLoading(false)}
            className='w-auto h-auto max-w-24 max-h-24'
          />
        )}
        {!isLoading && !url && (
          <FontAwesomeIcon icon={icon} className='text-gray-400' />
        )}
      </div>

      <input type='hidden' value={url} name={name} />
      <div className='mt-2'>
        <input
          type='file'
          accept='image/*'
          onChange={uploadFile}
          ref={fileInputRef}
          className='hidden'
        />
        <Button
          type='button'
          onClick={() => fileInputRef.current?.click()}
          variant='soft'
        >
          Select File
        </Button>
      </div>
    </>
  );
}
