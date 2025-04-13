// app/page.tsx or app/home.tsx (depending on your file structure)
import Hero from "./components/Hero";
import Jobs from "./components/Jobs";
import { getSignInUrl, getSignUpUrl, withAuth } from "@workos-inc/authkit-nextjs";

// This is a Server Component that fetches data asynchronously
export default async function Home() {
  // Retrieves the user from the session or returns `null` if no user is signed in
  const { user } = await withAuth();

  // Get the URL to redirect the user to AuthKit to sign in
  const signInUrl = await getSignInUrl();
  
  // Get the URL to redirect the user to AuthKit to sign up
  const signUpUrl = await getSignUpUrl();

  return (
    <>
      <Hero />
      <Jobs />
    </>
  );
}
