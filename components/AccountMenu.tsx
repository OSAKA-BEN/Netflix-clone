'use client'

import useCurrentUser from '@/hooks/useCurrentUser'
import { signOut } from 'next-auth/react'
import Image from 'next/image'

interface AccountMenuProps {
  visible?: boolean
}

const AccountMenu = ({ visible }: AccountMenuProps) => {
  const { data: user } = useCurrentUser()

  if (!visible) {
    return null
  }

  return (
    <div className="absolute right-0 top-16 flex w-56 flex-col border-2 border-gray-800 bg-black py-5">
      <div className="flex flex-col gap-3">
        <div className="group/item flex w-full flex-row items-center gap-3 px-3">
          <Image
            src="/images/default-blue.jpg"
            alt="Profile"
            className="w-8 rounded-md"
            width={100}
            height={100}
          />
          <p className="text-sm text-white group-hover/item:underline">
            {user?.name}
          </p>
        </div>
        <hr className="my-4 h-px border-0 bg-gray-600" />
        <div
          onClick={() => signOut()}
          className="px-3 text-center text-sm text-white hover:underline"
        >
          Sign out of Netflix
        </div>
      </div>
    </div>
  )
}

export default AccountMenu
