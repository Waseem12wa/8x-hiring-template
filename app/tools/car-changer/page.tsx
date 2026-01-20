"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Car, Upload, X, Loader2, Sparkles, AlertCircle } from "lucide-react"
import { useState, useRef } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useSubscription } from "@/contexts/subscription-context"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function CarChangerPage() {
    const { user, isLoading } = useAuth()
    const { isPro } = useSubscription()
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [result, setResult] = useState<string | null>(null)
    const [selectedCar, setSelectedCar] = useState("tesla-model-s")

    const carModels = [
        { id: "tesla-model-s", name: "Tesla Model S" },
        { id: "porsche-911", name: "Porsche 911" },
        { id: "lamborghini-huracan", name: "Lamborghini Huracán" },
        { id: "mercedes-amg-gt", name: "Mercedes-AMG GT" },
        { id: "bmw-m4", name: "BMW M4" },
    ]

    if (!isLoading && !user) {
        router.push("/auth/login?returnUrl=/tools/car-changer")
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

        // Mock processing delay
        await new Promise(resolve => setTimeout(resolve, 4000))

        // Return a mock result (random car image)
        setResult(`https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=800&auto=format&fit=crop&random=${Date.now()}`)

        setIsProcessing(false)
        toast.success("Car replaced successfully!")
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navigation />
            <div className="container mx-auto px-6 py-8">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                            <Car className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">AI Car Changer</h1>
                            <p className="text-muted-foreground">Replace cars in photos with different models using AI.</p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Upload Section */}
                        <div className="lg:col-span-1 space-y-6">
                            <div
                                className={`border-2 border-dashed rounded-xl p-6 transition-colors text-center ${preview ? 'border-primary/50 bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-secondary/50'}`}
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
                                    <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg group">
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

                            {/* Car Model Selector */}
                            <div className="bg-card border border-border rounded-xl p-4 space-y-3">
                                <label className="text-sm font-medium">Select Car Model</label>
                                <select
                                    value={selectedCar}
                                    onChange={(e) => setSelectedCar(e.target.value)}
                                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    {carModels.map(car => (
                                        <option key={car.id} value={car.id}>{car.name}</option>
                                    ))}
                                </select>
                            </div>

                            <Button
                                className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
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
                                        Replace Car
                                    </>
                                )}
                            </Button>

                            {!isPro && (
                                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 flex items-start gap-3 text-sm text-amber-600 dark:text-amber-400">
                                    <AlertCircle className="w-5 h-5 shrink-0" />
                                    <p>Upgrade to Pro for premium car models and 4K resolution.</p>
                                </div>
                            )}
                        </div>

                        {/* Result Section */}
                        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden">
                            {isProcessing ? (
                                <div className="text-center space-y-4 relative z-10">
                                    <div className="relative w-20 h-20 mx-auto">
                                        <div className="absolute inset-0 rounded-full border-4 border-blue-500/20"></div>
                                        <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
                                    </div>
                                    <h3 className="text-xl font-medium animate-pulse">Replacing car...</h3>
                                    <p className="text-muted-foreground">AI is analyzing the scene and generating the new vehicle.</p>
                                </div>
                            ) : result ? (
                                <div className="relative w-full h-full rounded-lg overflow-hidden shadow-xl animate-in fade-in duration-700">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={result} alt="Result" className="w-full h-full object-cover" />
                                    <div className="absolute bottom-4 right-4 flex gap-2">
                                        <Button size="sm" variant="secondary">Download</Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center text-muted-foreground max-w-xs">
                                    <Car className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                    <p>Upload an image and select a car model to see the AI-generated result.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
