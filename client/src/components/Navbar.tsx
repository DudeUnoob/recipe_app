"use client"

import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { ChefHat, Menu, X } from "lucide-react"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useAuth } from "../contexts/AuthContext"

export default function Navbar() {
  const { user, loading, signOut } = useAuth()

  const [isScrolled, setIsScrolled] = React.useState(false)
  const navigate = useNavigate()

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const NavItems = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
  >((props, ref) => (
    <div ref={ref} className="flex flex-col lg:flex-row lg:items-center lg:space-x-8" {...props}>
      <Link to="/" className="text-gray-700 hover:text-gray-900 py-2 lg:py-0 transition duration-150 ease-in-out">
        Home
      </Link>
      <Link to="/recipes" className="text-gray-700 hover:text-gray-900 py-2 lg:py-0 transition duration-150 ease-in-out">
        Recipes
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="p-0 font-normal text-base hover:bg-transparent">
            Categories
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link to="/categories/breakfast">Breakfast</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/categories/lunch">Lunch</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/categories/dinner">Dinner</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Link to="/about" className="text-gray-700 hover:text-gray-900 py-2 lg:py-0 transition duration-150 ease-in-out">
        About
      </Link>
    </div>
  ))
  NavItems.displayName = "NavItems"

  return (
    <nav className={`w-full fixed top-0 z-50 transition duration-300 ease-in-out ${isScrolled ? 'bg-white shadow-md' : 'bg-white shadow-md'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <ChefHat className={`h-8 w-8 ${isScrolled ? 'text-gray-900' : 'text-gray-900'}`} />
              <span className={`ml-2 text-xl font-bold ${isScrolled ? 'text-gray-900' : 'text-gray-900'}`}>RecipeNotes</span>
            </Link>
          </div>
          <div className="hidden lg:flex lg:items-center">
            <NavItems />
          </div>
          <div className="flex items-center">
            <div className="hidden lg:flex items-center space-x-4">
              {!loading && (
                <>
                  <Button 
                    variant="ghost" 
                    className="text-gray-700 hover:text-gray-900"
                    onClick={() => user ? handleSignOut() : navigate('/login')}
                  >
                    {user ? "Log out" : "Log in"}
                  </Button>
                  {user && (
                    <Button
                      variant="ghost"
                      className="p-0"
                      onClick={() => navigate('/settings')}
                    >
                      <Avatar>
                        <AvatarImage src={user.user_metadata.avatar_url || undefined} alt="User avatar" />
                        <AvatarFallback>{user.email ? user.email[0].toUpperCase() : 'U'}</AvatarFallback>
                      </Avatar>
                    </Button>
                  )}
                </>
              )}
              {!user && !loading && (
                <Button 
                  className="bg-gray-900 text-white hover:bg-gray-800"
                  onClick={() => navigate('/signup')}
                >
                  Sign up
                </Button>
              )}
            </div>
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className={`${isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-gray-700 hover:text-gray-900'}`}>
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open main menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px]">
                  <div className="flex items-center justify-between mb-8">
                    <Link to="/" className="flex items-center">
                      <ChefHat className="h-8 w-8 text-gray-900" />
                      <span className="ml-2 text-xl font-bold text-gray-900">RecipeNotes</span>
                    </Link>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                    </SheetTrigger>
                  </div>
                  <div className="flex flex-col space-y-4">
                    <NavItems />
                    {!loading && (
                      <div className="flex items-center space-x-4">
                        <Button 
                          variant="ghost" 
                          className="justify-start"
                          onClick={() => user ? handleSignOut() : navigate('/login')}
                        >
                          {user ? "Log out" : "Log in"}
                        </Button>
                        {user && (
                          <Button
                            variant="ghost"
                            className="p-0"
                            onClick={() => navigate('/settings')}
                          >
                            <Avatar>
                              <AvatarImage src={user.user_metadata.avatar_url || undefined} alt="User avatar" />
                              <AvatarFallback>{user.email ? user.email[0].toUpperCase() : 'U'}</AvatarFallback>
                            </Avatar>
                          </Button>
                        )}
                      </div>
                    )}
                    {!user && !loading && (
                      <Button 
                        className="justify-start bg-gray-900 text-white hover:bg-gray-800"
                        onClick={() => navigate('/signup')}
                      >
                        Sign up
                      </Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}