import VideoUploadGuide from "@/components/admin/video-upload-guide"

export default function VideoAdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Video Management</h1>
          <p className="text-gray-600">Manage your video showcase content</p>
        </div>

        <VideoUploadGuide />
      </div>
    </div>
  )
}
