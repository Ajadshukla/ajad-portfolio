import { Injectable } from '@angular/core';
import { PortfolioData } from '../models/portfolio.model';

@Injectable({ providedIn: 'root' })
export class PortfolioDataService {
   readonly data: PortfolioData = {
      name: 'Ajad Shukla',
      taglines: [
         'Software Engineer',
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
      bioExtra: `Selected for on-campus placement by HCL, currently undergoing specialized training
      in .NET Full-Stack development. I thrive at the intersection of clean code, elegant UI, and intelligent systems.`,
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
         { label: 'Projects Built', value: '6+' },
         { label: 'Certifications', value: '4' },
         { label: 'CGPA', value: '7.1' },
         { label: 'Tech Stacks', value: '3+' },
      ],
      skills: [
         {
            name: 'Languages',
            icon: '⌨️',
            items: [
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
            githubUrl: 'https://github.com/Ajadshukla',
         },
         {
            title: 'Online Job Portal System',
            subtitle: '.NET Full Stack — ASP.NET Core + Angular + MySQL',
            period: 'Jan 2025 – Mar 2025',
            description:
               'Enterprise-grade full-stack job portal using ASP.NET Core Web API and Angular with modular component-based architecture, JWT security, and a comprehensive admin dashboard.',
            techStack: ['ASP.NET Core', 'Angular', 'MySQL', 'Entity Framework Core', 'JWT'],
            highlights: [
               'DB-First approach with Entity Framework Core and MySQL',
               'Multi-role JWT auth: Admin, Employer, Candidate',
               'Job search with advanced filters and application tracking',
               'Admin management dashboard for users and postings',
            ],
            featured: true,
            githubUrl: 'https://github.com/Ajadshukla',
         },
         {
            title: 'AI Virtual Assistant',
            subtitle: 'MERN Stack + Web Speech API',
            period: 'Jun 2024 – Nov 2024',
            description:
               'Conversational AI assistant leveraging MERN stack and browser Web Speech API for real-time voice interaction. Deployed on Render with secure JWT + bcrypt authentication.',
            techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Web Speech API', 'JWT'],
            highlights: [
               'Real-time voice recognition via Web Speech API',
               'Secure auth with JWT and bcrypt password hashing',
               'Conversational AI response engine',
               'Cloud-deployed on Render',
            ],
            githubUrl: 'https://github.com/Ajadshukla',
         },
         {
            title: 'Hotel Management System',
            subtitle: 'Core Java',
            period: 'Oct 2023 – Apr 2024',
            description:
               'Menu-driven hotel management system built with Core Java, demonstrating strong OOP principles with room booking, reservation handling, and customer record management.',
            techStack: ['Core Java', 'OOP', 'File I/O', 'Collections'],
            highlights: [
               'Room booking and reservation management',
               'Customer record CRUD operations',
               'Menu-driven console interface',
               'Demonstrates SOLID OOP design principles',
            ],
            githubUrl: 'https://github.com/Ajadshukla',
         },
      ],
      experience: [
         {
            company: 'HCL Technologies',
            role: 'Campus Placement Trainee — .NET Full Stack',
            period: '2025 – Present',
            description:
               'Selected through on-campus recruitment at United College of Engineering and Research, Prayagraj. Undergoing intensive specialized training in .NET Full-Stack development (ASP.NET Core, Angular, SQL Server) as part of HCL\'s talent development program.',
            tags: ['.NET', 'ASP.NET Core', 'Angular', 'SQL Server', 'Agile'],
            isCurrent: true,
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
