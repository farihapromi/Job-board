import Jobs from '@/app/components/Jobs';
import { Job } from '@/models/Job';
import { WorkOS } from '@workos-inc/node';
import mongoose from 'mongoose';

type PageProps = {
  params: {
    orgId: string;
  };
};
export default async function CompanyJobsPage(props: PageProps) {
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  const org = await workos.organizations.getOrganization(props.params.orgId);
  await mongoose.connect(process.env.MONGO_URI as string);
  const jobsDocs = await Job.find({ orgId: org.id });
  return (
    <div>
      <div className='container'>
        <h1 className='text-xl my-6'>{org.name}</h1>
      </div>
      <Jobs jobs={jobsDocs} header={'Jobs posted by ' + org.name} />
    </div>
  );
}
