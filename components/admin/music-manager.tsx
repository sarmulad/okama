"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, Upload, Music, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useMusicPlayer } from "@/hooks/use-music-player"

export default function MusicManager() {
  const { tracks } = useMusicPlayer()
  const [isAddingTrack, setIsAddingTrack] = useState(false)
  const [newTrack, setNewTrack] = useState({
    title: "",
    artist: "OKAMA",
    album: "",
    duration: "",
    audioUrl: "",
    coverImage: "",
  })

  const handleAddTrack = () => {
    // In a real app, this would save to a database or file
    console.log("Adding new track:", newTrack)
    setIsAddingTrack(false)
    setNewTrack({
      title: "",
      artist: "OKAMA",
      album: "",
      duration: "",
      audioUrl: "",
      coverImage: "",
    })
  }

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
          <h3 className="text-2xl font-bold">Music Library Manager</h3>
          <Button
            onClick={() => setIsAddingTrack(true)}
            className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
          >
            <Plus size={16} className="mr-2" />
            Add Track
          </Button>
        </div>

        {/* Add New Track Form */}
        {isAddingTrack && (
          <Card className="bg-gray-800/50 border-amber-600/20 mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Music className="w-5 h-5 text-pink-500" />
                Add New Track
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Track Title</Label>
                  <Input
                    id="title"
                    value={newTrack.title}
                    onChange={(e) => setNewTrack({ ...newTrack, title: e.target.value })}
                    placeholder="Enter track title"
                    className="bg-gray-900 border-gray-700"
                  />
                </div>
                <div>
                  <Label htmlFor="album">Album</Label>
                  <Input
                    id="album"
                    value={newTrack.album}
                    onChange={(e) => setNewTrack({ ...newTrack, album: e.target.value })}
                    placeholder="Enter album name"
                    className="bg-gray-900 border-gray-700"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={newTrack.duration}
                    onChange={(e) => setNewTrack({ ...newTrack, duration: e.target.value })}
                    placeholder="e.g., 3:45"
                    className="bg-gray-900 border-gray-700"
                  />
                </div>
                <div>
                  <Label htmlFor="artist">Artist</Label>
                  <Input
                    id="artist"
                    value={newTrack.artist}
                    onChange={(e) => setNewTrack({ ...newTrack, artist: e.target.value })}
                    placeholder="Artist name"
                    className="bg-gray-900 border-gray-700"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="audioUrl">Audio File Path</Label>
                <Input
                  id="audioUrl"
                  value={newTrack.audioUrl}
                  onChange={(e) => setNewTrack({ ...newTrack, audioUrl: e.target.value })}
                  placeholder="/audio/your-song.mp3"
                  className="bg-gray-900 border-gray-700"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Upload your MP3 file to public/audio/ first, then enter the path here
                </p>
              </div>
              <div>
                <Label htmlFor="coverImage">Cover Image Path</Label>
                <Input
                  id="coverImage"
                  value={newTrack.coverImage}
                  onChange={(e) => setNewTrack({ ...newTrack, coverImage: e.target.value })}
                  placeholder="/images/album-cover.jpg"
                  className="bg-gray-900 border-gray-700"
                />
              </div>
              <div className="flex gap-3">
                <Button onClick={handleAddTrack} className="bg-green-600 hover:bg-green-700">
                  <Save size={16} className="mr-2" />
                  Save Track
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsAddingTrack(false)}
                  className="border-gray-600 text-gray-300"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Current Tracks */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-gray-300 mb-4">Current Tracks ({tracks.length})</h4>
          {tracks.map((track, index) => (
            <Card key={track.id} className="bg-gray-800/30 border-amber-600/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
                      <Music size={20} />
                    </div>
                    <div>
                      <h5 className="font-semibold text-white">{track.title}</h5>
                      <p className="text-sm text-gray-400">
                        {track.artist} • {track.album} • {track.duration}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{track.audioUrl}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      Track {index + 1}
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <Edit size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Instructions */}
        <Card className="bg-gray-800/30 border-amber-600/20 mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-lg">
              <Upload className="w-5 h-5 text-amber-500" />
              Quick Setup Instructions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-300">
            <p>
              1. Upload your MP3 files to the <code className="bg-gray-900 px-2 py-1 rounded">public/audio/</code>{" "}
              folder
            </p>
            <p>
              2. Upload album artwork to the <code className="bg-gray-900 px-2 py-1 rounded">public/images/</code>{" "}
              folder
            </p>
            <p>3. Use the form above to add track information</p>
            <p>4. The music player will automatically detect and play your new tracks</p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
