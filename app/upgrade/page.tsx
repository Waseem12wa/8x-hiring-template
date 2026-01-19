"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, Sparkles, CreditCard, Lock, Calendar } from "lucide-react"
import { useSubscription } from "@/contexts/subscription-context"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "sonner"

export default function UpgradePage() {
  const { isPro, upgradeToPro, downgradeToFree, isLoading: subLoading } = useSubscription()
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  // Fake Checkout Form State
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvc, setCvc] = useState("")
  const [name, setName] = useState("")

  const handleUpgrade = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      router.push("/auth/signup?returnUrl=/upgrade")
      return
    }

    if (!cardNumber || !expiry || !cvc || !name) {
      toast.error("Please fill in all payment details")
      return
    }

    setIsProcessing(true)

    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      await upgradeToPro()
      toast.success("Payment successful! Welcome to Pro.")
      router.push("/upgrade/success") // Assuming this page exists or we just show success state here
    } catch (error) {
      toast.error("Payment failed. Please try again.")
      console.error(error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDowngrade = async () => {
    setIsProcessing(true)
    try {
      await downgradeToFree()
      toast.success("You've been downgraded to the Free plan.")
    } catch (error) {
      toast.error("Failed to downgrade. Please try again.")
      console.error(error)
    } finally {
      setIsProcessing(false)
    }
  }

  // Show current subscription if Pro
  if (isPro && !subLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <div className="flex items-center justify-center px-4 py-16 min-h-[calc(100vh-80px)]">
          <div className="max-w-2xl w-full">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="mb-6 flex justify-center">
                <CheckCircle className="w-16 h-16 text-primary" />
              </div>
              <h1 className="text-5xl font-light tracking-tight mb-4">
                You're a <span className="font-semibold text-primary">Pro</span> member
              </h1>
              <p className="text-xl text-muted-foreground font-light">
                Thank you for upgrading! You have access to all Pro features.
              </p>
            </div>

            {/* Current Plan Card */}
            <div className="border-2 border-primary rounded-2xl p-8 bg-card/50 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-primary font-medium mb-1">Current Plan</div>
                  <div className="text-2xl font-bold flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Pro Plan
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground mb-1">Status</div>
                  <div className="font-medium text-green-500">Active</div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="text-sm font-medium mb-3">Your Pro benefits:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Unlimited access to all features
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Priority support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Advanced analytics
                  </li>
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/profile">Manage Account</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleDowngrade}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Downgrade to Free"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show Checkout for free users
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

          {/* Left Column: Summary */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-4">Upgrade to Pro</h1>
              <p className="text-muted-foreground text-lg">Unleash your full potential with unlimited access.</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold">Pro Plan</h3>
                  <p className="text-muted-foreground">Monthly subscription</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold">$29</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
              </div>

              <ul className="space-y-4 pt-6 border-t border-border">
                {[
                  "Unlimited video & image generations",
                  "Fast priority processing",
                  "No watermarks",
                  "Commercial license",
                  "Priority support"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-indigo-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Checkout Form */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Secure Checkout</h2>

            <form onSubmit={handleUpgrade} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Cardholder Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isProcessing}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="card">Card Number</Label>
                <div className="relative">
                  <Input
                    id="card"
                    placeholder="0000 0000 0000 0000"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    disabled={isProcessing}
                    required
                  />
                  <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <div className="relative">
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      disabled={isProcessing}
                      required
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <div className="relative">
                    <Input
                      id="cvc"
                      placeholder="123"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      disabled={isProcessing}
                      required
                    />
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full h-12 text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all"
                  disabled={isProcessing || authLoading || subLoading}
                >
                  {isProcessing ? (
                    <>
                      <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      Pay $29.00
                    </>
                  )}
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-4 flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3" />
                  Payments are secure and encrypted. This is a demo.
                </p>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}
