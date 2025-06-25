"use client"; 
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";


export default function  signup() {
  const router  = useRouter();
  const [user , setUser] = React.useState({
    username : "",
    email:"",
    password:""
  })
  const [ loading , setLoading] = React.useState(false);
  const [ isDisabled , setIsDisabled] = React.useState(true);
  const onSignUp = async()=>{
    try {
      const response = await axios.post("/api/users/signup", user);
      console.log(" Singup Success",response?.data);
      router.push("/login");
    } catch (error) {
      console.log("Error in Singup:", error);
    }finally{
      setLoading(false)
    }
  }
  React.useEffect(()=>{
    if(user?.username?.length > 0 && user?.email?.length > 0 && user?.password?.length){
      setIsDisabled(false)
    }else{
      setIsDisabled(true)
    }
  },[user])
  return (
    <div className="flex flex-col justify-center min-h-screen w-2xs min-w-screen items-center gap-1">
      <h1>{loading ? "Loading....." : "Sign Up" }</h1>
      <div>
        <div>UserName</div>
        <input
        className="p-2 border-1 border-b-gray-500 rounded-xl"
          type="text"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Enter User name"
          value={user.username}
        />
      </div>
      <div>
        <div>Email</div>
        <input
        className="p-2 border-1 border-b-gray-500 rounded-xl"
          type="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          value={user.email}
          placeholder="Enter User name"
        />
      </div>
      <div>
        <div>Password </div>
        <input
        className="p-2 border-1 border-b-gray-500 rounded-xl"
          type="password"
          onChange={(e) => setUser({ ...user,password: e.target.value })}
          placeholder="Enter User name"
          value={user.password}
        />
        </div>
        <button type="button" onClick={()=>onSignUp()} disabled={isDisabled} className="bg-sky-300 hover:bg-sky-500 border-1 border-blue-300 rounded-sm"> Sign Up</button>
        <Link href={'/login'}>Visit Login Page</Link>
      </div>
  );
}
