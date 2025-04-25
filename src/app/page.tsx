// app/page.tsx or app/home.tsx (depending on your file structure)
import { addOrgAndUserData, Job } from '@/models/Job';
import Hero from './components/Hero';
import Jobs from './components/Jobs';
import { withAuth } from '@workos-inc/authkit-nextjs';
import mongoose from 'mongoose';

// This is a Server Component that fetches data asynchronously
export default async function Home() {
  // Retrieves the user from the session or returns `null` if no user is signed in
  // const { user } = await withAuth();

  // // Get the URL to redirect the user to AuthKit to sign in
  // const signInUrl = await getSignInUrl();

  // // Get the URL to redirect the user to AuthKit to sign up
  // const signUpUrl = await getSignUpUrl();
  const { user } = await withAuth();
  await mongoose.connect(process.env.MONGO_URI as string);
  const latestJobs = await addOrgAndUserData(
    await Job.find({}, {}, { limit: 5, sort: '-createdAt' }),
    user
  );

  return (
    <div>
      <Hero />
      <Jobs header={''} jobs={latestJobs} />
    </div>
  );
}
