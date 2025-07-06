// app/api/submit/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-client'

interface SubmitRequest {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  message?: string;
  source?: string;
  groups?: string[];
}

export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID()
  
  try {
    // Validate environment variables
    if (!process.env.MAILERLITE_API_KEY) {
      console.error(`[${requestId}] MailerLite API key not configured`)
      return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 })
    }

    const body = await request.json() as SubmitRequest
    const {
      firstName,
      lastName,
      company,
      email,
      message,
      source = "I'm Interested",
      groups = []
    } = body

    console.log(`[${requestId}] Processing submission for ${email}`)

    // Input validation
    if (!firstName || !lastName || !email) {
      console.warn(`[${requestId}] Missing required fields`)
      return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 })
    }

    if (!Array.isArray(groups)) {
      console.warn(`[${requestId}] Invalid groups format`)
      return NextResponse.json({ message: 'Invalid groups format.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.warn(`[${requestId}] Invalid email format: ${email}`)
      return NextResponse.json({ message: 'Invalid email address.' }, { status: 400 })
    }

    // Database operations
    const supabase = createClient()
    if (!supabase) {
      console.error(`[${requestId}] Failed to initialize Supabase client`)
      return NextResponse.json({ message: 'Failed to connect to database' }, { status: 500 })
    }

    // Insert into Supabase
    const { error: supabaseError } = await supabase.from('waitlist_emails').insert([
      {
        email: email.toLowerCase().trim(),
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        company: company?.trim() || null,
        message: message?.trim() || null,
        source,
        agreed_to_privacy: true,
        newsletter: groups.includes('NEWSLETTER'),
      }
    ])

    if (supabaseError) {
      console.error(`[${requestId}] Supabase insert error:`, supabaseError)
      if (supabaseError.code === '23505') {
        return NextResponse.json({ message: 'This email is already in our system.' }, { status: 409 })
      }
      return NextResponse.json({ message: 'Database operation failed.' }, { status: 500 })
    }

    // MailerLite integration
    if (groups.length > 0) {
      console.log(`[${requestId}] 📬 Submitting ${email} to MailerLite groups:`, groups)

      const groupEnvKeys = groups.map((group: string) => `MAILERLITE_GROUP_${group}`)
      const groupIds = groupEnvKeys
        .map((key: string): string | undefined => process.env[key])
        .filter((id: string | undefined): id is string => Boolean(id))

      if (groupIds.length > 0) {
        try {
          const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
            },
            body: JSON.stringify({
              email: email.toLowerCase().trim(),
              fields: {
                name: `${firstName} ${lastName}`,
                source,
              },
              groups: groupIds,
              status: 'active',
            }),
          })

          const data = await response.json()

          console.log(`[${requestId}] 📨 MailerLite response status:`, response.status)
          console.log(`[${requestId}] ✅ MailerLite response:`, {
            id: data?.data?.id,
            email: data?.data?.email,
            status: data?.data?.status,
            groups: data?.data?.groups,
          })

          if (!response.ok) {
            console.error(`[${requestId}] ❌ MailerLite error:`, data)
            const errorMessage = data.message || 'Failed to add to mailing list'
            return NextResponse.json({ 
              message: 'Partially successful. Added to waitlist but not to mailing list.',
              error: errorMessage 
            }, { status: 207 })
          }
        } catch (mailerLiteError) {
          console.error(`[${requestId}] ❌ MailerLite request failed:`, mailerLiteError)
          return NextResponse.json({ 
            message: 'Partially successful. Added to waitlist but mailing list update failed.',
            error: 'Failed to communicate with mailing list service'
          }, { status: 207 })
        }
      } else {
        console.warn(`[${requestId}] ⚠️ No valid group IDs found in environment for groups:`, groups)
      }
    }

    console.log(`[${requestId}] ✅ Successfully processed submission for ${email}`)
    return NextResponse.json({ message: 'Success.' }, { status: 200 })
  } catch (error) {
    console.error(`[${requestId}] 🔥 API error:`, error)
    return NextResponse.json({ message: 'Unexpected server error.' }, { status: 500 })
  }
}
