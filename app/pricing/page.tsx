"use client"

import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Check, X } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navigation />

            <div className="container mx-auto px-6 py-24">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
                    <p className="text-xl text-muted-foreground">
                        Choose the plan that's right for you. No hidden fees.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Free Tier */}
                    <div className="rounded-2xl border border-border bg-card p-8 flex flex-col">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold">Free Starter</h2>
                            <div className="mt-4 flex items-baseline">
                                <span className="text-4xl font-bold">$0</span>
                                <span className="text-muted-foreground ml-2">/month</span>
                            </div>
                            <p className="mt-2 text-muted-foreground">Perfect for experimenting with AI generation.</p>
                        </div>

                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3">
                                <Check className="w-5 h-5 text-green-500" />
                                <span>5 generations per day</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="w-5 h-5 text-green-500" />
                                <span>Standard speed</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="w-5 h-5 text-green-500" />
                                <span>Standard resolution (720p)</span>
                            </li>
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <X className="w-5 h-5" />
                                <span>Watermarked outputs</span>
                            </li>
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <X className="w-5 h-5" />
                                <span>Commercial usage</span>
                            </li>
                        </ul>

                        <Link href="/auth/signup">
                            <Button variant="outline" className="w-full h-12 text-lg">Get Started Free</Button>
                        </Link>
                    </div>

                    {/* Pro Tier */}
                    <div className="rounded-2xl border-2 border-indigo-500 bg-secondary/10 p-8 flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                            POPULAR
                        </div>

                        <div className="mb-6">
                            <h2 className="text-2xl font-bold">Pro Creator</h2>
                            <div className="mt-4 flex items-baseline">
                                <span className="text-4xl font-bold">$29</span>
                                <span className="text-muted-foreground ml-2">/month</span>
                            </div>
                            <p className="mt-2 text-muted-foreground">For serious creators who need the best quality.</p>
                        </div>

                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3">
                                <div className="p-1 rounded-full bg-indigo-500/10">
                                    <Check className="w-4 h-4 text-indigo-500" />
                                </div>
                                <span className="font-medium">Unlimited generations</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="p-1 rounded-full bg-indigo-500/10">
                                    <Check className="w-4 h-4 text-indigo-500" />
                                </div>
                                <span>Fast priority processing</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="p-1 rounded-full bg-indigo-500/10">
                                    <Check className="w-4 h-4 text-indigo-500" />
                                </div>
                                <span>4K resolution support</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="p-1 rounded-full bg-indigo-500/10">
                                    <Check className="w-4 h-4 text-indigo-500" />
                                </div>
                                <span>No watermarks</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="p-1 rounded-full bg-indigo-500/10">
                                    <Check className="w-4 h-4 text-indigo-500" />
                                </div>
                                <span>Commercial license</span>
                            </li>
                        </ul>

                        <Link href="/upgrade">
                            <Button className="w-full h-12 text-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-0 shadow-lg shadow-indigo-500/25">
                                Upgrade to Pro
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
