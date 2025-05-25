import React, { useEffect, useRef } from 'react';
import { Code, Palette, Rocket, Heart } from 'lucide-react';

const AboutSection = () => {
  const skills = [
    { icon: Code, title: 'Development', desc: 'Full-stack web development with modern technologies' },
    { icon: Palette, title: 'Design', desc: 'Creating beautiful and intuitive user interfaces' },
    { icon: Rocket, title: 'Innovation', desc: 'Always exploring new technologies and solutions' },
    { icon: Heart, title: 'Passion', desc: 'Dedicated to creating meaningful digital experiences' },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const animationDelay = 200; // 0.1 second delay
  const animationElements = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      // Inisialisasi elemen pertama kali
      if (animationElements.current.length === 0) {
        animationElements.current = Array.from(
          sectionRef.current.querySelectorAll('[data-animate]')
        ) as HTMLElement[];
      }

      const viewportHeight = window.innerHeight;
      const triggerPoint = viewportHeight * 0.05; // 5% dari viewport

      animationElements.current.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const elementTop = rect.top;
        const elementVisible = triggerPoint;

        if (elementTop < viewportHeight - elementVisible) {
          setTimeout(() => {
            el.classList.remove('opacity-0');
            el.classList.add('animate-fade-slide-up');
          }, index * animationDelay);
        } else {
          el.classList.add('opacity-0');
          el.classList.remove('animate-fade-slide-up');
        }
      });
    };

    // Jalankan pertama kali
    handleScroll();
    
    // Tambahkan event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 bg-gray-50 backdrop-blur-sm scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            data-animate
            className="opacity-0 text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            About <span className="bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <div 
            data-animate
            className="opacity-0 w-24 h-1 bg-gradient-to-r from-blue-600 to-sky-600 mx-auto rounded-full"
          ></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h3 
              data-animate
              className="opacity-0 text-2xl font-semibold text-gray-900 mb-6"
            >
              Crafting Digital Experiences with Purpose
            </h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              {[
                "I'm a passionate full-stack developer with a keen eye for design...",
                "My approach to development is holistic - I believe that great software...",
                "When I'm not immersed in code, you'll find me contributing to open-source..."
              ].map((text, index) => (
                <p 
                  key={index} 
                  data-animate
                  className="opacity-0"
                >
                  {text}
                </p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {['Laravel','React', 'TypeScript', 'Node.js', 'Python', 'MySQL'].map((tech, index) => (
                <span
                  key={tech}
                  data-animate
                  className="opacity-0 px-4 py-2 bg-gradient-to-r from-blue-100 to-sky-100 text-blue-700 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <div
                key={skill.title}
                data-animate
                className="opacity-0 bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-sky-500 rounded-lg flex items-center justify-center mb-4">
                  <skill.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{skill.title}</h4>
                <p className="text-gray-600 text-sm">{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;