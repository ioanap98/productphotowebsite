// Import the cookies API to read cookies on the server
import { cookies } from 'next/headers';
// Import the redirect function to send users to another page if needed
import { redirect } from 'next/navigation';
// Import the UploadForm component that will be shown on the admin page
import UploadForm from './UploadForm';
import UploadFormPortfolio from './UploadFormPortfolio';

// This is the default export: your Admin Page component
export default async function AdminPage() {
  // Get access to cookies using the cookies() function (server-side only)
  const cookieStore = await cookies();

  // Try to get the value of the cookie named 'admin-auth'
  const isAuth = cookieStore.get('admin-auth')?.value;

  // If the user is not logged in (cookie missing or not 'true')
  // Redirect them to the login page
  if (isAuth !== 'true') {
    redirect('/login');
  }

  // If the user is authenticated, return the admin panel UI
  return (
    <div className="p-8">
      {/* Heading for the admin panel */}
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      
      {/* Show the upload form component */}
      <UploadForm />
      <UploadFormPortfolio />
    </div>
  );
}
