"use client"

import { useState, useCallback } from "react"
import { Upload, ImagePlus, X, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PhotoUploadProps {
  onUploadComplete: () => void
}

export function PhotoUpload({ onUploadComplete }: PhotoUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      selectFile(file)
    } else {
      setError("Please select an image file")
    }
  }, [])

  const selectFile = (file: File) => {
    setSelectedFile(file)
    setError(null)
    setUploadSuccess(false)
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file")
        return
      }
      selectFile(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", selectedFile)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Upload failed")
      }

      setUploadSuccess(true)
      setTimeout(() => {
        setSelectedFile(null)
        setPreview(null)
        setUploadSuccess(false)
        onUploadComplete()
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  const clearSelection = () => {
    setSelectedFile(null)
    setPreview(null)
    setError(null)
    setUploadSuccess(false)
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Качи нашите спомени
          </h2>
          <p className="text-muted-foreground">
            Прикачи любимите ти моменти от бала тук
          </p>
        </div>

        <div
          className={`
            relative border-2 border-dashed rounded-2xl p-8 transition-all duration-200
            ${isDragging ? "border-primary bg-primary/5" : "border-border"}
            ${preview ? "bg-card" : "bg-card/50"}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {preview ? (
            <div className="space-y-4">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
                {!uploading && !uploadSuccess && (
                  <button
                    onClick={clearSelection}
                    className="absolute top-2 right-2 w-8 h-8 bg-foreground/80 text-background rounded-full flex items-center justify-center hover:bg-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                {uploadSuccess && (
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-8 h-8 text-primary-foreground" />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                  {selectedFile?.name}
                </p>
                <Button
                  onClick={handleUpload}
                  // disabled={uploading || uploadSuccess}
                  disabled
                  className="gap-2"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading...
                    </>
                  ) : uploadSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      Uploaded!
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Upload Photo
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <label className="flex flex-col items-center cursor-pointer py-8">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <p className="text-foreground font-medium mb-1">
                Drop your photo here
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG up to 10MB
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                disabled
              />
            </label>
          )}

          {error && (
            <p className="text-destructive text-sm text-center mt-4">{error}</p>
          )}
        </div>
      </div>
    </section>
  )
}

