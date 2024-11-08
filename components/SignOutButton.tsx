// app/components/SignOutButton.jsx

'use client'

import { signOut } from 'next-auth/react'
import React from 'react'

export default function SignOutButton() {
  return <button onClick={() => signOut()}>Se déconnecter</button>
}
