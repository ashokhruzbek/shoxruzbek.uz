import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, Code, Globe } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [language, setLanguage] = useState("EN")
  const location = useLocation()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleLanguage = () => setLanguage(language === "EN" ? "UZ" : "EN")

  const navItems = [
    { name: "About", path: "/about" },
    { name: "Skills", path: "/skills" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-50 text-slate-800 border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-500 shadow-md">
              <Code className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
              Shokhruzbek.uz
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative text-sm font-medium px-4 py-2 rounded-md transition duration-300 group ${
                  isActive(item.path)
                    ? "text-blue-600"
                    : "text-slate-800 hover:text-blue-600"
                }`}
              >
                {item.name}
                <span
                  className={`absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-blue-600 to-purple-500 rounded-full transition-all duration-300 ${
                    isActive(item.path)
                      ? "w-full -translate-x-1/2"
                      : "w-0 group-hover:w-full -translate-x-1/2"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center space-x-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-emerald-100 text-emerald-400 hover:bg-emerald-200 transition"
            >
              <Globe className="h-4 w-4" />
              <span>{language}</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <nav className="flex flex-col space-y-2 pt-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 rounded-md text-sm font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-800 hover:text-blue-600 hover:bg-slate-100"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
