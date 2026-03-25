'use client'

import { useState } from 'react'
import { ZoomIn, ZoomOut, Download, Maximize2 } from 'lucide-react'

interface DiagramBlockProps {
  title?: string
  description?: string
  imageUrl?: string
  altText?: string
}

export function DiagramBlock({ 
  title = "Algorithm Visualization", 
  description = "Interactive diagram to help understand the algorithm flow",
  imageUrl = "/api/placeholder/600/400",
  altText = "Algorithm diagram"
}: DiagramBlockProps) {
  const [zoom, setZoom] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5))
  }

  const handleResetZoom = () => {
    setZoom(1)
  }

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleDownload = () => {
    // In a real app, this would download the actual diagram
    const link = document.createElement('a')
    link.href = imageUrl
    link.download = 'diagram.png'
    link.click()
  }

  return (
    <div className={`
      border border-gray-300 rounded-lg overflow-hidden bg-white
      ${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''}
    `}>
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-300 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {description && (
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            )}
          </div>
          
          {/* Control buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4 text-gray-600" />
            </button>
            <span className="text-sm text-gray-600 min-w-[3rem] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={handleResetZoom}
              className="px-2 py-1 text-sm hover:bg-gray-200 rounded transition-colors"
            >
              Reset
            </button>
            <div className="w-px h-6 bg-gray-300" />
            <button
              onClick={handleDownload}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
              title="Download"
            >
              <Download className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={handleFullscreen}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
              title="Toggle Fullscreen"
            >
              <Maximize2 className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Diagram content */}
      <div className="relative overflow-auto bg-gray-50" style={{ height: isFullscreen ? 'calc(100vh - 80px)' : '400px' }}>
        <div className="flex items-center justify-center min-h-full p-8">
          <div 
            className="transition-transform duration-200 ease-in-out"
            style={{ transform: `scale(${zoom})` }}
          >
            {/* Placeholder for diagram */}
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="w-96 h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 font-medium">Algorithm Flowchart</p>
                  <p className="text-sm text-gray-500 mt-2">Interactive diagram will be displayed here</p>
                </div>
              </div>
              
              {/* Sample flowchart elements */}
              <div className="flex justify-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Start</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-gray-600">Process</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-500 transform rotate-45"></div>
                  <span className="text-gray-600">Decision</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="text-gray-600">End</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer with additional info */}
      <div className="bg-gray-50 border-t border-gray-300 px-4 py-2">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <span>Click and drag to pan • Scroll to zoom</span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="hover:text-gray-900 transition-colors">Edit Diagram</button>
            <span>•</span>
            <button className="hover:text-gray-900 transition-colors">Export</button>
          </div>
        </div>
      </div>
    </div>
  )
}
