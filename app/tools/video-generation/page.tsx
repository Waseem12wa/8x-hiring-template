"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState, useRef } from "react" // Added useRef
import { useAuth } from "@/contexts/auth-context"
import { useSubscription } from "@/contexts/subscription-context"
import { Loader2, Video, Sparkles, Upload, X } from "lucide-react" // Added Upload, X 
import { toast } from "sonner" // Added toast
import { useRouter } from "next/navigation"

export default function VideoGenerationPage() {
    const { user, isLoading } = useAuth()
    const { isPro } = useSubscription()
    const router = useRouter()

    const [prompt, setPrompt] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)
    const [sourceType, setSourceType] = useState<"text" | "image">("text")
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Redirect if not authenticated (simple client-side check)
    if (!isLoading && !user) {
        router.push("/auth/login?returnUrl=/tools/video-generation")
        return null
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) handleFileSelect(file)
    }

    const handleFileSelect = (file: File) => {
        if (!file.type.startsWith('image/')) {
            toast.error("Please upload an image file")
            return
        }
        if (file.size > 5 * 1024 * 1024) {
            toast.error("File size must be less than 5MB")
            return
        }
        setSelectedFile(file)
        setPreviewUrl(URL.createObjectURL(file))
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        const file = e.dataTransfer.files?.[0]
        if (file) handleFileSelect(file)
    }

    const clearFile = () => {
        setSelectedFile(null)
        setPreviewUrl(null)
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    const handleGenerate = async () => {
        if (sourceType === "text" && !prompt) return
        if (sourceType === "image" && !selectedFile) return

        setIsGenerating(true)

        // Simulate generation
        await new Promise(resolve => setTimeout(resolve, 3000))

        setIsGenerating(false)
        toast.success("Video generated successfully!")
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
                            <p className="text-muted-foreground">Turn your text prompts or images into stunning videos.</p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column: Controls */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Source Type</label>
                                    <div className="grid grid-cols-2 gap-2 p-1 bg-secondary rounded-lg">
                                        <button
                                            onClick={() => setSourceType("text")}
                                            className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${sourceType === "text" ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                                        >
                                            Text to Video
                                        </button>
                                        <button
                                            onClick={() => setSourceType("image")}
                                            className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${sourceType === "image" ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                                        >
                                            Image to Video
                                        </button>
                                    </div>
                                </div>

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
                                {sourceType === "text" ? (
                                    <>
                                        <label className="text-sm font-medium">Prompt</label>
                                        <Textarea
                                            placeholder="Describe the video you want to generate... e.g., A cinematic drone shot of a futuristic city at sunset, cyberpunk style."
                                            className="min-h-[120px] resize-none text-base p-4"
                                            value={prompt}
                                            onChange={(e) => setPrompt(e.target.value)}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <label className="text-sm font-medium">Upload Source Image</label>
                                        <div
                                            className={`border-2 border-dashed rounded-xl p-6 transition-colors text-center ${previewUrl ? 'border-primary/50 bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-secondary/50'}`}
                                            onDrop={handleDrop}
                                            onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                        >
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />

                                            {previewUrl ? (
                                                <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg group">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={previewUrl} alt="Upload preview" className="w-full h-full object-cover" />
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); clearFile(); }}
                                                        className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-destructive transition-colors"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div
                                                    className="py-8 cursor-pointer flex flex-col items-center gap-3"
                                                    onClick={() => fileInputRef.current?.click()}
                                                >
                                                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                                                        <Upload className="w-6 h-6 text-muted-foreground" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="font-medium">Upload Image</p>
                                                        <p className="text-xs text-muted-foreground">JPG, PNG (Max 5MB)</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}

                                <div className="flex justify-between items-center pt-2">
                                    <p className="text-xs text-muted-foreground">
                                        {!isPro ? "5 free generations remaining today" : "Unlimited generations active"}
                                    </p>
                                    <Button
                                        onClick={handleGenerate}
                                        disabled={isGenerating || (sourceType === "text" ? !prompt : !selectedFile)}
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
