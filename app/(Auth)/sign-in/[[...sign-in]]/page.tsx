import { SignIn } from '@clerk/nextjs'
//sign in fixed
export default function Page() {
  return (
    <SignIn 
      appearance={{
        elements: {
          rootBox: "mx-auto",
          card: "shadow-xl"
        }
      }}
      routing="path"
      path="/sign-in"
      signUpUrl="/sign-up"
      afterSignInUrl="/"
    />
  )
}