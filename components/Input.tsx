'use client'

import React from 'react'

interface InputProps {
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label: string;
  type?: string;
}

const Input = ({ id, onChange, value, label, type }: InputProps) => {
  
  return (
    <div className='relative'>
      <input id={id} type={type} placeholder=" " className=' block rounded-md border border-neutral-800 focus:border-2 focus:border-red-500 outline-none px-6 pt-6 pb-1 text-md w-full bg-neutral-700 text-white peer' onChange={onChange} value={value} />
      <label htmlFor={id} className='absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'>{label}</label>
    </div>
  )
}

export default Input