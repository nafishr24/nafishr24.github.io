import { GraduationCap, Briefcase, Calendar } from "lucide-react";
import React, { useEffect, useRef } from "react";

const ResumeSection = () => {
  const education = [
    {
      degree: "Master of Computer Science",
      school: "Stanford University",
      period: "2018 - 2020",
      description: "Specialized in Machine Learning and Software Engineering. Graduated Magna Cum Laude."
    },
    {
      degree: "Bachelor of Computer Science",
      school: "University of California, Berkeley",
      period: "2014 - 2018",
      description: "Focus on Web Development and Database Systems. Dean's List for 4 consecutive semesters."
    }
  ];

  const experience = [
    {
      position: "Senior Full Stack Developer",
      company: "TechCorp Solutions",
      period: "2021 - Present",
      description: "Lead development of enterprise web applications using React, Node.js, and AWS. Mentor junior developers and architect scalable solutions."
    },
    {
      position: "Full Stack Developer",
      company: "StartupXYZ",
      period: "2020 - 2021",
      description: "Developed and maintained multiple client projects using modern web technologies. Improved application performance by 40%."
    },
    {
      position: "Frontend Developer",
      company: "Digital Agency Inc",
      period: "2018 - 2020",
      description: "Created responsive web applications and collaborated with design teams to implement pixel-perfect UI/UX designs."
    },
    {
      position: "Junior Developer Intern",
      company: "Local Web Studio",
      period: "2017 - 2018",
      description: "Assisted in development of small business websites and learned industry best practices."
    }
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const animationDelay = 200; // 0.2 second delay
  const animationElements = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    animationElements.current = Array.from(
      sectionRef.current.querySelectorAll('[data-animate]')
    ) as HTMLElement[];

    animationElements.current.forEach((el) => {
      el.classList.add('opacity-0');
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const index = animationElements.current.indexOf(el);
            setTimeout(() => {
              el.classList.remove('opacity-0');
              el.classList.add('animate-fade-slide-up');
            }, index * animationDelay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    animationElements.current.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);



  const TimelineItem = ({ item, icon: Icon, isLast }: any) => (
    <div className="relative">
      <div className="flex items-center mb-4" data-animate>
        <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            {item.degree || item.position}
          </h3>
          <p className="text-blue-600 font-medium">
            {item.school || item.company}
          </p>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Calendar className="w-4 h-4 mr-1" />
            {item.period}
          </div>
        </div>
      </div>
      <div className="ml-14 pb-8" data-animate>
        <p className="text-gray-700">{item.description}</p>
      </div>
      {!isLast && (
        <div className="absolute left-5 top-10 w-0.5 h-full bg-gray-200" data-animate></div>
      )}
    </div>
  );

  return (
    <section 
      id="resume" 
      ref={sectionRef}
      className="py-20 bg-gray-50 backdrop-blur-sm scroll-mt-16"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 
            data-animate
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            My Resume
          </h2>
          <div 
            data-animate
            className="w-24 h-1 bg-blue-600 mx-auto"
          ></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <h3 
              data-animate
              className="text-2xl font-bold text-gray-900 mb-8 flex items-center"
            >
              <GraduationCap className="mr-3 h-6 w-6 text-blue-600" />
              Education
            </h3>
            <div className="space-y-8">
              {education.map((edu, index) => (
                <TimelineItem
                  key={index}
                  item={edu}
                  icon={GraduationCap}
                  isLast={index === education.length - 1}
                />
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 
              data-animate
              className="text-2xl font-bold text-gray-900 mb-8 flex items-center"
            >
              <Briefcase className="mr-3 h-6 w-6 text-blue-600" />
              Experience
            </h3>
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <TimelineItem
                  key={index}
                  item={exp}
                  icon={Briefcase}
                  isLast={index === experience.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;