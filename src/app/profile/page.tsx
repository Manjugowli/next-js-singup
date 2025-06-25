"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const profile = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = React.useState<{ name?: string } | null>(null)
  const logout = async() =>{
    try {
      await axios.get("/api/users/logout")
      console.log(" User Log Out Successfull");
      router.push("/login")
    } catch (error) {
      console.log("Error in Logout", error);
      
    }
  }
  const getUser = async()=>{
      const user = await axios.get("/api/users/user");
      setUserInfo({...user.data.data})
  }

  // route change on get info
  useEffect(() => {
    // if (userInfo?.name) {
    //   router.push(`/profile/${userInfo.name}`);
    // }
  }, [userInfo]);
  return (
    <div className="flex flex-col min-h-screen min-w-screen items-center justify-center gap-4">
      <h2>Profile {userInfo?.name}</h2>
      {userInfo?.name &&
        <Link href={`/profile/${userInfo?.name}`}>GO TO USER PAGE</Link>
      }
      <button onClick={getUser} className='bg-purple-300 rounded-md hover:bg-purple-400 border-1'>Get Info</button>
      <button onClick={logout} className='bg-blue-300 rounded-md hover:bg-blue-400 border-1'>Log Out</button>
    </div>
  )
}

export default profile;
