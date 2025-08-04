"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowLeft, FaCalendar, FaTag, FaEye, FaShareAlt } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { monaSans } from "../../fonts/monaSans";
import AnimatedTitle from "../../animations/AnimatedTitle";
import AnimatedBody from "../../animations/AnimatedBody";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  views: number;
  readTime: string;
  available: boolean;
}

export default function BlogDetail() {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        
        // Mock blog data - in production, this would come from API
        const mockBlogs: BlogPost[] = [
          {
            id: 1,
            title: "How to create exit animations with Framer Motion",
            slug: "framer-motion-exit-animations",
            content: `
              <div class="blog-content">
                <h2>Introduction</h2>
                <p>Framer Motion is a powerful library for creating smooth animations in React applications. In this comprehensive guide, we'll explore how to create stunning exit animations that enhance user experience.</p>
                
                <h2>What are Exit Animations?</h2>
                <p>Exit animations are transitions that occur when elements leave the DOM. They provide visual feedback to users about state changes and create a more polished, professional feel to your application.</p>
                
                <h2>Getting Started</h2>
                <p>First, make sure you have Framer Motion installed in your project:</p>
                <pre><code>npm install framer-motion</code></pre>
                
                <h2>Basic Exit Animation</h2>
                <p>Here's a simple example of an exit animation:</p>
                <pre><code>import { motion, AnimatePresence } from 'framer-motion';

const ExitExample = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <h3>This element will animate out</h3>
        </motion.div>
      )}
    </AnimatePresence>
  );
};</code></pre>
                
                <h2>Advanced Techniques</h2>
                <p>For more complex exit animations, you can use:</p>
                <ul>
                  <li><strong>Stagger animations:</strong> Animate multiple elements with delays</li>
                  <li><strong>Custom easing:</strong> Create unique timing functions</li>
                  <li><strong>Layout animations:</strong> Animate position changes</li>
                </ul>
                
                <h2>Best Practices</h2>
                <p>When implementing exit animations, consider:</p>
                <ul>
                  <li>Keep animations short (under 500ms)</li>
                  <li>Use appropriate easing functions</li>
                  <li>Provide reduced motion options for accessibility</li>
                  <li>Test on different devices and browsers</li>
                </ul>
                
                <h2>Conclusion</h2>
                <p>Exit animations are a powerful tool for enhancing user experience. With Framer Motion, you can create smooth, professional animations that delight your users and make your application feel more polished.</p>
              </div>
            `,
            excerpt: "Learn how to create smooth exit animations with Framer Motion to enhance your React applications.",
            image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1715345723909/c71d9691-fe4c-4302-b1cb-d9dca77a99b5.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp",
            date: "2024-05-15",
            author: "Ashokhruzbek",
            category: "Frontend Development",
            tags: ["React", "Framer Motion", "Animation", "JavaScript"],
            views: 1420,
            readTime: "8 min read",
            available: true
          },
          {
            id: 2,
            title: "The Importance of Collaboration in Achieving Successful Design",
            slug: "collaboration-successful-design",
            content: `
              <div class="blog-content">
                <h2>Introduction</h2>
                <p>Design is not a solo endeavor. The most successful digital products are born from effective collaboration between designers, developers, product managers, and stakeholders. In this article, we'll explore why collaboration is crucial for achieving design success.</p>
                
                <h2>Why Collaboration Matters</h2>
                <p>Collaboration in design brings together diverse perspectives and expertise:</p>
                <ul>
                  <li><strong>Technical feasibility:</strong> Developers provide insights into what's possible</li>
                  <li><strong>User insights:</strong> Product managers share user research and business goals</li>
                  <li><strong>Creative solutions:</strong> Designers contribute aesthetic and usability expertise</li>
                  <li><strong>Stakeholder alignment:</strong> Everyone works toward common objectives</li>
                </ul>
                
                <h2>Building a Collaborative Culture</h2>
                <p>To foster effective collaboration:</p>
                <ul>
                  <li>Establish clear communication channels</li>
                  <li>Create shared design systems and documentation</li>
                  <li>Hold regular design reviews and critiques</li>
                  <li>Use collaborative tools like Figma, Miro, or Notion</li>
                </ul>
                
                <h2>Common Collaboration Challenges</h2>
                <p>Teams often face these collaboration obstacles:</p>
                <ul>
                  <li>Siloed departments and lack of communication</li>
                  <li>Conflicting priorities and deadlines</li>
                  <li>Different tools and workflows</li>
                  <li>Unclear roles and responsibilities</li>
                </ul>
                
                <h2>Tools for Better Collaboration</h2>
                <p>Modern design tools enable seamless collaboration:</p>
                <ul>
                  <li><strong>Figma:</strong> Real-time design collaboration</li>
                  <li><strong>Slack:</strong> Instant communication and file sharing</li>
                  <li><strong>Notion:</strong> Centralized documentation and project management</li>
                  <li><strong>GitHub:</strong> Version control and code collaboration</li>
                </ul>
                
                <h2>Measuring Collaboration Success</h2>
                <p>Track these metrics to evaluate collaboration effectiveness:</p>
                <ul>
                  <li>Time to market for new features</li>
                  <li>Number of design iterations required</li>
                  <li>Team satisfaction and feedback scores</li>
                  <li>Quality of final deliverables</li>
                </ul>
                
                <h2>Conclusion</h2>
                <p>Successful design is a team sport. By fostering a culture of collaboration, using the right tools, and maintaining open communication, teams can create exceptional digital experiences that delight users and achieve business objectives.</p>
              </div>
            `,
            excerpt: "Discover how effective collaboration between designers, developers, and stakeholders leads to more successful design outcomes.",
            image: "https://github.com/victorcodess/folio-v1/assets/84178696/05656547-3206-42af-b081-83247f9a1063",
            date: "2024-05-10",
            author: "Ashokhruzbek",
            category: "Design Process",
            tags: ["Design", "Collaboration", "Team Work", "Process"],
            views: 892,
            readTime: "6 min read",
            available: true
          }
        ];
        
        const foundBlog = mockBlogs.find(b => b.slug === params.slug);
        
        if (foundBlog) {
          setBlog(foundBlog);
          // In production, increment view count via API
        } else {
          toast.error("Blog post topilmadi");
          router.push("/");
        }
      } catch (error) {
        toast.error("Blog ma'lumotlarini yuklashda xatolik");
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchBlog();
    }
  }, [params.slug, router]);

  const handleShare = async () => {
    if (navigator.share && blog) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link nusxalandi!");
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link nusxalandi!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Blog post topilmadi</h1>
        <Link
          href="/"
          className="text-blue-500 hover:text-blue-600 flex items-center gap-2"
        >
          <FaArrowLeft /> Bosh sahifaga qaytish
        </Link>
      </div>
    );
  }

  return (
    <div className={`${monaSans.className} min-h-screen bg-gray-50 dark:bg-gray-900`}>
      <ToastContainer position="top-right" />
      
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors mb-6"
          >
            <FaArrowLeft /> Bosh sahifaga qaytish
          </Link>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
            <span className="flex items-center gap-1">
              <FaCalendar />
              {new Date(blog.date).toLocaleDateString('uz-UZ')}
            </span>
            <span className="flex items-center gap-1">
              <FaTag />
              {blog.category}
            </span>
            <span className="flex items-center gap-1">
              <FaEye />
              {blog.views.toLocaleString()} ko'rilgan
            </span>
            <span>{blog.readTime}</span>
          </div>
          
          <AnimatedTitle
            text={blog.title}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            wordSpace="mr-[0.25em]"
            charSpace="mr-[0.01em]"
          />
          
          <AnimatedBody
            text={blog.excerpt}
            className="text-lg text-gray-600 dark:text-gray-300 mb-6"
          />
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Muallif: <strong>{blog.author}</strong>
              </span>
            </div>
            
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <FaShareAlt />
              Ulashish
            </button>
          </div>
        </div>
      </div>
      
      {/* Hero Image */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative aspect-video rounded-2xl overflow-hidden mb-8"
        >
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className={`object-cover transition-opacity duration-300 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setImageLoading(false)}
            priority
          />
          {imageLoading && (
            <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 animate-pulse" />
          )}
        </motion.div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {blog.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-lg max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        
        {/* Author Section */}
        <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
            Muallif haqida
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {blog.author} - Frontend Developer va UI/UX Designer. 
            Zamonaviy web texnologiyalar va dizayn bo'yicha maqolalar yozadi.
          </p>
        </div>
      </div>
    </div>
  );
}
