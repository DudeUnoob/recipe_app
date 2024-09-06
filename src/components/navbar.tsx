'use client'

import * as React from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const NavItems = () => (
    <>
      <Link href="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
        Home
      </Link>
      <Link href="/recipes" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
        Recipes
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="p-0 font-medium text-gray-700 hover:text-gray-900">
            Categories <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href="/categories/breakfast">Breakfast</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/categories/lunch">Lunch</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/categories/dinner">Dinner</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Link href="/about" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
        About
      </Link>
    </>
  )

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-900">RecipeNotes</span>
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <NavItems />
          </div>
          <div className="flex items-center sm:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open main menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:hidden">
                <nav className="mt-5 px-2 space-y-1">
                  <NavItems />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Button variant="default">Sign In</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}