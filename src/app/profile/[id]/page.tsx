"use client";
import React,{use} from 'react'
export default function profile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <div className='text-2xl min-h-screen min-w-screen text-amber-700'>Profile ID: {id}</div>;
}
