"use client"

import { useState } from "react"
import useSWR from "swr"
import { Images, X } from "lucide-react"

interface Photo {
  url: string
  uploadedAt: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function PhotoGallery({ refreshKey }: { refreshKey: number }) {
  const { data, isLoading } = useSWR<{ photos: Photo[] }>(
    `/api/photos?refresh=${refreshKey}`,
    fetcher,
    { refreshInterval: 0 }
  )
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

  const photos = data?.photos || []

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
              <Images className="w-4 h-4" />
              <span>Photo Gallery</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Prom Memories
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-muted rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (photos.length === 0) {
    return (
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
              <Images className="w-4 h-4" />
              <span>Photo Gallery</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Prom Memories
            </h2>
            <p className="text-muted-foreground">
              No photos yet. Be the first to share a memory!
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            <Images className="w-4 h-4" />
            <span>Photo Gallery</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Prom Memories
          </h2>
          <p className="text-muted-foreground">
            {photos.length} {photos.length === 1 ? "photo" : "photos"} shared
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <button
              key={photo.url}
              onClick={() => setSelectedPhoto(photo.url)}
              className="group relative aspect-square rounded-xl overflow-hidden bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <img
                src={photo.url}
                alt={`Prom photo ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 w-10 h-10 bg-background/20 text-background rounded-full flex items-center justify-center hover:bg-background/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={selectedPhoto}
            alt="Full size prom photo"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}

