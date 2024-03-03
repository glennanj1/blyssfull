// Import necessary libraries
import { useSession } from "next-auth/react";
// import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

// AdminPage component
export default function AdminPage(props) {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);
    // const router = useRouter()

  // Client-side check and redirection
  useEffect(() => {
    if (!(session && session.role === 'admin')) {
      // router.push('/auth/Signin');
    } 
  }, [session])

  // If loading or user role is not admin, don't display the page
  if (loading || !(session && session.user.role === 'admin')) return null

  return <div>Welcome to the admin page!</div>
}



