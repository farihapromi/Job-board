import { withAuth } from '@workos-inc/authkit-nextjs';
import { WorkOS } from '@workos-inc/node';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export default async function NewListingPage() {
  const { user } = await withAuth();

  if (!user) {
    return (
      <div className='container'>
        {!user && <div>you need to be logged in to post a job </div>}
      </div>
    );
  }
  const workos = new WorkOS(process.env.WORKOS_API_KEY);

  const organizationMemberships =
    await workos.userManagement.listOrganizationMemberships({
      userId: user.id,
    });
  const activeOrganizationMemberships = organizationMemberships.data.filter(
    (organizationMember) => organizationMember.status === 'active'
  );
  const organizationsNames: { [key: string]: string } = {};
  for (const activeMembership of activeOrganizationMemberships) {
    const organization = await workos.organizations.getOrganization(
      activeMembership.organizationId
    );
    organizationsNames[organization.id] = organization.name;
  }

  return (
    <>
      <div className='container max-w-2xl mx-auto px-4 py-8'>
        <h1 className='text-2xl font-bold mb-4'>Your Companies</h1>
        <p className='text-gray-500 text-sm mb-6'>
          Select a company to create a job listing for
        </p>

        {Object.keys(organizationsNames).length > 0 ? (
          <div className='grid gap-4 '>
            {Object.entries(organizationsNames).map(
              ([orgId, orgName], index) => (
                <Link
                  key={orgId}
                  href={`/new-listing/${orgId}`}
                  className='block border rounded-lg px-5 py-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 hover:bg-gray-50'
                >
                  <div className='font-medium text-lg'>{orgName}</div>
                </Link>
              )
            )}
          </div>
        ) : (
          <div className='border border-blue-300 bg-blue-50 text-blue-800 p-4 rounded-md mb-6'>
            No companies found assigned to your user.
          </div>
        )}

        <Link
          href='/new-company'
          className='mt-6 inline-flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md shadow-sm transition-colors'
        >
          <span>Create a new company</span>
          <FontAwesomeIcon className='h-4' icon={faArrowRight} />
        </Link>
      </div>
    </>
  );
}
