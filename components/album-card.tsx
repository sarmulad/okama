"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useMusicPlayer } from "@/hooks/use-music-player";

interface AlbumCardProps {
  album: {
    title: string;
    year: string;
    image: string;
  };
  index: number;
}

export default function AlbumCard({ album, index }: AlbumCardProps) {
  const { tracks, setCurrentTrack, togglePlay, isPlaying, currentTrackData } =
    useMusicPlayer();

  const handlePlayAlbum = () => {
    // Find the first track from this album
    const albumTrackIndex = tracks.findIndex(
      (track) => track.album === album.title
    );
    if (albumTrackIndex !== -1) {
      setCurrentTrack(albumTrackIndex);
      if (!isPlaying || currentTrackData?.album !== album.title) {
        // Small delay to ensure track is loaded before playing
        setTimeout(() => {
          togglePlay();
        }, 100);
      }
    }
  };

  const isCurrentAlbumPlaying =
    isPlaying && currentTrackData?.album === album.title;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      whileHover={{ scale: 1.05 }}
      className="group cursor-pointer relative"
    >
      <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-amber-600/30 overflow-hidden relative z-10">
        <div className="relative">
          <img
            src={album.image || "/placeholder.svg?height=400&width=400"}
            alt={album.title}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {isCurrentAlbumPlaying && (
            <div className="absolute top-4 right-4 bg-pink-500 rounded-full p-2">
              <div className="flex space-x-0.5">
                <div className="w-1 h-4 bg-white animate-pulse" />
                <div
                  className="w-1 h-4 bg-white animate-pulse"
                  style={{ animationDelay: "0.1s" }}
                />
                <div
                  className="w-1 h-4 bg-white animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
            </div>
          )}
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-2">{album.title}</h3>
          <p className="text-gray-400">{album.year}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
