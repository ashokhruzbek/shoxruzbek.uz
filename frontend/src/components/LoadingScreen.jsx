"use client"
import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 2
      })
    }, 60)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 bg-[#0A1334] flex items-center justify-center z-50">
      <div className="text-center">
        <div className="mb-8">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-[#2D4356] rounded-full"></div>
            <div
              className="absolute inset-0 border-4 border-[#89AAC3] rounded-full border-t-transparent animate-spin"
              style={{ animationDuration: "1s" }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-[#89AAC3] rounded-full animate-pulse"></div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white font-inter mb-2">Shoxruzbek</h2>
          <p className="text-[#89AAC3] font-poppins">Loading...</p>
        </div>
        <div className="w-64 bg-[#2D4356] rounded-full h-2 mx-auto">
          <div
            className="bg-[#89AAC3] h-2 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-[#89AAC3] mt-4 font-mono text-sm">{progress}%</p>
      </div>
    </div>
  )
}
