import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const customerData = await request.json()
    
    // Validate required fields
    const requiredFields = [
      'clerk_user_id',
      'full_name',
      'email',
      'phone_number',
      'address_line_1',
      'city',
      'state',
      'country',
      'pin_code'
    ]

    for (const field of requiredFields) {
      if (!customerData[field]) {
        return NextResponse.json({ 
          error: `${field.replace('_', ' ')} is required` 
        }, { status: 400 })
      }
    }

    // Verify that the clerk_user_id matches the authenticated user
    if (customerData.clerk_user_id !== userId) {
      return NextResponse.json({ 
        error: 'Unauthorized: User ID mismatch' 
      }, { status: 401 })
    }

    // Check if customer already exists
    const { data: existingCustomer, error: checkError } = await supabase
      .from('customers')
      .select('id')
      .eq('clerk_user_id', userId)
      .single()

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "not found" error
      console.error('Error checking existing customer:', checkError)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    if (existingCustomer) {
      return NextResponse.json({ 
        error: 'Customer already exists' 
      }, { status: 409 })
    }

    // Check if email already exists
    const { data: emailExists, error: emailCheckError } = await supabase
      .from('customers')
      .select('id')
      .eq('email', customerData.email)
      .single()

    if (emailCheckError && emailCheckError.code !== 'PGRST116') {
      console.error('Error checking existing email:', emailCheckError)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    if (emailExists) {
      return NextResponse.json({ 
        error: 'Email already registered' 
      }, { status: 409 })
    }

    // Insert new customer
    const { data: newCustomer, error: insertError } = await supabase
      .from('customers')
      .insert([
        {
          clerk_user_id: customerData.clerk_user_id,
          username: customerData.username || null,
          full_name: customerData.full_name,
          email: customerData.email,
          phone_number: customerData.phone_number,
          address_line_1: customerData.address_line_1,
          address_line_2: customerData.address_line_2 || null,
          city: customerData.city,
          state: customerData.state,
          country: customerData.country,
          pin_code: customerData.pin_code,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select('id, clerk_user_id, full_name, email')
      .single()

    if (insertError) {
      console.error('Error creating customer:', insertError)
      return NextResponse.json({ 
        error: 'Failed to create customer record' 
      }, { status: 500 })
    }

    return NextResponse.json({
      message: 'Customer created successfully',
      customer: newCustomer
    })

  } catch (error) {
    console.error('Error creating customer:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
