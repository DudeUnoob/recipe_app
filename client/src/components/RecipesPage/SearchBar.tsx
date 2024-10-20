import React from "react"
import { Input } from "../ui/input"
import { Search } from "lucide-react"

interface SearchBarProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
}

export function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
  return (
    <div className="flex-1 w-full md:w-auto md:max-w-md relative">
      <Input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
    </div>
  )
}