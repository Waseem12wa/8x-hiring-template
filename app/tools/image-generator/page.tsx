"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useSubscription } from "@/contexts/subscription-context"
import { Loader2, ImageIcon, Sparkles, Download, Layers } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ImageGeneratorPage() {
    const { user, isLoading } = useAuth()
    const { isPro } = useSubscription()
    const router = useRouter()

    const [prompt, setPrompt] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)
    const [generatedImage, setGeneratedImage] = useState<string | null>(null)

    // Redirect if not authenticated (client-side check specific to component logic)
    // Note: Middleware also handles this redirection for security
    if (!isLoading && !user) {
        router.push("/auth/login?returnUrl=/tools/image-generator")
        return null
    }

    const handleGenerate = async () => {
        if (!prompt) return
        setIsGenerating(true)
        setGeneratedImage(null)

        // Simulate generation delay
        await new Promise(resolve => setTimeout(resolve, 3000))

        // Set a fake "generated" image from Unsplash
        // Using a random seed to get different images
        setGeneratedImage(`https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1024&auto=format&fit=crop&random=${Date.now()}`)

        setIsGenerating(false)
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navigation />

            <div className="container mx-auto px-6 py-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-pink-500/10 rounded-lg text-pink-500">
                            <ImageIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">Image Generator</h1>
                            <p className="text-muted-foreground">Create stunning AI art from text descriptions.</p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-8">
                        {/* Left Column: Controls */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-card border border-border rounded-xl p-6 space-y-6">
                                <div className="space-y-3">
                                    <label className="text-sm font-medium">Prompt</label>
                                    <Textarea
                                        placeholder="A cyberpunk street at night with neon rain..."
                                        className="min-h-[120px] resize-none text-base"
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Model Version</label>
                                    <div className="grid grid-cols-2 gap-2 p-1 bg-secondary rounded-lg">
                                        <button className="px-3 py-2 text-sm font-medium bg-background shadow rounded-md">V 2.5</button>
                                        <button className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">V 3.0 (Alpha)</button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Aspect Ratio</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['1:1', '16:9', '4:3'].map((ratio) => (
                                            <button
                                                key={ratio}
                                                className={`px-3 py-2 text-sm font-medium border rounded-md transition-colors ${ratio === '1:1' ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary/50'}`}
                                            >
                                                {ratio}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2 pt-4 border-t border-border">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Layers className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-sm font-medium">High Resolution</span>
                                        </div>
                                        {!isPro ? (
                                            <span className="text-xs bg-indigo-500/10 text-indigo-500 px-2 py-0.5 rounded border border-indigo-500/20">Pro Only</span>
                                        ) : (
                                            <input type="checkbox" className="toggle" defaultChecked />
                                        )}
                                    </div>
                                </div>

                                <Button
                                    onClick={handleGenerate}
                                    disabled={!prompt || isGenerating}
                                    className="w-full h-12 text-lg bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 border-0 shadow-lg shadow-pink-500/20"
                                >
                                    {isGenerating ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-5 h-5 mr-2" />
                                            Generate Image
                                        </>
                                    )}
                                </Button>

                                <p className="text-center text-xs text-muted-foreground">
                                    {!isPro ? "3 free generations left" : "Unlimited generations"}
                                </p>
                            </div>
                        </div>

                        {/* Right Column: Preview/Result */}
                        <div className="lg:col-span-8">
                            <div className="bg-card border border-border rounded-xl p-2 h-full min-h-[500px] flex items-center justify-center relative overflow-hidden group">
                                {isGenerating ? (
                                    <div className="text-center space-y-4">
                                        <div className="relative w-16 h-16 mx-auto">
                                            <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
                                            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                                        </div>
                                        <p className="text-lg text-muted-foreground animate-pulse font-light">Dreaming up your image...</p>
                                    </div>
                                ) : generatedImage ? (
                                    <div className="relative w-full h-full rounded-lg overflow-hidden group/image">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={generatedImage}
                                            alt="Generated AI Art"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                            <Button variant="secondary" size="lg" className="rounded-full">
                                                <Download className="w-5 h-5 mr-2" /> Download
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center text-muted-foreground max-w-sm">
                                        <div className="w-20 h-20 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <ImageIcon className="w-10 h-10 opacity-40" />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2">Ready to create</h3>
                                        <p>Enter a prompt in the sidebar to start generating amazing visuals.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
