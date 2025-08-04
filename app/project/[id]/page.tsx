"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaCalendar, FaCode, FaEye } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { monaSans } from "../../fonts/monaSans";
import AnimatedTitle from "../../animations/AnimatedTitle";
import AnimatedBody from "../../animations/AnimatedBody";

interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  github: string;
  demo: string;
  image: string;
  available: boolean;
  longDescription?: string;
  features?: string[];
  challenges?: string[];
  createdAt?: string;
  views?: number;
}

export default function ProjectDetail() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        
        // Try to fetch from real API first
        try {
          const response = await fetch(`http://localhost:5000/api/admin/project/${params.id}`);
          
          if (response.ok) {
            const data = await response.json();
            
            // Transform backend data to match frontend interface
            const transformedProject: Project = {
              id: data.project.id,
              name: data.project.title,
              description: data.project.description,
              technologies: Array.isArray(data.project.technology) 
                ? data.project.technology 
                : (data.project.technology ? data.project.technology.split(',').map((t: string) => t.trim()) : []),
              github: data.project.github_link || '',
              demo: data.project.live_demo_link || '',
              image: data.project.images && data.project.images.length > 0 
                ? data.project.images[0].image_url 
                : '/projects/default.jpg',
              available: true,
              longDescription: data.project.long_description || data.project.description,
              features: data.project.features ? data.project.features.split(',').map((f: string) => f.trim()) : [],
              challenges: data.project.challenges ? data.project.challenges.split(',').map((c: string) => c.trim()) : [],
              createdAt: data.project.created_at,
              views: data.project.views || 0,
            };
            
            setProject(transformedProject);
            return;
          }
        } catch (apiError) {
          console.log('API not available, using mock data');
        }
        
        // Fallback to mock data if API is not available
        const mockProjects: Project[] = [
          {
            id: 1,
            name: "E-commerce Platform",
            description: "Zamonaviy onlayn savdo platformasi",
            longDescription: "Bu loyiha to'liq funksional e-commerce platformasi bo'lib, foydalanuvchilar mahsulotlarni ko'rish, savatga qo'shish, to'lov qilish va buyurtma berish imkoniyatiga ega. Admin panel orqali mahsulotlar, buyurtmalar va foydalanuvchilarni boshqarish mumkin.",
            technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe", "Tailwind CSS"],
            github: "https://github.com/example/ecommerce",
            demo: "https://ecommerce-demo.vercel.app",
            image: "/projects/ecommerce.jpg",
            available: true,
            features: [
              "Foydalanuvchi ro'yxatdan o'tishi va kirishi",
              "Mahsulotlar katalogi va qidiruv",
              "Savat va to'lov tizimi", 
              "Buyurtma kuzatuvi",
              "Admin panel",
              "Responsive dizayn"
            ],
            challenges: [
              "To'lov tizimini xavfsiz integratsiya qilish",
              "Real-time inventory boshqaruvi",
              "SEO optimizatsiya",
              "Performance optimization"
            ],
            createdAt: "2024-03-15",
            views: 1250
          },
          {
            id: 2,
            name: "Social Media Dashboard",
            description: "Ijtimoiy tarmoqlar analitikasi",
            longDescription: "Bir nechta ijtimoiy tarmoq platformalaridan ma'lumotlarni yig'ib, tahlil qiluvchi dashboard. Real-time statistika, post planlash va audience analytics imkoniyatlari mavjud.",
            technologies: ["React", "Node.js", "MongoDB", "Chart.js", "Socket.io"],
            github: "https://github.com/example/dashboard",
            demo: "https://dashboard-demo.vercel.app", 
            image: "/projects/dashboard.jpg",
            available: true,
            features: [
              "Ko'p platformali integratsiya",
              "Real-time analytics",
              "Post scheduling",
              "Audience insights",
              "Custom reports"
            ],
            challenges: [
              "API rate limiting bilan ishlash",
              "Real-time data synchronization",
              "Complex data visualization",
              "Multi-platform authentication"
            ],
            createdAt: "2024-02-10",
            views: 890
          }
        ];

        const projectId = parseInt(params.id as string);
        const foundProject = mockProjects.find(p => p.id === projectId);
        
        if (foundProject) {
          setProject(foundProject);
        } else {
          toast.error("Loyiha topilmadi");
          router.push("/");
        }
      } catch (error) {
        toast.error("Ma'lumotlarni yuklashda xatolik");
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProject();
    }
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0E1016] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-[#e4ded7]">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0E1016] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-[#e4ded7] mb-4">Loyiha topilmadi</h1>
          <Link href="/" className="text-blue-400 hover:underline">
            Bosh sahifaga qaytish
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0E1016] text-[#e4ded7]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#0E1016]/90 backdrop-blur-md border-b border-[#2D2E3A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-[#e4ded7] hover:text-blue-400 transition-colors"
            >
              <FaArrowLeft className="w-4 h-4" />
              Ortga
            </button>
            
            <div className="flex items-center gap-4">
              {project.github && (
                <Link
                  href={project.github}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 bg-[#1A1B26] hover:bg-[#2D2E3A] rounded-lg transition-colors"
                >
                  <FaGithub className="w-4 h-4" />
                  GitHub
                </Link>
              )}
              
              {project.demo && project.available && (
                <Link
                  href={project.demo}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <FaExternalLinkAlt className="w-4 h-4" />
                  Live Demo
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Project Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <h1 className={`text-4xl md:text-5xl font-bold ${monaSans.className}`}>
                {project.name}
              </h1>
              {!project.available && (
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">
                  Ishlab chiqilmoqda
                </span>
              )}
            </div>
            
            <p className="text-xl text-gray-300 mb-6">
              {project.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              {project.createdAt && (
                <div className="flex items-center gap-2">
                  <FaCalendar className="w-4 h-4" />
                  {new Date(project.createdAt).toLocaleDateString('uz-UZ')}
                </div>
              )}
              
              {project.views && (
                <div className="flex items-center gap-2">
                  <FaEye className="w-4 h-4" />
                  {project.views.toLocaleString()} ko'rishlar
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <FaCode className="w-4 h-4" />
                {project.technologies.length} texnologiya
              </div>
            </div>
          </div>

          {/* Project Image */}
          <div className="mb-12 relative">
            <div className="aspect-video rounded-2xl overflow-hidden bg-[#1A1B26] relative">
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              )}
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover"
                onLoad={() => setImageLoading(false)}
                onError={() => setImageLoading(false)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Loyiha haqida</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed">
                    {project.longDescription || project.description}
                  </p>
                </div>
              </section>

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold mb-6">Asosiy xususiyatlar</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-[#1A1B26] rounded-lg border border-[#2D2E3A]"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <p className="text-gray-300">{feature}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Challenges */}
              {project.challenges && project.challenges.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold mb-6">Qiyinchiliklar va yechimlar</h2>
                  <div className="space-y-4">
                    {project.challenges.map((challenge, index) => (
                      <div
                        key={index}
                        className="p-4 bg-[#1A1B26] rounded-lg border border-[#2D2E3A] border-l-4 border-l-orange-500"
                      >
                        <p className="text-gray-300">{challenge}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Technologies */}
              <section className="bg-[#1A1B26] rounded-2xl p-6 border border-[#2D2E3A]">
                <h3 className="text-xl font-bold mb-4">Texnologiyalar</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>

              {/* Project Links */}
              <section className="bg-[#1A1B26] rounded-2xl p-6 border border-[#2D2E3A]">
                <h3 className="text-xl font-bold mb-4">Loyiha havolalari</h3>
                <div className="space-y-3">
                  {project.github && (
                    <Link
                      href={project.github}
                      target="_blank"
                      className="flex items-center gap-3 p-3 bg-[#0E1016] hover:bg-[#2D2E3A] rounded-lg transition-colors group"
                    >
                      <FaGithub className="w-5 h-5 text-gray-400 group-hover:text-white" />
                      <div>
                        <p className="font-medium">GitHub Repository</p>
                        <p className="text-sm text-gray-400">Kodlarni ko'rish</p>
                      </div>
                    </Link>
                  )}
                  
                  {project.demo && project.available && (
                    <Link
                      href={project.demo}
                      target="_blank"
                      className="flex items-center gap-3 p-3 bg-[#0E1016] hover:bg-[#2D2E3A] rounded-lg transition-colors group"
                    >
                      <FaExternalLinkAlt className="w-5 h-5 text-gray-400 group-hover:text-white" />
                      <div>
                        <p className="font-medium">Live Demo</p>
                        <p className="text-sm text-gray-400">Ishlab turgan versiya</p>
                      </div>
                    </Link>
                  )}
                </div>
              </section>

              {/* Contact */}
              <section className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-500/20">
                <h3 className="text-xl font-bold mb-4">Shunga o'xshash loyiha kerakmi?</h3>
                <p className="text-gray-300 mb-4 text-sm">
                  Men sizning loyihangizni ham shu darajada sifatli qilib beraman.
                </p>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                >
                  Bog'lanish
                  <FaExternalLinkAlt className="w-3 h-3" />
                </Link>
              </section>
            </div>
          </div>
        </motion.div>
      </main>

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
    </div>
  );
}
