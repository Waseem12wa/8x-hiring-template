"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { UserCircle } from "lucide-react"

export default function PersonReplacerPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <div className="container mx-auto px-6 py-24 text-center">
                <div className="w-16 h-16 bg-pink-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-pink-500">
                    <UserCircle className="w-8 h-8" />
                </div>
                <h1 className="text-4xl font-bold mb-4">AI Person Replacer</h1>
                <p className="text-xl text-muted-foreground mb-8">This tool is coming soon.</p>
                <Button asChild>
                    <a href="/tools/video-generation">Try Video Generation Instead</a>
                </Button>
            </div>
        </div>
    )
}
