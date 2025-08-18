"use client";

import AlbumCard from "@/components/album-card";
import MusicPlayer from "@/components/music-player";

export default function FeaturedAlbums() {
  const albums = [
    {
      title: "Father of Lights",
      year: "2019",
      image: "/images/wind2.jpg",
    },
    {
      title: "Sacred Fire",
      year: "2016",
      image: "/images/fire.png",
    },
  ];

  return (
    <section
      id="music"
      className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header with Native Styling */}
        <div className="text-center mb-16 relative">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent" />
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent" />

          <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-amber-600/50" />
          <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-amber-600/50" />

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            FEATURE MUSIC ALBUMS
          </h2>
          <p className="text-gray-400 text-lg">
            Sacred sounds that bridge ancient wisdom and modern worship
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {albums.map((album, index) => (
            <AlbumCard key={album.title} album={album} index={index} />
          ))}
        </div>

        <MusicPlayer />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-amber-600/30 to-transparent" />
      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(139, 69, 19, 0.4) 30px, rgba(139, 69, 19, 0.4) 60px)`,
        }}
      />
    </section>
  );
}
