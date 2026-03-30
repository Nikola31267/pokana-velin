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
      {/* <PhotoGallery refreshKey={refreshKey} /> */}
    </main>
  )
}
