import { NextResponse } from 'next/server'
import serverAuth from '../../../lib/serverAuth'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { currentUser } = await serverAuth()
    return NextResponse.json(currentUser)
  } catch (error) {
    console.log(error)
    return new NextResponse('Internal Error', { status: 400 })
  }
}
