import { Metadata } from 'next'

import { UsernameForm } from '@/components/forms/username'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Username | MyFavVault',
}

export default async function Username() {
  return (
    <main className='base-page-bg min-h-screen py-12'>
      <div className='mx-auto  flex w-full flex-col justify-center space-y-6 sm:max-w-lg'>
        <Card>
          <CardHeader className='space-y-1 p-8 pb-2'>
            <CardTitle className='text-3xl font-semibold tracking-tight'>
              Set username
            </CardTitle>
            <CardDescription>
              Choose your preferred sign in method
            </CardDescription>
          </CardHeader>
          <CardContent className='p-8 pt-2'>
            <UsernameForm />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
