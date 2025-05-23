import { createCompany } from '../components/actions/workosAction';
import { withAuth } from '@workos-inc/authkit-nextjs';

export default async function NewCompanyPage() {
  const { user } = await withAuth();
  async function handleNewCompanyFormSubmit(data: FormData) {
    'use server';
    if (user) {
      await createCompany(data.get('newCompanyName') as string, user.id);
    }
  }

  if (!user) {
    return <div className='text-red-500'>Login to use this page</div>;
  }

  return (
    <div className='container'>
      <h2 className='text-2xl mt-6 font-bold text-black  '>
        Create a new company
      </h2>
      <p className='text-gray-500 text-sm mb-2'>
        To create a job listing your first need to register a company
      </p>
      <form action={handleNewCompanyFormSubmit} className='flex gap-2'>
        <input
          name='newCompanyName'
          className='p-2 border border-gray-400 rounded-md'
          type='text'
          placeholder='company name'
        />
        <button
          type='submit'
          className='flex gap-2 items-center bg-gray-200 px-4 py-2 rounded-md'
        >
          Create company
        </button>
      </form>
    </div>
  );
}
