"use client"

import  React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Instagram,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Heart,
  Code,
  Coffee,
  MessageCircle,
  Download,
  ExternalLink,
} from "lucide-react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setEmail("")
      }, 3000)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  }

  const socialVariants = {
    hover: {
      scale: 1.2,
      rotate: [0, 10, -10, 0],
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  }

  const waveVariants = {
    animate: {
      x: [0, -1000],
      transition: {
        x: {
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    },
  }

  const socialLinks = [
    {
      icon: <Instagram size={20} />,
      href: "https://instagram.com/a.shokhruzbek",
      label: "Instagram",
      color: "from-pink-500 to-purple-500",
    },
    {
      icon: <Github size={20} />,
      href: "https://github.com/ashokhruzbek",
      label: "GitHub",
      color: "from-gray-700 to-gray-900",
    },
    {
      icon: <Linkedin size={20} />,
      href: "https://linkedin.com/in/shokhruzbek",
      label: "LinkedIn",
      color: "from-blue-600 to-blue-800",
    },
    {
      icon: <MessageCircle size={20} />,
      href: "https://t.me/ashokhruzbek",
      label: "Telegram",
      color: "from-blue-400 to-blue-600",
    },
  ]

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Skills", href: "/skills" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ]

  const services = [
    { name: "Web Development", href: "#" },
    { name: "Mobile Apps", href: "#" },
    { name: "UI/UX Design", href: "#" },
    { name: "Consulting", href: "#" },
    { name: "Code Review", href: "#" },
  ]

  return (
    <footer className="relative overflow-hidden bg-[#003f5c] text-white pt-16 pb-8">
      {/* Animated wave background */}
      <div className="absolute inset-0 opacity-10 overflow-hidden">
        <motion.div className="absolute top-0 left-0 w-[2000px] h-full" variants={waveVariants} animate="animate">
          <svg viewBox="0 0 1000 200" className="w-full h-full">
            <path d="M0,100 C150,200 350,0 500,100 C650,200 850,0 1000,100 L1000,200 L0,200 Z" fill="white" />
          </svg>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Developer Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                <Code className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Shokhruzbek
              </h3>
            </motion.div>

            <motion.p className="text-gray-300 max-w-xs" variants={itemVariants}>
              Full Stack Developer passionate about creating amazing digital experiences. Let's build something great
              together!
              <Coffee className="inline ml-1 h-4 w-4 text-yellow-500" />
            </motion.p>

            <motion.div className="flex space-x-3 pt-2" variants={itemVariants}>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-gradient-to-r ${social.color} p-2.5 rounded-full hover:shadow-lg transition-all duration-300 group relative`}
                  variants={socialVariants}
                  whileHover="hover"
                  title={social.label}
                >
                  {social.icon}
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {social.label}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="group"
                >
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <ArrowRight
                      size={14}
                      className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    />
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-bold">Services</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="group"
                >
                  <a
                    href={service.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <ExternalLink
                      size={14}
                      className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    />
                    {service.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Newsletter */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Get In Touch</h3>
              <ul className="space-y-3">
                <motion.li
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Phone size={18} className="mr-3 text-blue-400" />
                  <a href="tel:+998930475909" className="text-gray-300 hover:text-white transition-colors">
                    +998 93 047 59 09
                  </a>
                </motion.li>
                <motion.li
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Mail size={18} className="mr-3 text-blue-400" />
                  <a href="mailto:shokhruzbek@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                    ashokhruzbek@gmail.com
                  </a>
                </motion.li>
                <motion.li
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <MapPin size={18} className="mr-3 mt-1 text-blue-400" />
                  <span className="text-gray-300">Tashkent, Uzbekistan</span>
                </motion.li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Stay Updated</h4>
              {isSubmitted ? (
                <motion.div
                  className="bg-green-500/20 p-4 rounded-lg border border-green-500/30"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <p className="flex items-center text-green-300">
                    <Heart className="mr-2 text-pink-400" size={18} />
                    <span>Thanks! You're now subscribed.</span>
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-2">
                  <div className="flex">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="px-4 py-2 rounded-l-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 flex-grow"
                      required
                    />
                    <motion.button
                      type="submit"
                      className="bg-[#003f5c] hover:from-purple-600 hover:to-blue-500 px-4 py-2 rounded-r-lg transition-all duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ArrowRight size={20} />
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center py-8 mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* <h3 className="text-2xl font-bold mb-4">Ready to work together?</h3> */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <motion.a
              href="/contact"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 px-8 py-3 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="mr-2 h-5 w-5" />
              Let's Talk
            </motion.a> */}
            {/* <motion.a
              href="/cv.pdf"
              download
              className="border border-white/30 hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="mr-2 h-5 w-5" />
              Download CV
            </motion.a> */}
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent my-8"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />

        {/* Copyright */}
        <motion.div
          className="text-center text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="flex items-center justify-center">
            © {new Date().getFullYear()} Shokhruzbek. Made with
            <Heart className="mx-1 h-4 w-4 text-red-500" />
            and lots of <Coffee className="mx-1 h-4 w-4 text-yellow-500" />
          </p>
          <motion.div
            className="mt-2 flex justify-center space-x-4 text-xs"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            viewport={{ once: true }}
          >
            <a href="/privacy" className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="/terms" className="hover:text-white transition-colors duration-200">
              Terms of Service
            </a>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}
