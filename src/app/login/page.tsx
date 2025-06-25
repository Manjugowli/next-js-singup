"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

const login = () => {
  const router  = useRouter();
  const [user , setUser] = React.useState({
    email:"",
    password:""
  })
  const [ loading , setLoading] = React.useState(false);
  const [ isDisabled , setIsDisabled] = React.useState(true);
  const onLogin = async()=>{
    try {
      const response = await axios.post("/api/users/login", user);
      console.log("Login Success",response?.data);
      router.push("/profile");
    } catch (error) {
      console.log("Error in Login:", error);
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    if(user?.email?.length > 0 && user?.password?.length){
      setIsDisabled(false)
    }else{
      setIsDisabled(true)
    }
  },[user])
  return (
    <div className="flex flex-col justify-center min-h-screen w-2xs min-w-screen items-center gap-1">
      <h1>{loading ? "Loading....." : "Login" }</h1>
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
        <button onClick={()=>onLogin()} disabled={isDisabled} className="bg-sky-500 hover:bg-sky-700 border-1 border-blue-300 rounded-sm">Login</button>
        <Link href={'/signup'}>Visit Sign Up Page</Link>
      </div>
  );
}

export default login;
