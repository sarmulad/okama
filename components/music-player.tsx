"use client";

import { motion } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Music,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { useMusicPlayer } from "@/hooks/use-music-player";

export default function MusicPlayer() {
  const {
    isPlaying,
    currentTrack,
    currentTime,
    duration,
    volume,
    isLoading,
    tracks,
    togglePlay,
    nextTrack,
    previousTrack,
    setCurrentTrack,
    seekTo,
    setVolume,
    formatTime,
    currentTrackData,
    progress,
  } = useMusicPlayer();

  const handleProgressChange = (value: number[]) => {
    const newTime = (value[0] / 100) * duration;
    seekTo(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0] / 100);
  };

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
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Now Playing</h3>
          <Badge
            variant="outline"
            className="border-pink-500 text-pink-500 bg-transparent"
          >
            {currentTrackData?.album || "Sacred Winds Album"}
          </Badge>
        </div>

        {/* Current Track Info */}
        {currentTrackData && (
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src={currentTrackData.coverImage || "/placeholder.svg"}
                alt={currentTrackData.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  target.nextElementSibling?.classList.remove("hidden");
                }}
              />
              <Music size={24} className="text-white hidden" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-white">
                {currentTrackData.title}
              </h4>
              <p className="text-gray-400">
                {currentTrackData.artist} • {currentTrackData.album}
              </p>
            </div>
          </div>
        )}

        <div className="mb-4">
          <Slider
            value={[progress]}
            onValueChange={handleProgressChange}
            max={100}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-400 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-amber-600/20"
            onClick={previousTrack}
          >
            <SkipBack size={20} />
          </Button>

          <Button
            onClick={togglePlay}
            disabled={isLoading}
            className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 w-12 h-12 rounded-full"
          >
            {isLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : isPlaying ? (
              <Pause size={20} />
            ) : (
              <Play size={20} />
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-amber-600/20"
            onClick={nextTrack}
          >
            <SkipForward size={20} />
          </Button>

          {/* Volume Control */}
          <div className="flex items-center space-x-2 ml-8">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-amber-600/20"
              onClick={() => setVolume(volume > 0 ? 0 : 0.7)}
            >
              {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </Button>
            <div className="w-20">
              <Slider
                value={[volume * 100]}
                onValueChange={handleVolumeChange}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Track List */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-400 mb-3">PLAYLIST</h4>
          {tracks.slice(0, 5).map((track, index) => (
            <div
              key={track.id}
              className={`flex items-center justify-between p-3 rounded cursor-pointer hover:bg-amber-600/20 transition-colors ${
                index === currentTrack ? "bg-amber-600/20 text-pink-500" : ""
              }`}
              onClick={() => setCurrentTrack(index)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-pink-600 rounded flex items-center justify-center text-xs font-bold">
                  {index === currentTrack && isPlaying ? (
                    <div className="flex space-x-0.5">
                      <div className="w-0.5 h-4 bg-white animate-pulse" />
                      <div
                        className="w-0.5 h-4 bg-white animate-pulse"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-0.5 h-4 bg-white animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  ) : (
                    <Music size={16} />
                  )}
                </div>
                <div>
                  <p className="font-medium">{track.title}</p>
                  <p className="text-sm text-gray-400">{track.album}</p>
                </div>
              </div>
              <span className="text-gray-400 text-sm">{track.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
