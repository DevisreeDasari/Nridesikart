import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if customer record exists for this Clerk user
    const { data: customer, error } = await supabase
      .from('customers')
      .select('id, clerk_user_id, full_name, email')
      .eq('clerk_user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
      console.error('Error checking customer:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    // If customer exists, they've completed onboarding
    const exists = !!customer

    return NextResponse.json({ 
      exists,
      customer: exists ? customer : null
    })

  } catch (error) {
    console.error('Error checking onboarding status:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
