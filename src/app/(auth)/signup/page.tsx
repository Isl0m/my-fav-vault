import { Metadata } from 'next'
import Link from 'next/link'

import { OAuthSignIn } from '@/components/auth/oauth-signin'
import { SignUpForm } from '@/components/forms/signup'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  checkSessionAndRedirect,
  checkUsernameAndRedirect,
} from '@/lib/utils-server'

export const metadata: Metadata = {
  title: 'Sing up | MyFavVault',
  description: 'Sign up to your account',
}

export default async function SingUp() {
  await checkUsernameAndRedirect()
  await checkSessionAndRedirect()

  return (
    <main className='base-page-bg container flex h-without-header items-center justify-center'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:max-w-lg'>
        <Card>
          <CardHeader className='space-y-1 p-8 pb-2'>
            <CardTitle className='text-3xl font-semibold tracking-tight'>
              Sign up
            </CardTitle>
            <CardDescription>
              Choose your preferred sign in method
            </CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4 p-8 py-2'>
            <OAuthSignIn />
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  Or continue with
                </span>
              </div>
            </div>
            <SignUpForm />
          </CardContent>
          <CardFooter className='flex-1 p-8 pt-2 text-sm text-muted-foreground'>
            Already have an account?{' '}
            <Button variant='link'>
              <Link aria-label='Sign in' href='/signin'>
                Sign in
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
