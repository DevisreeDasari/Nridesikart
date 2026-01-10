import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <SignUp 
      appearance={{
        elements: {
          rootBox: "mx-auto",
          card: "shadow-xl"
        }
      }}
      routing="path"
      path="/sign-up"
      signInUrl="/sign-in"
      afterSignUpUrl="/onboarding/customer"
    />
  )
}