// app/api/interested/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, company, email, message, source, newsletter = false } = body

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { message: 'Missing required fields: firstName, lastName, and email are required' },
        { status: 400 }
      )
    }

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

    const { error: supabaseError } = await supabase
      .from('waitlist_emails')
      .insert([
        {
          email: email.toLowerCase().trim(),
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          company: company?.trim() || null,
          message: message?.trim() || null,
          source: source || "I'm Interested",
          agreed_to_privacy: true,
          newsletter,
        }
      ])

    if (supabaseError) {
      console.error('❌ Supabase error:', supabaseError)

      if (supabaseError.code === '23505') {
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

    if (newsletter) {
      console.log(`📬 Attempting to add "${email}" to MailerLite...`)

      const mailerLiteResponse = await fetch('https://connect.mailerlite.com/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
        },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          fields: {
            name: `${firstName} ${lastName}`,
            source: source || "I'm Interested",
          },
          groups: [process.env.MAILERLITE_ACTIVE_GROUP_ID],
          status: 'active',
        }),
      })

      const mailerLiteData = await mailerLiteResponse.json()

      console.log('📨 MailerLite response status:', mailerLiteResponse.status)
      console.log('✅ MailerLite response:', {
        email: mailerLiteData?.email,
        id: mailerLiteData?.data?.id,
        status: mailerLiteData?.data?.status,
        name: mailerLiteData?.data?.fields?.name,
        groupIds: mailerLiteData?.data?.groups,
      })

      if (!mailerLiteResponse.ok) {
        console.error('❌ MailerLite API error:', mailerLiteData)

        return NextResponse.json(
          { message: 'You were added, but newsletter signup failed.', mailerLiteData },
          { status: 207 }
        )
      }
    }

    console.log(`✅ Successfully processed form for ${email} (newsletter: ${newsletter})`)

    return NextResponse.json(
      { message: 'Thank you for your interest! We\'ll be in touch soon.' },
      { status: 200 }
    )

  } catch (error) {
    console.error('🔥 API error:', error)
    return NextResponse.json(
      { message: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
