'use client';
import Link from "next/link";


export default function Home() {
  return (
    <div className="flex flex-col justify-center min-h-screen w-2xs min-w-screen items-center gap-10">
       <Link href={'/login'}>Visit Login Page</Link>
       <Link href={'/signup'}>Visit Sign UP Page</Link>
    </div>
  );
}
