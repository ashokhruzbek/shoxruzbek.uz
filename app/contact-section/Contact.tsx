"use client";
import Link from "next/link";
import Image from "next/image";
import { monaSans } from "../fonts/monaSans";
import "../animations/animate.css";
import AnimatedBody from "../animations/AnimatedBody";
import AnimatedTitle from "../animations/AnimatedTitle";
import AnimatedWords2 from "../animations/AnimatedWords2";
import { motion } from "framer-motion";
import heartIcon from "../../public/heart.png";
import { FaGithub, FaLinkedin, FaTelegramPlane, FaInstagram } from "react-icons/fa";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:4000/admin/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Xabar muvaffaqiyatli yuborildi!', {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error(result.message || 'Xabar yuborishda xatolik yuz berdi', {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error('Internet bilan bog\'lanishda xatolik', {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <motion.section
      className="relative z-10 flex h-[95vh] w-full items-center justify-center overflow-hidden bg-[#0E1016] bg-cover bg-center py-16 md:h-[80vh] md:py-20 lg:h-[90vh] lg:pt-0 lg:pb-28 3xl:h-[75vh]"
      id="contact"
      initial="initial"
      animate="animate"
    >
      <div className="mx-auto  flex w-[90%] flex-col items-center justify-center pt-10 md:pt-0">
        <div
          className={`flex flex-col items-start justify-center ${monaSans.className} relative w-full sm:items-center lg:max-w-[1440px] `}
        >
          <AnimatedWords2
            title={"Let's Talk"}
            style={
              "flex max-w-[500px] flex-col items-start text-left text-[150px] font-extrabold uppercase leading-[0.9em] text-[#e4ded7] sm:max-w-full sm:flex-row sm:items-center sm:justify-center sm:text-center sm:text-[170px] md:text-[200px] lg:text-center lg:text-[270px] xl:text-[390px]"
            }
          />
          <Image
            src={heartIcon}
            alt="Heart Icon"
            className="heartbeat md:-bottom-18 absolute -bottom-5 left-64 w-[120px] sm:-bottom-14 sm:left-[40%] md:left-[40%] md:w-[150px] lg:-bottom-16 lg:left-[42%] lg:w-[230px]"
          />
        </div>

        {/* Contact Form */}
        <div className="mt-16 w-full max-w-[1440px]">
          <div className="mx-auto max-w-2xl">
            <AnimatedTitle
              text="Xabar Yuborish"
              className="text-center text-3xl font-bold text-[#e4ded7] mb-8"
              wordSpace="mr-[0.25em]"
              charSpace="mr-[0.01em]"
            />
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#e4ded7] mb-2">
                    Ismingiz
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#1A1B26] border border-[#2D2E3A] rounded-lg text-[#e4ded7] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Ismingizni kiriting"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#e4ded7] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#1A1B26] border border-[#2D2E3A] rounded-lg text-[#e4ded7] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#e4ded7] mb-2">
                  Mavzu
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-[#1A1B26] border border-[#2D2E3A] rounded-lg text-[#e4ded7] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Xabar mavzusi"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#e4ded7] mb-2">
                  Xabar
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-[#1A1B26] border border-[#2D2E3A] rounded-lg text-[#e4ded7] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Xabaringizni bu yerga yozing..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0E1016] ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Yuborilmoqda...
                  </div>
                ) : (
                  'Xabar Yuborish'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-16 flex w-full flex-col items-center justify-center gap-8 sm:gap-12 md:gap-16">
          <div className="flex flex-col items-center text-center">
            <AnimatedBody
              text="Yoki ijtimoiy tarmoqlarda bog'laning"
              className="text-[14px] font-semibold uppercase text-[#e4ded7] opacity-70 mb-6"
            />
            
            <div className="flex gap-6">
              <Link
                href="https://github.com/ashokhruzbek"
                target="_blank"
                aria-label="GitHub"
                className="group"
              >
                <FaGithub className="text-2xl text-[#e4ded7] transition-all duration-300 group-hover:text-blue-400 group-hover:scale-110" />
              </Link>
              
              <Link
                href="https://linkedin.com/in/shoxruzbek-abduraxmonov"
                target="_blank"
                aria-label="LinkedIn"
                className="group"
              >
                <FaLinkedin className="text-2xl text-[#e4ded7] transition-all duration-300 group-hover:text-blue-400 group-hover:scale-110" />
              </Link>
              
              <Link
                href="https://t.me/ashokhruzbek"
                target="_blank"
                aria-label="Telegram"
                className="group"
              >
                <FaTelegramPlane className="text-2xl text-[#e4ded7] transition-all duration-300 group-hover:text-blue-400 group-hover:scale-110" />
              </Link>
              
              <Link
                href="https://instagram.com/ashokhruzbek"
                target="_blank"
                aria-label="Instagram"
                className="group"
              >
                <FaInstagram className="text-2xl text-[#e4ded7] transition-all duration-300 group-hover:text-blue-400 group-hover:scale-110" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </motion.section>
  );
};

export default Contact;
