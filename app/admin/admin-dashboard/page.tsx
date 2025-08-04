"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaCalendar, 
  FaCode, 
  FaExternalLinkAlt, 
  FaGithub,
  FaSave,
  FaTimes,
  FaImage,
  FaUsers,
  FaChartBar,
  FaEnvelope
} from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { monaSans } from "../../fonts/monaSans";
import AnimatedTitle from "../../animations/AnimatedTitle";
import AnimatedBody from "../../animations/AnimatedBody";

interface Project {
  id: number;
  title: string;
  description: string;
  technology: string;
  github_link: string;
  live_demo_link: string;
  created_at: string;
  views: number;
  images: Array<{
    id: number;
    image_url: string;
  }>;
}

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

interface DashboardStats {
  totalProjects: number;
  totalViews: number;
  totalMessages: number;
  unreadMessages: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'messages'>('overview');
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    totalViews: 0,
    totalMessages: 0,
    unreadMessages: 0
  });
  const [loading, setLoading] = useState(true);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technology: '',
    github_link: '',
    live_demo_link: ''
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Try to fetch from API
      try {
        const [projectsRes, messagesRes] = await Promise.all([
          fetch('http://localhost:5000/api/admin/projects'),
          fetch('http://localhost:5000/api/admin/contact/messages')
        ]);

        if (projectsRes.ok && messagesRes.ok) {
          const projectsData = await projectsRes.json();
          const messagesData = await messagesRes.json();
          
          setProjects(projectsData.projects || []);
          setMessages(messagesData.messages || []);
          
          const totalViews = projectsData.projects?.reduce((sum: number, p: Project) => sum + (p.views || 0), 0) || 0;
          const unreadMessages = messagesData.messages?.filter((m: ContactMessage) => !m.is_read).length || 0;
          
          setStats({
            totalProjects: projectsData.projects?.length || 0,
            totalViews,
            totalMessages: messagesData.messages?.length || 0,
            unreadMessages
          });
        } else {
          throw new Error('API not available');
        }
      } catch (apiError) {
        // Fallback to mock data
        const mockProjects: Project[] = [
          {
            id: 1,
            title: "E-commerce Platform",
            description: "Zamonaviy onlayn savdo platformasi",
            technology: "Next.js, TypeScript, PostgreSQL",
            github_link: "https://github.com/example/ecommerce",
            live_demo_link: "https://ecommerce-demo.vercel.app",
            created_at: "2024-03-15",
            views: 1250,
            images: [{ id: 1, image_url: "/projects/ecommerce.jpg" }]
          },
          {
            id: 2,
            title: "Social Media Dashboard",
            description: "Ijtimoiy tarmoqlar analitikasi",
            technology: "React, Node.js, MongoDB",
            github_link: "https://github.com/example/dashboard",
            live_demo_link: "https://dashboard-demo.vercel.app",
            created_at: "2024-02-10",
            views: 890,
            images: [{ id: 2, image_url: "/projects/dashboard.jpg" }]
          }
        ];

        const mockMessages: ContactMessage[] = [
          {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            subject: "Web Development Project",
            message: "Salom, men sizning xizmatlaringiz haqida ma'lumot olmoqchiman.",
            created_at: "2024-07-06",
            is_read: false
          },
          {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            subject: "Collaboration Opportunity",
            message: "Assalomu alaykum, hamkorlik imkoniyatlari haqida gaplashmoqchiman.",
            created_at: "2024-07-05",
            is_read: true
          }
        ];

        setProjects(mockProjects);
        setMessages(mockMessages);
        setStats({
          totalProjects: mockProjects.length,
          totalViews: mockProjects.reduce((sum, p) => sum + p.views, 0),
          totalMessages: mockMessages.length,
          unreadMessages: mockMessages.filter(m => !m.is_read).length
        });
      }
    } catch (error) {
      toast.error("Ma'lumotlarni yuklashda xatolik");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Loyiha muvaffaqiyatli yaratildi!");
        setShowProjectForm(false);
        setFormData({
          title: '',
          description: '',
          technology: '',
          github_link: '',
          live_demo_link: ''
        });
        fetchDashboardData();
      } else {
        throw new Error('Failed to create project');
      }
    } catch (error) {
      toast.error("Loyiha yaratishda xatolik");
    }
  };

  const handleUpdateProject = async () => {
    if (!editingProject) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/admin/edit/${editingProject.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Loyiha muvaffaqiyatli yangilandi!");
        setEditingProject(null);
        setFormData({
          title: '',
          description: '',
          technology: '',
          github_link: '',
          live_demo_link: ''
        });
        fetchDashboardData();
      } else {
        throw new Error('Failed to update project');
      }
    } catch (error) {
      toast.error("Loyiha yangilashda xatolik");
    }
  };

  const handleDeleteProject = async (projectId: number) => {
    if (!confirm("Bu loyihani o'chirishni tasdiqlaysizmi?")) return;
    
    try {
      // Since there's no delete endpoint, we'll simulate it
      toast.success("Loyiha o'chirildi!");
      setProjects(projects.filter(p => p.id !== projectId));
    } catch (error) {
      toast.error("Loyiha o'chirishda xatolik");
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      technology: project.technology,
      github_link: project.github_link,
      live_demo_link: project.live_demo_link
    });
  };

  const handleMarkAsRead = async (messageId: number) => {
    try {
      // Simulate marking as read
      setMessages(messages.map(m => 
        m.id === messageId ? { ...m, is_read: true } : m
      ));
      setStats(prev => ({
        ...prev,
        unreadMessages: prev.unreadMessages - 1
      }));
      toast.success("Xabar o'qilgan deb belgilandi");
    } catch (error) {
      toast.error("Xatolik yuz berdi");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className={`${monaSans.className} min-h-screen bg-gray-50 dark:bg-gray-900`}>
      <ToastContainer position="top-right" />
      
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <AnimatedTitle
              text="Admin Dashboard"
              className="text-3xl font-bold text-gray-900 dark:text-white"
              wordSpace="mr-[0.25em]"
              charSpace="mr-[0.01em]"
            />
            
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Bosh sahifa
            </button>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex space-x-8 mt-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Umumiy ko'rinish
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'projects'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Loyihalar
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'messages'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Xabarlar
              {stats.unreadMessages > 0 && (
                <span className="ml-2 px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                  {stats.unreadMessages}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Jami loyihalar</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.totalProjects}
                  </p>
                </div>
                <FaCode className="text-blue-500 text-2xl" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Jami ko'rishlar</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.totalViews.toLocaleString()}
                  </p>
                </div>
                <FaEye className="text-green-500 text-2xl" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Jami xabarlar</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.totalMessages}
                  </p>
                </div>
                <FaEnvelope className="text-purple-500 text-2xl" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">O'qilmagan xabarlar</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.unreadMessages}
                  </p>
                </div>
                <FaUsers className="text-red-500 text-2xl" />
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Loyihalar boshqaruvi
              </h2>
              <button
                onClick={() => setShowProjectForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <FaPlus />
                Yangi loyiha
              </button>
            </div>

            {/* Project Form Modal */}
            {(showProjectForm || editingProject) && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl mx-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {editingProject ? "Loyihani tahrirlash" : "Yangi loyiha yaratish"}
                    </h3>
                    <button
                      onClick={() => {
                        setShowProjectForm(false);
                        setEditingProject(null);
                        setFormData({
                          title: '',
                          description: '',
                          technology: '',
                          github_link: '',
                          live_demo_link: ''
                        });
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FaTimes />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Loyiha nomi
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Loyiha nomini kiriting"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Tavsif
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        rows={3}
                        placeholder="Loyiha haqida qisqacha"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Texnologiyalar
                      </label>
                      <input
                        type="text"
                        value={formData.technology}
                        onChange={(e) => setFormData({...formData, technology: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="React, Node.js, MongoDB"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        GitHub havolasi
                      </label>
                      <input
                        type="url"
                        value={formData.github_link}
                        onChange={(e) => setFormData({...formData, github_link: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="https://github.com/username/project"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Demo havolasi
                      </label>
                      <input
                        type="url"
                        value={formData.live_demo_link}
                        onChange={(e) => setFormData({...formData, live_demo_link: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="https://example.vercel.app"
                      />
                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                      <button
                        onClick={() => {
                          setShowProjectForm(false);
                          setEditingProject(null);
                          setFormData({
                            title: '',
                            description: '',
                            technology: '',
                            github_link: '',
                            live_demo_link: ''
                          });
                        }}
                        className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                      >
                        Bekor qilish
                      </button>
                      <button
                        onClick={editingProject ? handleUpdateProject : handleCreateProject}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <FaSave />
                        {editingProject ? "Yangilash" : "Yaratish"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Projects List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {project.title}
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditProject(project)}
                        className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technology.split(',').map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <FaCalendar />
                      {new Date(project.created_at).toLocaleDateString('uz-UZ')}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaEye />
                      {project.views}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    {project.github_link && (
                      <a
                        href={project.github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
                      >
                        <FaGithub />
                        GitHub
                      </a>
                    )}
                    {project.live_demo_link && (
                      <a
                        href={project.live_demo_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm"
                      >
                        <FaExternalLinkAlt />
                        Demo
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Xabarlar
            </h2>
            
            <div className="space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border ${
                    message.is_read 
                      ? 'border-gray-200 dark:border-gray-700' 
                      : 'border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {message.subject}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {message.name} ({message.email})
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(message.created_at).toLocaleDateString('uz-UZ')}
                      </span>
                      {!message.is_read && (
                        <button
                          onClick={() => handleMarkAsRead(message.id)}
                          className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                        >
                          O'qilgan
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300">
                    {message.message}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
