"use client"
import { LocationTable } from "@/components/ui/location-table"

export default function LocaisPage() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Header será incluído pelo layout */}
      
      <main className="flex-1 p-4 space-y-4 overflow-x-hidden">
        <div>
          <LocationTable/>
        </div>
      </main>
    </div>
  )
}