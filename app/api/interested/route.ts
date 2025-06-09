import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, company, email, message, source } = body

    // Validation
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { message: 'Missing required fields: firstName, lastName, and email are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    const supabase = createClient()
    if (!supabase) {
      return NextResponse.json(
        { message: 'Unable to connect to database' },
        { status: 500 }
      )
    }

    // Insert into waitlist_emails table with new fields
    const { data, error: supabaseError } = await supabase
      .from('waitlist_emails')
      .insert([
        {
          email: email.toLowerCase().trim(),
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          company: company?.trim() || null,
          message: message?.trim() || null,
          source: source || "I'm Interested",
          agreed_to_privacy: true // Since this is a different form, we assume agreement
        }
      ])

    if (supabaseError) {
      console.error('Supabase error:', supabaseError)
      
      if (supabaseError.code === '23505') {
        // Unique constraint violation - email already exists
        return NextResponse.json(
          { message: 'This email is already in our system. Thank you for your continued interest!' },
          { status: 409 }
        )
      }
      
      return NextResponse.json(
        { message: 'Something went wrong. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Thank you for your interest! We\'ll be in touch soon.' },
      { status: 200 }
    )

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { message: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
} 