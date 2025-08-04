"use client"; // BU MUHIM! App Router'da client component uchun kerak

import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Oddiy tekshiruv (real loyihada JWT/session ishlating)
    if (form.username === "admin" && form.password === "123456") {
      toast.success("Muvaffaqiyatli kirdingiz!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      setTimeout(() => {
        setIsLoggedIn(true);
      }, 1000);
    } else {
      toast.error("Login yoki parol noto'g'ri!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  if (!isLoggedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0A0A0F] via-[#1A1B26] to-[#0A0A0F] p-4">
        <div className="w-full max-w-md">
          {/* Glass morphism card */}
          <div className="relative overflow-hidden rounded-3xl border border-[#2D2E3A]/50 bg-[#1A1B26]/70 p-8 shadow-2xl backdrop-blur-xl">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>

            <div className="relative z-10">
              {/* Header */}
              <div className="mb-8 text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <h1 className="mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-3xl font-bold text-transparent">
                  Admin Panel
                </h1>
                <p className="text-sm text-gray-400">
                  Tizimga kirish uchun ma'lumotlarni kiriting
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="mb-3 block text-sm font-medium text-gray-300">
                    Foydalanuvchi nomi
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="admin"
                      value={form.username}
                      onChange={(e) =>
                        setForm({ ...form, username: e.target.value })
                      }
                      className="shadow-inset-custom w-full rounded-2xl border-2 border-[#2D2E3A] bg-[#0A0A0F] px-4 py-4 text-white placeholder-gray-500 transition-all duration-300 focus:border-blue-500 focus:outline-none"
                      style={{
                        boxShadow:
                          "inset 0 2px 4px rgba(0, 0, 0, 0.3), inset 0 -2px 4px rgba(255, 255, 255, 0.02)",
                      }}
                    />
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-gray-300">
                    Parol
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="••••••"
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      className="shadow-inset-custom w-full rounded-2xl border-2 border-[#2D2E3A] bg-[#0A0A0F] px-4 py-4 text-white placeholder-gray-500 transition-all duration-300 focus:border-blue-500 focus:outline-none"
                      style={{
                        boxShadow:
                          "inset 0 2px 4px rgba(0, 0, 0, 0.3), inset 0 -2px 4px rgba(255, 255, 255, 0.02)",
                      }}
                    />
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
                  </div>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="group relative w-full transform overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 py-4 px-6 font-semibold text-white shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#1A1B26] hover:scale-[1.02] hover:from-blue-700 hover:via-blue-800 hover:to-purple-700"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <span className="relative flex items-center justify-center">
                    <svg
                      className="mr-2 h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    Kirish
                  </span>
                </button>
              </form>

              {/* Demo credentials */}
              <div className="mt-8 text-center">
                <div className="inline-flex items-center rounded-full border border-[#2D2E3A]/50 bg-[#0A0A0F]/50 px-4 py-2">
                  <div className="mr-2 h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                  <p className="text-xs text-gray-400">
                    Demo: <span className="font-mono text-gray-300">admin</span>{" "}
                    / <span className="font-mono text-gray-300">123456</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Toast Container */}
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
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0A0A0F] via-[#1A1B26] to-[#0A0A0F] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-all duration-300 border border-red-500/30"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Chiqish
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Dashboard Cards */}
          <div className="bg-[#1A1B26]/70 backdrop-blur-xl border border-[#2D2E3A]/50 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Foydalanuvchilar</h3>
                <p className="text-3xl font-bold text-blue-400">1,234</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-[#1A1B26]/70 backdrop-blur-xl border border-[#2D2E3A]/50 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Proyektlar</h3>
                <p className="text-3xl font-bold text-green-400">47</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-[#1A1B26]/70 backdrop-blur-xl border border-[#2D2E3A]/50 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Sharhlar</h3>
                <p className="text-3xl font-bold text-purple-400">89</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Toast Container for logged in state */}
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
    </main>
  );
}
