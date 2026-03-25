"use client"

import { useState } from "react"
import { HeroSection } from "@/components/hero-section"
import { PhotoUpload } from "@/components/photo-upload"
import { PhotoGallery } from "@/components/photo-gallery"
import { Heart } from "lucide-react"

export default function PromInvitePage() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleUploadComplete = () => {
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <main className="min-h-screen bg-background">
      <HeroSection />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="h-px bg-border" />
      </div>

      <PhotoUpload onUploadComplete={handleUploadComplete} />

      <PhotoGallery refreshKey={refreshKey} />

      {/* Footer */}
      <footer className="py-8 px-4 text-center">
        <p className="text-muted-foreground text-sm flex items-center justify-center gap-1">
          Made with <Heart className="w-4 h-4 text-primary fill-primary" /> for Prom 2026
        </p>
      </footer>
    </main>
  )
}

