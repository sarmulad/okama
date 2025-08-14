import MusicUploadGuide from "@/components/music-upload-guide"
import MusicManager from "@/components/admin/music-manager"

export default function MusicAdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-amber-500 bg-clip-text text-transparent mb-4">
            Music Management
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Learn how to add your own music to the OKAMA website and manage your music library.
          </p>
        </div>

        <div className="space-y-8">
          <MusicUploadGuide />
          <MusicManager />
        </div>
      </div>
    </div>
  )
}
