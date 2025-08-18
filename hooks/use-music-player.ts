"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export interface Track {
  id: string;
  title: string;
  duration: string;
  album: string;
  artist: string;
  audioUrl: string;
  coverImage: string;
}

export function useMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const tracks: Track[] = [
    {
      id: "Album-Intro-Master-9",
      title: "Album Intro-Master 9",
      duration: "06:44",
      album: "Restoring the Ancient Ruins Vol.1 Father of Lights",
      artist: "OKAMA",
      audioUrl: "/audio/intro.mp3",
      coverImage: "/images/ancient-ruin.avif.jpg",
    },
    {
      id: "Father-of-Lights-Master-9",
      title: "Father of Lights Master 9",
      duration: "05:58",
      album: "Restoring the Ancient Ruins Vol.1 Father of Lights",
      artist: "OKAMA",
      audioUrl: "/audio/father.mp3",
      coverImage: "/images/ancient-ruin.avif.jpg",
    },
    {
      id: "Yahweh-master",
      title: "Yahweh Master",
      duration: "07:21",
      album: "Restoring the Ancient Ruins Vol.1 Father of Lights",
      artist: "OKAMA",
      audioUrl: "/audio/yahweh.mp3",
      coverImage: "/images/ancient-ruin.avif.jpg",
    },
    {
      id: "You-Are-He-Master-9",
      title: "You Are He-Master 9",
      duration: "05:01",
      album: "Restoring the Ancient Ruins Vol.1 Father of Lights",
      artist: "OKAMA",
      audioUrl: "/audio/master.mp3",
      coverImage: "/images/ancient-ruin.avif.jpg",
    },
    {
      id: "Beautiful-Mountain-Master-10",
      title: "Beautiful Mountain-Master 10",
      duration: "08:02",
      album: "Restoring the Ancient Ruins Vol.1 Father of Lights",
      artist: "OKAMA",
      audioUrl: "/audio/beautiful.mp3",
      coverImage: "/images/ancient-ruin.avif.jpg",
    },
    {
      id: "Set Me As A Seal-Master 9",
      title: "Set Me As A Seal-Master 9",
      duration: "04:53",
      album: "Restoring the Ancient Ruins Vol.1 Father of Lights",
      artist: "OKAMA",
      audioUrl: "/audio/set-me.mp3",
      coverImage: "/images/ancient-ruin.avif.jpg",
    },
    {
      id: "This Too Will Pass-Master 9",
      title: "This Too Will Pass-Master 9",
      duration: "05:35",
      album: "Restoring the Ancient Ruins Vol.1 Father of Lights",
      artist: "OKAMA",
      audioUrl: "/audio/pass.mp3",
      coverImage: "/images/ancient-ruin.avif.jpg",
    },
  ];

  // Initialize audio element
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio();
      audioRef.current.volume = volume;
      audioRef.current.preload = "metadata"; // Only load metadata initially

      const audio = audioRef.current;

      const handleLoadStart = () => setIsLoading(true);
      const handleCanPlay = () => setIsLoading(false);
      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
        setIsLoading(false);
      };
      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
      };
      const handleEnded = () => {
        nextTrack();
      };
      const handleError = (e: Event) => {
        setIsLoading(false);
        console.error("Audio loading error:", e);
        // You can add toast notification here for user feedback
      };

      audio.addEventListener("loadstart", handleLoadStart);
      audio.addEventListener("canplay", handleCanPlay);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("ended", handleEnded);
      audio.addEventListener("error", handleError);

      return () => {
        audio.removeEventListener("loadstart", handleLoadStart);
        audio.removeEventListener("canplay", handleCanPlay);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("error", handleError);
        audio.pause();
        audio.src = "";
      };
    }
  }, []);

  // Load track when currentTrack changes
  useEffect(() => {
    if (audioRef.current && tracks[currentTrack]) {
      const wasPlaying = isPlaying;
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);

      audioRef.current.src = tracks[currentTrack].audioUrl;
      audioRef.current.load();

      if (wasPlaying) {
        // Wait a bit for the audio to load before trying to play
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.error("Playback failed:", error);
              setIsPlaying(false);
            });
        }
      }
    }
  }, [currentTrack]);

  // Update volume when volume state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = useCallback(async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error("Playback error:", error);
      setIsPlaying(false);
      // You can add user notification here
    }
  }, [isPlaying]);

  const nextTrack = useCallback(() => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  }, [tracks.length]);

  const previousTrack = useCallback(() => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
  }, [tracks.length]);

  const seekTo = useCallback(
    (time: number) => {
      if (audioRef.current && !isNaN(time)) {
        audioRef.current.currentTime = Math.max(0, Math.min(time, duration));
      }
    },
    [duration]
  );

  const setVolumeLevel = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolume(clampedVolume);
  }, []);

  const playTrack = useCallback(
    (trackIndex: number) => {
      if (trackIndex >= 0 && trackIndex < tracks.length) {
        setCurrentTrack(trackIndex);
      }
    },
    [tracks.length]
  );

  const formatTime = (time: number): string => {
    if (isNaN(time) || time < 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return {
    // State
    isPlaying,
    currentTrack,
    currentTime,
    duration,
    volume,
    isLoading,
    tracks,

    // Actions
    togglePlay,
    nextTrack,
    previousTrack,
    setCurrentTrack: playTrack,
    seekTo,
    setVolume: setVolumeLevel,

    // Utilities
    formatTime,
    currentTrackData: tracks[currentTrack],
    progress: duration > 0 ? (currentTime / duration) * 100 : 0,
  };
}
