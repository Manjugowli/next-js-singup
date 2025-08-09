"use client";
import React, { useEffect, useCallback} from "react";
import axios from "axios";
import Link from "next/link";


export default function verifyEmail(){

    const [ token , setToken] = React.useState("");
    const [ isVerified, setIsVerified] = React.useState(false)
    const [ error, setError] = React.useState(false)

    const verifyEmail = useCallback(async()=>{
        try {
            await axios.post(`/api/users/verifyEmail`, {token});
            setIsVerified(true);
            setError(false);
        } catch (error) {
            setError(true)
            console.log(error);
        }
    }, [token])
    

    useEffect(()=>{
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "")
    },[])
    useEffect(()=>{
        if( token.length > 0){
            verifyEmail();
        }
    },[token,verifyEmail])

    return (
      <div className="flex flex-col justify-center min-h-screen w-2xs min-w-screen items-center gap-1">
        <h1> Verify Your Email </h1>
        {isVerified && (<>
          <div className="text-2xl text-black bg-purple-400">
            Email Verified
          </div>
        <Link href={"/login"}>Login</Link>
          </>)}
        {error && (
          <div className="text-2xl text-black bg-red-500">
            Error
          </div>
        )}
      </div>
    );
}