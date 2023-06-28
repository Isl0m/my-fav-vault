'use client'

import { OAuthProviderType } from 'next-auth/providers'
import { signIn } from 'next-auth/react'

import { useState } from 'react'
import * as React from 'react'
import toast from 'react-hot-toast'

import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'

const oauthProviders = [
  { name: 'Google', type: 'google', icon: 'google' },
  { name: 'GitHub', type: 'github', icon: 'gitHub' },
] satisfies {
  name: string
  type: OAuthProviderType
  icon: keyof typeof Icons
}[]

export function OAuthSignIn() {
  const [isLoading, setIsLoading] = useState(false)

  const oauthSignIn = async (providerType: OAuthProviderType) => {
    setIsLoading(true)
    const res = await signIn(providerType)
    if (res?.ok || !res?.error) {
      setIsLoading(false)
      return
    }
    toast.error(res.error)
  }

  return (
    <div className='grid grid-cols-2 gap-4'>
      {oauthProviders.map(provider => {
        const Icon = Icons[provider.icon]

        return (
          <Button
            aria-label={`Sign in with ${provider.name}`}
            key={provider.name}
            variant='outline'
            type='button'
            disabled={isLoading}
            onClick={() => oauthSignIn(provider.type)}
          >
            {isLoading ? (
              <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <Icon className='mr-2 h-4 w-4' />
            )}
            {provider.name}
          </Button>
        )
      })}
    </div>
  )
}
