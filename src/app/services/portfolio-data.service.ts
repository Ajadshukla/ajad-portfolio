import { Injectable } from '@angular/core';
import { PortfolioData } from '../models/portfolio.model';

@Injectable({ providedIn: 'root' })
export class PortfolioDataService {
   readonly data: PortfolioData = {
      name: 'Ajad Shukla',
      taglines: [
         'Software Engineer',
         'Python Full-Stack Developer',
         'Full-Stack Developer',
         'Java OOP Master',
         'AI/ML Enthusiast',
         '.NET Core Developer',
         'Open Source Advocate',
      ],
      headline: 'Building Scalable Systems from Frontend to Backend',
      bio: `B.Tech CSE student at United College of Engineering and Research, Prayagraj.
      Passionate about crafting robust, scalable web applications with a strong foundation in
      Data Structures & Algorithms, Object-Oriented Design, and modern cloud-ready architectures.`,
      bioExtra: `Selected for on-campus placement by HCL, where I completed a 3-month specialized
      training program in .NET Full-Stack development. Currently working as a Python Full Stack Developer
      Intern at QuickMetrix, building production backend services with FastAPI and Tornado. I thrive at
      the intersection of clean code, elegant UI, and intelligent systems.`,
      email: 'ajadshukla718@gmail.com',
      phone: '+91 9682860020',
      location: 'Prayagraj, Uttar Pradesh, India',
      photo: 'profile.jpg',
      resumeUrl: '#',
      social: [
         {
            label: 'GitHub',
            url: 'https://github.com/Ajadshukla',
            icon: `<img src="github.png" alt="GitHub" class="w-5 h-5 object-contain">`,
         },
         {
            label: 'LinkedIn',
            url: 'https://linkedin.com/in/ajad-shukla-7941832ab',
            icon: `<img src="linkedin.png" alt="LinkedIn" class="w-5 h-5 object-contain">`,
         },
         {
            label: 'Email',
            url: 'mailto:ajadshukla718@gmail.com',
            icon: `<img src="gmail.png" alt="Gmail" class="w-5 h-5 object-contain">`,
         },
      ],
      stats: [
         { label: 'Projects Built', value: '5+' },
         { label: 'Certifications', value: '4' },
         { label: 'CGPA', value: '7.1' },
         { label: 'Tech Stacks', value: '3+' },
      ],
      skills: [
         {
            name: 'Languages',
            icon: '⌨️',
            items: [
               { name: 'Python', level: 88 },
               { name: 'Java', level: 90 },
               { name: 'C#', level: 80 },
               { name: 'C', level: 75 },
               { name: 'JavaScript', level: 85 },
               { name: 'TypeScript', level: 80 },
            ],
         },
         {
            name: 'Frontend',
            icon: '🎨',
            items: [
               { name: 'Angular', level: 88 },
               { name: 'React.js', level: 78 },
               { name: 'HTML & CSS', level: 92 },
               { name: 'Tailwind CSS', level: 85 },
            ],
         },
         {
            name: 'Backend & Frameworks',
            icon: '⚙️',
            items: [
               { name: 'FastAPI', level: 85 },
               { name: 'Tornado', level: 78 },
               { name: 'ASP.NET Core', level: 82 },
               { name: 'Node.js / Express', level: 80 },
               { name: 'RESTful APIs', level: 88 },
            ],
         },
         {
            name: 'Databases',
            icon: '🗃️',
            items: [
               { name: 'MySQL / SQL', level: 85 },
               { name: 'MongoDB', level: 78 },
               { name: 'Entity Framework Core', level: 75 },
            ],
         },
         {
            name: 'Concepts & Tools',
            icon: '🛠️',
            items: [
               { name: 'DSA & Algorithms', level: 82 },
               { name: 'OOP & SOLID', level: 90 },
               { name: 'Git & GitHub', level: 88 },
               { name: 'AI API Integration', level: 72 },
               { name: 'JWT Auth', level: 85 },
            ],
         },
      ],
      projects: [
         {
            title: 'QuickHire — AI Job Portal',
            subtitle: 'MERN Stack + AI Integration',
            period: 'Dec 2024 – Feb 2025',
            description:
               'Scalable full-stack job portal with MERN stack, featuring AI-powered Resume ATS Analyzer and an AI Mock Interview module to enhance candidate evaluation and hiring efficiency.',
            techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT', 'AI API'],
            highlights: [
               'JWT-based authentication with role-based access control (Admin/Employer/Candidate)',
               'AI Resume ATS Analyzer for automated resume scoring',
               'AI Mock Interview module with real-time feedback',
               'Scalable RESTful API architecture',
            ],
            featured: true,
            liveUrl: 'https://quickhire-jobportal.vercel.app/',
            githubUrl: 'https://github.com/Ajadshukla/quickhire-jobportal',
         },
         {
            title: 'Hospital Management System',
            subtitle: 'ASP.NET Core + Angular 21 + MySQL + Docker',
            period: '2026',
            description:
               'Full-stack hospital management system with an ASP.NET Core Web API backend, MySQL database, and an Angular 21 frontend, containerized with Docker for consistent deployment.',
            techStack: ['ASP.NET Core', 'C#', 'Angular 21', 'MySQL', 'Docker'],
            highlights: [
               'ASP.NET Core Web API with Controller, DTO and Model layering',
               'MySQL database integration via Entity Framework',
               'Dockerized backend for consistent deployment',
               'Angular 21 dashboard frontend deployed on Netlify',
            ],
            featured: true,
            liveUrl: 'https://hospital-management-si.netlify.app/dashboard',
            githubUrl: 'https://github.com/Ajadshukla/hospitalmanagement',
         },
         {
            title: 'Jarvis — AI Virtual Assistant',
            subtitle: 'React + Express + MongoDB + Gemini',
            period: 'Jun 2024 – Nov 2024',
            description:
               'A voice-controlled AI assistant — name it, give it a face, and talk to it. Combines the browser Web Speech API for voice I/O with Google Gemini for real conversational intelligence.',
            techStack: ['React.js', 'Express.js', 'MongoDB', 'Gemini API', 'Web Speech API', 'JWT'],
            highlights: [
               'Real-time voice recognition and speech synthesis via the Web Speech API',
               'Conversational responses powered by Google Gemini',
               'Custom assistant identity — name and avatar are user-configurable',
               'Secure auth with JWT and bcrypt password hashing',
            ],
            liveUrl: 'https://jarvis-ai-assistant-kohl.vercel.app/',
            githubUrl: 'https://github.com/Ajadshukla/jarvis-ai-assistant',
         },
         {
            title: 'Space Blaster X',
            subtitle: 'Vanilla JavaScript + HTML5 Canvas',
            period: '2025',
            description:
               'Browser-based arcade space shooter game built with vanilla JavaScript and HTML5 Canvas, with tilt controls for mobile and keyboard controls for desktop.',
            techStack: ['JavaScript', 'HTML5 Canvas', 'CSS3'],
            highlights: [
               'Custom render loop built on requestAnimationFrame, no game engine',
               'Mobile tilt controls via the Device Orientation API',
               'Collision detection, particle effects, and a scrolling starfield background',
            ],
            liveUrl: 'https://ajad-space-shooter-game.netlify.app/',
            githubUrl: 'https://github.com/Ajadshukla/space-shooter-game',
         },
         {
            title: 'Personal Portfolio Website',
            subtitle: 'Angular + Tailwind CSS',
            period: '2026',
            description:
               'This portfolio website, built with Angular and Tailwind CSS, showcasing my projects, skills, and experience with a fully responsive design.',
            techStack: ['Angular', 'TypeScript', 'Tailwind CSS'],
            highlights: [
               'Server-side rendered for fast load times and SEO',
               'Fully responsive across desktop and mobile',
            ],
            liveUrl: 'https://ajad.in',
            githubUrl: 'https://github.com/Ajadshukla/ajad-portfolio',
         },
      ],
      experience: [
         {
            company: 'QuickMetrix',
            role: 'Python Full Stack Developer Intern',
            period: '2026 – Present',
            description:
               'Building and shipping production backend services in Python — designing REST APIs with FastAPI, working with Tornado for asynchronous request handling, and integrating everything with the front end.',
            tags: ['Python', 'FastAPI', 'Tornado', 'REST APIs', 'MySQL'],
            isCurrent: true,
         },
         {
            company: 'HCL Technologies',
            role: 'Campus Placement Trainee — .NET Full Stack',
            period: '2025 (3 Months)',
            description:
               'Selected through on-campus recruitment at United College of Engineering and Research, Prayagraj. Completed a 3-month intensive specialized training program in .NET Full-Stack development (ASP.NET Core, Angular, SQL Server).',
            tags: ['.NET', 'ASP.NET Core', 'Angular', 'SQL Server', 'Agile'],
            isCurrent: false,
         },
      ],
      education: [
         {
            institution: 'United College of Engineering and Research, Prayagraj',
            degree: 'B.Tech — Computer Science & Engineering',
            period: 'Oct 2022 – Jul 2026',
            score: 'SGPA: 7.11',
         },
         {
            institution: 'St. Thomas School, Gopiganj, Bhadohi',
            degree: 'Intermediate — PCM',
            period: 'Apr 2020 – May 2021',
            score: '87%',
         },
      ],
      certifications: [
         { title: 'Web Development', issuer: 'Edunet Foundation (AICTE)', icon: '🏆' },
         { title: 'Web Development', issuer: 'IIIT Allahabad', icon: '🎓' },
         { title: 'SQL & Relational Databases', issuer: 'IBM SkillsBuild', icon: '🗄️' },
         { title: 'Core Java', issuer: 'United Group of Institutions', icon: '☕' },
      ],
   };
}
