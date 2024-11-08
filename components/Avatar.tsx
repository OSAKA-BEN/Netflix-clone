import { Session } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Avatar = ({ session }: { session: Session }) => {
  return (
    <Link href="/">
      <div className="group mx-auto w-44 flex-row">
        <div className="flex h-44 w-44 items-center justify-center rounded-md border-2 border-transparent group-hover:cursor-pointer group-hover:border-white">
          <Image
            src="/images/default-blue.jpg"
            alt="Profile"
            className="rounded-md object-cover"
            width={176}
            height={176}
          />
        </div>
        <div className="mt-4 text-center text-2xl text-gray-400 group-hover:text-white">
          {session.user?.name}
        </div>
      </div>
    </Link>
  )
}

export default Avatar
