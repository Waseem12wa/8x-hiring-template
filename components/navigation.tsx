"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, Menu, X, Sparkles, ChevronDown, Video, Image as ImageIcon, Shirt, Car, UserCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useSubscription } from "@/contexts/subscription-context"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from "@/components/mode-toggle"

export function Navigation() {
  const pathname = usePathname()
  const { user, isLoading, signOut } = useAuth()
  const { isPro } = useSubscription()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const aiTools = [
    { name: "Video Generation", href: "/tools/video-generation", icon: Video },
    { name: "Image Generator", href: "/tools/image-generator", icon: ImageIcon },
    { name: "AI Dress Changer", href: "/tools/dress-changer", icon: Shirt },
    { name: "AI Car Changer", href: "/tools/car-changer", icon: Car },
    { name: "AI Person Replacer", href: "/tools/person-replacer", icon: UserCircle },
  ]

  return (
    <>
      {/* Mobile Navigation */}
      <nav className="md:hidden border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">babiceva.ai</span>
            </Link>
            <div className="flex items-center gap-2">
              <ModeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-muted-foreground hover:text-foreground"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border/50 px-6 py-4 space-y-4 bg-background">
            <div className="flex flex-col space-y-3">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="py-2 text-muted-foreground hover:text-foreground font-medium">
                Home
              </Link>
              <div className="py-2">
                <div className="font-medium mb-2 text-foreground">AI Tools</div>
                <div className="pl-4 space-y-2 border-l-2 border-border/50">
                  {aiTools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1 text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <tool.icon className="w-4 h-4" />
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="py-2 text-muted-foreground hover:text-foreground font-medium">
                Pricing
              </Link>
            </div>

            <div className="pt-4 border-t border-border/50">
              {!isLoading && (
                <>
                  {user ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 py-2">
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                          <User className="w-4 h-4" />
                        </div>
                        <div className="text-sm font-medium">{user.email}</div>
                      </div>
                      {!isPro && (
                        <Link href="/pricing" onClick={() => setMobileMenuOpen(false)}>
                          <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-0">Upgrade to Pro</Button>
                        </Link>
                      )}
                      <Button variant="outline" className="w-full" onClick={() => { signOut(); setMobileMenuOpen(false); }}>
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full">Sign In</Button>
                      </Link>
                      <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full">Sign Up</Button>
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Desktop Navigation */}
      <nav className="hidden md:block border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity mr-8"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">babiceva.ai</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 flex-1">
            <Link href="/" className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/" ? "text-foreground" : "text-muted-foreground"}`}>
              Home
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors outline-none">
                AI Tools <ChevronDown className="w-3 h-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 p-2">
                {aiTools.map((tool) => (
                  <DropdownMenuItem key={tool.href} asChild>
                    <Link href={tool.href} className="flex items-center gap-2 cursor-pointer">
                      <tool.icon className="w-4 h-4 text-indigo-500" />
                      <span>{tool.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/pricing" className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/pricing" ? "text-foreground" : "text-muted-foreground"}`}>
              Pricing
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />
            {!isLoading && (
              <>
                {user ? (
                  <div className="flex items-center gap-4">
                    {!isPro && (
                      <Link href="/pricing">
                        <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-0 shadow-md shadow-indigo-500/20">
                          Upgrade to Pro
                        </Button>
                      </Link>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <User className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <div className="flex items-center justify-start gap-2 p-2">
                          <div className="flex flex-col space-y-1 leading-none">
                            {user.email && (
                              <p className="font-medium text-sm text-foreground">
                                {user.email}
                              </p>
                            )}
                            <p className="w-[200px] truncate text-xs text-muted-foreground">
                              {isPro ? "Pro Plan" : "Free Plan"}
                            </p>
                          </div>
                        </div>
                        <DropdownMenuItem asChild>
                          <Link href="/profile" className="cursor-pointer">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer text-red-500 focus:text-red-500"
                          onClick={() => signOut()}
                        >
                          Sign Out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/auth/login">Sign In</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href="/auth/signup">Get Started</Link>
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}
