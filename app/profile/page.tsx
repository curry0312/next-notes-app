"use client"

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function page() {
  const { push } = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      console.log("Hi")
    } else {
      push("/")
    }
  }, [session]);
  return (
    <div>
      <h1>Profile</h1>
    </div>
  )
}
