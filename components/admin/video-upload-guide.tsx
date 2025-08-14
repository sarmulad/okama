"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Video, FileVideo } from "lucide-react"

export default function VideoUploadGuide() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-6 w-6" />
            Video Showcase Setup Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1 */}
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="text-lg font-semibold mb-2">Step 1: Prepare Your Video</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                • <strong>Format:</strong> MP4 (recommended for web compatibility)
              </li>
              <li>
                • <strong>Resolution:</strong> 1920x1080 (Full HD) or higher
              </li>
              <li>
                • <strong>Duration:</strong> 30 seconds to 2 minutes (optimal for web)
              </li>
              <li>
                • <strong>File Size:</strong> Under 50MB for good loading performance
              </li>
              <li>
                • <strong>Aspect Ratio:</strong> 16:9 (landscape) works best
              </li>
            </ul>
          </div>

          {/* Step 2 */}
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="text-lg font-semibold mb-2">Step 2: Add Video to Project</h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm mb-2">Create this folder structure:</p>
              <pre className="text-xs bg-black text-green-400 p-2 rounded">
                {`public/
├── videos/
│   └── okama-showcase.mp4  ← Your video file goes here`}
              </pre>
            </div>
          </div>

          {/* Step 3 */}
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="text-lg font-semibold mb-2">Step 3: Update Component</h3>
            <p className="text-sm text-gray-600 mb-2">
              The video component is already set up to look for{" "}
              <code className="bg-gray-200 px-1 rounded">okama-showcase.mp4</code> in the videos folder.
            </p>
            <p className="text-sm text-gray-600">
              You can also customize the overlay text by editing the{" "}
              <code className="bg-gray-200 px-1 rounded">video-showcase.tsx</code> component.
            </p>
          </div>

          {/* Current Status */}
          <div className="border-l-4 border-yellow-500 pl-4">
            <h3 className="text-lg font-semibold mb-2">Current Status</h3>
            <div className="flex items-center gap-2 text-sm">
              <FileVideo className="h-4 w-4 text-yellow-500" />
              <span>Using placeholder background image until video is uploaded</span>
            </div>
          </div>

          {/* Video Optimization Tips */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Video Optimization Tips:</h4>
            <ul className="text-sm space-y-1">
              <li>• Use H.264 codec for best browser compatibility</li>
              <li>• Compress video to balance quality and file size</li>
              <li>• Consider creating multiple formats (MP4, WebM) for broader support</li>
              <li>• Test on mobile devices for performance</li>
              <li>• Add captions/subtitles for accessibility</li>
            </ul>
          </div>

          {/* Example Code */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Example: Adding Your Video</h4>
            <pre className="text-xs bg-black text-green-400 p-2 rounded overflow-x-auto">
              {`<video
  className="absolute inset-0 w-full h-full object-cover"
  autoPlay
  muted
  loop
  playsInline
>
  <source src="/videos/okama-showcase.mp4" type="video/mp4" />
  <source src="/videos/okama-showcase.webm" type="video/webm" />
  Your browser does not support the video tag.
</video>`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
