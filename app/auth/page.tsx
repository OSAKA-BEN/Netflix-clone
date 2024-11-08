'use client'

import Input from '@/components/Input'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useCallback, useState } from 'react'

import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

const AuthPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [variant, setVariant] = useState('login')

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === 'login' ? 'signup' : 'login',
    )
  }, [])

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/profiles',
      })
    } catch (error) {
      console.log(error)
    }
  }, [email, password])

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        name,
        password,
      })
      login()
    } catch (error) {
      console.log(error)
    }
  }, [email, name, password, login])

  return (
    <div className='relative h-full w-full bg-[url("/images/hero.jpg")] bg-cover bg-fixed bg-center bg-no-repeat'>
      <div className="h-full w-full bg-black lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image
            src="/images/logo.png"
            alt="logo"
            className="h-12"
            width={200}
            height={200}
          />
        </nav>
        <div className="flex justify-center">
          <div className="z-10 mt-2 w-full self-center rounded-md bg-black/70 p-16 lg:w-2/5 lg:max-w-md">
            <h2 className="mb-8 text-center text-4xl font-semibold text-white">
              {variant === 'login' ? 'Sign in' : 'Register'}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === 'signup' && (
                <Input
                  id="username"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  label="Username"
                  type="text"
                />
              )}
              <Input
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                label="Email"
                type="email"
              />
              <Input
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                label="Password"
                type="password"
              />
            </div>
            <button
              onClick={variant === 'login' ? login : register}
              className="mt-10 w-full rounded-md bg-[#e50914] py-3 text-white hover:bg-[#e50914]/80"
            >
              {variant === 'login' ? 'Login' : 'Register'}
            </button>
            <div className="mt-8 flex flex-row items-center justify-center gap-4">
              <div
                onClick={() => signIn('github', { callbackUrl: '/profiles' })}
                className="flex h-10 w-10 cursor-pointer items-center justify-center gap-2 rounded-full bg-white transition hover:opacity-80"
              >
                <FaGithub size={28} />
              </div>
              <div
                onClick={() => signIn('google', { callbackUrl: '/profiles' })}
                className="flex h-10 w-10 cursor-pointer items-center justify-center gap-2 rounded-full bg-white transition hover:opacity-80"
              >
                <FcGoogle size={28} />
              </div>
            </div>
            <p className="mt-12 text-neutral-500">
              {variant === 'login'
                ? 'New to Netflix?'
                : 'Already have an account?'}{' '}
              <span
                onClick={toggleVariant}
                className="cursor-pointer text-white hover:underline"
              >
                {variant === 'login' ? 'Create an account' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
