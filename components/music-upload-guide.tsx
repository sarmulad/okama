"use client"

import { motion } from "framer-motion"
import { Upload, Music, FolderOpen, Code, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function MusicUploadGuide() {
  const steps = [
    {
      icon: FolderOpen,
      title: "Create Audio Folder",
      description: "Create a folder called 'audio' inside your 'public' directory",
      code: "public/audio/",
      details: "This is where all your music files will be stored and served from.",
    },
    {
      icon: Upload,
      title: "Add Your Music Files",
      description: "Upload your MP3 files to the audio folder",
      code: "public/audio/your-song.mp3",
      details: "Supported formats: MP3, WAV, OGG. MP3 is recommended for best compatibility.",
    },
    {
      icon: Code,
      title: "Update Track List",
      description: "Edit the tracks array in hooks/use-music-player.ts",
      code: `{
  id: "your-song-id",
  title: "Your Song Title",
  duration: "3:45",
  album: "Your Album",
  artist: "OKAMA",
  audioUrl: "/audio/your-song.mp3",
  coverImage: "/images/your-album-art.jpg"
}`,
      details: "Add your song information to the tracks array with the correct file path.",
    },
    {
      icon: Music,
      title: "Add Album Art",
      description: "Upload album artwork to public/images/",
      code: "public/images/album-cover.jpg",
      details: "Recommended size: 500x500px or larger, JPG/PNG format.",
    },
  ]

  const fileStructure = `
public/
├── audio/
│   ├── ancient-echoes.mp3
│   ├── spirit-dance.mp3
│   ├── thunder-prayer.mp3
│   └── your-new-song.mp3
├── images/
│   ├── album-sacred-winds.jpg
│   ├── album-thunder-prayer.jpg
│   └── your-album-art.jpg
└── ...
  `

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-6 border-2 border-amber-600/20 relative overflow-hidden"
    >
      {/* Native Pattern Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(139, 69, 19, 0.2) 20px, rgba(139, 69, 19, 0.2) 40px)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">How to Add Your Own Music</h3>
          <Badge variant="outline" className="border-pink-500 text-pink-500 bg-transparent">
            Developer Guide
          </Badge>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Steps */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <Card key={index} className="bg-gray-800/50 border-amber-600/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center">
                      <step.icon size={16} />
                    </div>
                    <span>{step.title}</span>
                    <Badge variant="outline" className="ml-auto text-xs">
                      Step {index + 1}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-3">{step.description}</p>
                  <div className="bg-gray-900 rounded p-3 mb-2">
                    <code className="text-pink-400 text-sm font-mono whitespace-pre-wrap">{step.code}</code>
                  </div>
                  <p className="text-sm text-gray-400">{step.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* File Structure */}
          <div>
            <Card className="bg-gray-800/50 border-amber-600/20 h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <FolderOpen className="w-5 h-5 text-amber-500" />
                  File Structure Example
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 rounded p-4">
                  <pre className="text-sm text-gray-300 font-mono whitespace-pre">{fileStructure}</pre>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-gray-800/50 border-amber-600/20 mt-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Pro Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm text-gray-300">Use consistent naming: lowercase, hyphens instead of spaces</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm text-gray-300">Optimize audio files: 128-320 kbps MP3 for web streaming</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm text-gray-300">Test locally first: Make sure files load before deploying</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm text-gray-300">Copyright: Only upload music you own or have rights to use</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
