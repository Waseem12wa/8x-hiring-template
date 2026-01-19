"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useSubscription } from "@/contexts/subscription-context"
import { Loader2, Video, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

export default function VideoGenerationPage() {
    const { user, isLoading } = useAuth()
    const { isPro } = useSubscription()
    const router = useRouter()

    const [prompt, setPrompt] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)

    // Redirect if not authenticated (simple client-side check)
    if (!isLoading && !user) {
        router.push("/auth/login?returnUrl=/tools/video-generation")
        return null
    }

    const handleGenerate = async () => {
        if (!prompt) return
        setIsGenerating(true)

        // Simulate generation
        await new Promise(resolve => setTimeout(resolve, 3000))

        setIsGenerating(false)
    }

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <div className="container mx-auto px-6 py-8">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500">
                            <Video className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">Video Generation</h1>
                            <p className="text-muted-foreground">Turn your text prompts into stunning videos.</p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column: Controls */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium flex justify-between">
                                        Model
                                        {!isPro && <span className="text-xs text-indigo-500 font-normal">Pro</span>}
                                    </label>
                                    <div className="grid grid-cols-2 gap-2 p-1 bg-secondary rounded-lg relative">
                                        {!isPro && <div className="absolute inset-0 bg-background/50 z-10 cursor-not-allowed" />}
                                        <button className="px-3 py-2 text-sm font-medium bg-background shadow rounded-md">Veo 3.1</button>
                                        <button className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">Sora 2</button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Aspect Ratio</label>
                                    <div className="grid grid-cols-2 gap-2 p-1 bg-secondary rounded-lg">
                                        <button className="px-3 py-2 text-sm font-medium bg-background shadow rounded-md">16:9</button>
                                        <button className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">9:16</button>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-border">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Remove Watermark</span>
                                        {!isPro ? (
                                            <span className="text-xs bg-indigo-500/10 text-indigo-500 px-2 py-0.5 rounded border border-indigo-500/20">Pro Only</span>
                                        ) : (
                                            <input type="checkbox" className="toggle" defaultChecked />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Prompt & Preview */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                                <label className="text-sm font-medium">Prompt</label>
                                <Textarea
                                    placeholder="Describe the video you want to generate... e.g., A cinematic drone shot of a futuristic city at sunset, cyberpunk style."
                                    className="min-h-[120px] resize-none text-base p-4"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                />

                                <div className="flex justify-between items-center pt-2">
                                    <p className="text-xs text-muted-foreground">
                                        {!isPro ? "5 free generations remaining today" : "Unlimited generations active"}
                                    </p>
                                    <Button
                                        onClick={handleGenerate}
                                        disabled={!prompt || isGenerating}
                                        className="px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border-0"
                                    >
                                        {isGenerating ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Generating...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="w-4 h-4 mr-2" />
                                                Generate Video
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>

                            {/* Preview Area */}
                            <div className="aspect-video bg-black/5 rounded-xl border-2 border-dashed border-border flex items-center justify-center relative overflow-hidden group">
                                {isGenerating ? (
                                    <div className="text-center space-y-3">
                                        <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto" />
                                        <p className="text-muted-foreground animate-pulse">Creating masterpiece...</p>
                                    </div>
                                ) : (
                                    <div className="text-center text-muted-foreground">
                                        <Video className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                        <p>Your generated video will appear here</p>
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
