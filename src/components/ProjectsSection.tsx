import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ProjectCategory = "All" | "Data Science" | "Web Development";

interface Project {
  id: number;
  title: string;
  image: string;
  description: string;
  technologies: string[];
  category: "Data Science" | "Web Development";
}

const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const sectionRef = useRef<HTMLElement>(null);
  const animationDelay = 200; // 0.2 second delay between animations
  const animationElements = useRef<HTMLElement[]>([]);

  // Scroll animation handler
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      // Initialize elements on first run
      if (animationElements.current.length === 0) {
        animationElements.current = Array.from(
          sectionRef.current.querySelectorAll('[data-animate]')
        ) as HTMLElement[];
      }

      const viewportHeight = window.innerHeight;
      const triggerPoint = viewportHeight * 0.05; // 5% of viewport

      animationElements.current.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const elementTop = rect.top;
        const elementVisible = triggerPoint;

        if (elementTop < viewportHeight - elementVisible) {
          setTimeout(() => {
            el.classList.add('animate-fade-slide-up');
          }, index * animationDelay);
        }
      });
    };

    // Run once on mount
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const allProjects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&h=600&fit=crop",
      description: "A full-featured e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, payment integration, inventory management, and responsive design. The platform handles thousands of users and processes hundreds of orders daily.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
      category: "Web Development"
    },
    {
      id: 2,
      title: "Task Management App",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=800&h=600&fit=crop",
      description: "A collaborative task management application similar to Trello. Built with Vue.js and Firebase, it features real-time updates, drag-and-drop functionality, team collaboration tools, and project analytics. Used by over 500 teams worldwide.",
      technologies: ["Vue.js", "Firebase", "Vuex", "CSS3", "JavaScript"],
      category: "Web Development"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=800&h=600&fit=crop",
      description: "A beautiful weather dashboard that provides detailed weather information and forecasts. Built with React and integrates with multiple weather APIs. Features include location-based weather, 7-day forecasts, and interactive maps with weather overlays.",
      technologies: ["React", "API Integration", "Chart.js", "Geolocation"],
      category: "Web Development"
    },
    {
      id: 4,
      title: "Social Media Analytics",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&h=600&fit=crop",
      description: "A comprehensive social media analytics platform that tracks engagement across multiple platforms. Built with Python Django and React, it provides detailed insights, automated reporting, and performance predictions using machine learning algorithms.",
      technologies: ["Django", "React", "PostgreSQL", "ML", "D3.js"],
      category: "Data Science"
    },
    {
      id: 5,
      title: "Customer Churn Prediction",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&h=600&fit=crop",
      description: "A machine learning model that predicts customer churn for subscription-based businesses. Built with Python, scikit-learn, and TensorFlow, it analyzes customer behavior patterns and provides actionable insights to reduce churn rates.",
      technologies: ["Python", "scikit-learn", "TensorFlow", "Pandas", "Matplotlib"],
      category: "Data Science"
    },
    {
      id: 6,
      title: "Sales Forecasting Dashboard",
      image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=800&h=600&fit=crop",
      description: "An interactive dashboard for sales forecasting using time series analysis. Built with Python, Streamlit, and Prophet, it helps businesses predict future sales trends and make data-driven decisions.",
      technologies: ["Python", "Streamlit", "Prophet", "Plotly", "SQL"],
      category: "Data Science"
    }
  ];

  const categories: ProjectCategory[] = ["All", "Data Science", "Web Development"];

  const filteredProjects = activeCategory === "All" 
    ? allProjects 
    : allProjects.filter(project => project.category === activeCategory);

  const handleCategoryChange = (category: ProjectCategory) => {
    setActiveCategory(category);
    setCurrentProject(0);
  };

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % filteredProjects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const current = filteredProjects[currentProject];

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-20 bg-gray-50 backdrop-blur-sm scroll-mt-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 
            data-animate
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            My Projects
          </h2>
          <div 
            data-animate
            className="w-24 h-1 bg-blue-600 mx-auto mb-8"
          ></div>
          
          {/* Category Filter */}
          <div 
            data-animate
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => handleCategoryChange(category)}
                variant="ghost"
                className={
                  activeCategory === category
                    ? "bg-blue-600 hover:bg-blue-700 !text-white font-bold"
                    : "bg-transparent hover:bg-gray-100 text-gray-800 border border-gray-300 font-bold"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Projects Content */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Project Image Carousel */}
            <div 
              data-animate
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-xl shadow-xl bg-white">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-64 md:h-80 object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
                />
                
                {/* Navigation Arrows */}
                {filteredProjects.length > 1 && (
                  <div className="absolute inset-0 flex items-center justify-between p-4 z-10">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevProject();
                      }}
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white transition-all hover:scale-110 shadow-lg"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextProject();
                      }}
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white transition-all hover:scale-110 shadow-lg"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </div>
                )}

                {/* Project Counter */}
                {filteredProjects.length > 1 && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10">
                    <div className="flex space-x-1.5 bg-black/30 backdrop-blur-sm px-2 py-1.5 rounded-full">
                      {filteredProjects.map((_, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentProject(index);
                          }}
                          className={`transition-all ${
                            index === currentProject 
                              ? 'h-1.5 w-6 bg-white rounded-sm'
                              : 'h-1.5 w-1.5 bg-white/50 hover:bg-white/80 rounded-full'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Project Description */}
            <div 
              data-animate
              className="space-y-6"
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {current.title}
                  </h3>
                  
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {current.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {current.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div 
            data-animate
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;