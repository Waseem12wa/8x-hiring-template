import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Redirect authenticated users away from auth pages
  if (user && (request.nextUrl.pathname.startsWith("/auth/login") || request.nextUrl.pathname.startsWith("/auth/signup"))) {
    const returnUrl = request.nextUrl.searchParams.get("returnUrl") || "/"
    return NextResponse.redirect(new URL(returnUrl, request.url))
  }

  // Redirect unauthenticated users away from protected pages
  if (!user && (request.nextUrl.pathname.startsWith("/tools") || request.nextUrl.pathname.startsWith("/upgrade"))) {
    const returnUrl = request.nextUrl.pathname
    return NextResponse.redirect(new URL(`/auth/login?returnUrl=${encodeURIComponent(returnUrl)}`, request.url))
  }

  return supabaseResponse
}
