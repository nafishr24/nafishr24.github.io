import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Typewriter } from 'react-simple-typewriter';
import { Button } from "@/components/ui/button";

const HomeSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<HTMLElement[]>([]);
  const hasAnimated = useRef(false);
  const animationDelay = 300;

useEffect(() => {
  const animateElements = () => {
    if (!sectionRef.current || hasAnimated.current) return;

    const { top, bottom } = sectionRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const threshold = viewportHeight * 0.1;

    const isInViewport = top < viewportHeight - threshold && bottom > threshold;

    if (isInViewport) {
      hasAnimated.current = true;

      elementsRef.current.forEach((el, index) => {
        el.style.animation = 'none';
        void el.offsetWidth;

        setTimeout(() => {
          el.style.opacity = '1';
          el.style.animation = `staggerFadeUp 0.6s ease-out forwards`;
          el.style.animationDelay = `${index * animationDelay}ms`;
        }, 0);
      });
    }
  };

  if (sectionRef.current) {
    elementsRef.current = Array.from(
      sectionRef.current.querySelectorAll('[data-animate]')
    ) as HTMLElement[];

    elementsRef.current.forEach(el => {
      el.style.opacity = '0';
    });
  }

  // Jalankan animasi setelah sedikit delay saat mount
  setTimeout(() => {
    animateElements();
  }, 200);

  window.addEventListener('scroll', animateElements, { passive: true });
  return () => window.removeEventListener('scroll', animateElements);
}, []);


  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="min-h-screen flex items-center pt-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Konten - Kiri di desktop */}
          <div className="order-2 lg:order-1">
            <div className="space-y-6">
              <h1 
                data-animate
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900"
              >
                Hello, I'm{" "}
                <span className="font-bold text-blue-600">
                    Moh. Nafis Husen R.
                </span>
              </h1>
              
              <h2 
                data-animate
                className="text-xl md:text-3xl text-gray-600"
              >
                I'm a{" "}
                <span className="font-bold text-[#0a6181]">
                  <Typewriter
                    words={[
                      'Math Tutor',
                      'Web Development',
                      'Data Scientist'
                    ]}
                    loop={Infinity}
                    cursor
                    cursorStyle="|"
                    typeSpeed={120}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                </span>
              </h2>
              
              <p 
                data-animate
                className="text-lg text-gray-700 leading-relaxed"
              >
                Welcome to my portfolio! I'm passionate about creating beautiful, 
                functional web applications that solve real-world problems.
              </p>

              {/* Konten yang bisa diperluas */}
              <div 
                data-animate
                className={`overflow-hidden transition-all duration-500 ${
                  isExpanded ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="space-y-4 pt-4">
                  <p className="text-gray-700">
                    With over 5 years of experience in web development...
                  </p>
                </div>
              </div>

              <Button
                data-animate
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold" 
              >
                {isExpanded ? (
                  <>
                    Show Less
                    <ChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Click to More
                    <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Foto Profil - Kanan di desktop */}
          <div 
            data-animate
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-xl ring-1 ring-white/30">
                <img
                  src="/images/p2.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Style untuk animasi */}
      <style jsx global>{`
        @keyframes staggerFadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default HomeSection;