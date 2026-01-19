import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check, Sparkles, Zap, Shield, Users, Play, ImageIcon, Video, ArrowRight } from "lucide-react"

export default function HomePage() {
  const examples = [
    { type: "video", src: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800&auto=format&fit=crop", label: "AI Video Generation" },
    { type: "image", src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop", label: "Text to Image" },
    { type: "image", src: "https://images.unsplash.com/photo-1614728853925-b463282eb8ac?q=80&w=800&auto=format&fit=crop", label: "Style Transfer" },
    { type: "video", src: "https://images.unsplash.com/photo-1633511130838-51834928b5D6?q=80&w=800&auto=format&fit=crop", label: "Motion Graphics" },
    { type: "image", src: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop", label: "Character Design" },
    { type: "video", src: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=800&auto=format&fit=crop", label: "Product Marketing" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.15),transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border backdrop-blur-sm text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                Next Generation AI Tools
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance leading-tight animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
              Create stunning <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                AI visuals
              </span>{" "}
              in seconds
            </h1>

            <p className="text-xl text-muted-foreground/80 font-light leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              Transform your ideas into reality with our suite of powerful AI generation tools.
              Video, images, and realistic edits at your fingertips.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/25 transition-all hover:scale-105" asChild>
                <Link href="/auth/signup">
                  Start Creating Free <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border/50 bg-background/50 backdrop-blur-sm hover:bg-secondary/50 transition-all hover:scale-105" asChild>
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-secondary/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Possible with AI</h2>
              <p className="text-muted-foreground text-lg">Explore what our users are creating with our advanced models.</p>
            </div>
            <Button variant="ghost" className="group text-primary hover:text-primary/80">
              View all examples <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {examples.map((item, i) => (
              <div
                key={i}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/50 bg-secondary/30 shadow-sm transition-all hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1"
              >
                {/* Placeholder Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${item.src})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80" />

                {/* Play Button Overlay for Videos */}
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white">
                      <Play className="w-8 h-8 fill-current" />
                    </div>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 p-6 w-full text-white">
                  <div className="flex items-center gap-2 mb-2">
                    {item.type === 'video' ? <Video className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
                    <span className="text-xs font-medium uppercase tracking-wider opacity-80">{item.type}</span>
                  </div>
                  <h3 className="font-semibold text-lg">{item.label}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-24">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need</h2>
          <p className="text-muted-foreground text-lg">Comprehensive tools for professional content creation.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: "Lightning Fast", desc: "Generate content in seconds with our optimized inference engine." },
            { icon: Shield, title: "Commercial rights", desc: "You own everything you create. Use it for any project." },
            { icon: Users, title: "Team Collaboration", desc: "Share projects and assets with your team seamlessly." },
          ].map((feature, i) => (
            <div key={i} className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
