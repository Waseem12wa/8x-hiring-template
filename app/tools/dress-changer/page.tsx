"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Shirt, Upload, X, Loader2, Sparkles, AlertCircle } from "lucide-react"
import { useState, useRef } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useSubscription } from "@/contexts/subscription-context"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function DressChangerPage() {
    const { user, isLoading } = useAuth()
    const { isPro } = useSubscription()
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [result, setResult] = useState<string | null>(null)

    if (!isLoading && !user) {
        router.push("/auth/login?returnUrl=/tools/dress-changer")
        return null
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            handleFileSelect(selectedFile)
        }
    }

    const handleFileSelect = (selectedFile: File) => {
        if (!selectedFile.type.startsWith('image/')) {
            toast.error("Please upload an image file")
            return
        }

        // Size limit check (e.g. 5MB)
        if (selectedFile.size > 5 * 1024 * 1024) {
            toast.error("File size must be less than 5MB")
            return
        }

        setFile(selectedFile)
        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)
        setResult(null)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        const droppedFile = e.dataTransfer.files?.[0]
        if (droppedFile) {
            handleFileSelect(droppedFile)
        }
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const clearFile = () => {
        setFile(null)
        setPreview(null)
        setResult(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const handleProcess = async () => {
        if (!file) return
        setIsProcessing(true)

        try {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                const base64 = reader.result as string;

                const { editImage } = await import("@/app/actions/ai")
                const response = await editImage(base64, "Change to an elegant high-fashion outfit", "clothing")

                if (response.success) {
                    setResult(response.url)
                    toast.success(`Processed using ${response.model}`)
                    if (response.note) {
                        toast.info(response.note, { duration: 5000 })
                    }
                } else {
                    toast.error("Failed to process image")
                    console.error(response.error)
                }
                setIsProcessing(false)
            };
            reader.onerror = () => {
                toast.error("Failed to read file")
                setIsProcessing(false)
            }
        } catch (error) {
            console.error(error)
            toast.error("Something went wrong")
            setIsProcessing(false)
        }
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navigation />
            <div className="container mx-auto px-6 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
                            <Shirt className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">AI Dress Changer</h1>
                            <p className="text-muted-foreground">Upload a photo to virtually change outfits.</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Upload Section */}
                        <div className="space-y-6">
                            <div
                                className={`border-2 border-dashed rounded-xl p-8 transition-colors text-center ${preview ? 'border-primary/50 bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-secondary/50'}`}
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />

                                {preview ? (
                                    <div className="relative aspect-[3/4] w-full max-w-xs mx-auto rounded-lg overflow-hidden shadow-lg group">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={preview} alt="Upload preview" className="w-full h-full object-cover" />
                                        <button
                                            onClick={(e) => { e.stopPropagation(); clearFile(); }}
                                            className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-destructive transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div
                                        className="py-12 cursor-pointer flex flex-col items-center gap-4"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                                            <Upload className="w-8 h-8 text-muted-foreground" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-medium text-lg">Click or drag image here</p>
                                            <p className="text-sm text-muted-foreground">Supports JPG, PNG (Max 5MB)</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Button
                                className="w-full h-12 text-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                                size="lg"
                                disabled={!file || isProcessing}
                                onClick={handleProcess}
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-5 h-5 mr-2" />
                                        Generate New Outfit
                                    </>
                                )}
                            </Button>

                            {!isPro && (
                                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 flex items-start gap-3 text-sm text-amber-600 dark:text-amber-400">
                                    <AlertCircle className="w-5 h-5 shrink-0" />
                                    <p>Free plan users get lower resolution outputs. Upgrade to Pro for HD quality.</p>
                                </div>
                            )}
                        </div>

                        {/* Result Section */}
                        <div className="bg-card border border-border rounded-xl p-6 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden">
                            {isProcessing ? (
                                <div className="text-center space-y-4 relative z-10">
                                    <div className="relative w-20 h-20 mx-auto">
                                        <div className="absolute inset-0 rounded-full border-4 border-purple-500/20"></div>
                                        <div className="absolute inset-0 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
                                    </div>
                                    <h3 className="text-xl font-medium animate-pulse">Designing outfit...</h3>
                                    <p className="text-muted-foreground">Using AI to tailor the perfect look.</p>
                                </div>
                            ) : result ? (
                                <div className="relative w-full h-full rounded-lg overflow-hidden shadow-xl animate-in fade-in duration-700">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={result} alt="Result" className="w-full h-full object-cover" />
                                    <div className="absolute bottom-4 right-4">
                                        <Button size="sm" variant="secondary">Download</Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center text-muted-foreground max-w-xs">
                                    <Shirt className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                    <p>Your generated output will appear here after processing.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
