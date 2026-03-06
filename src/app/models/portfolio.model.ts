export interface SkillCategory {
   name: string;
   icon: string;
   items: Skill[];
}

export interface Skill {
   name: string;
   level: number; // 0–100
}

export interface Project {
   title: string;
   subtitle: string;
   description: string;
   techStack: string[];
   highlights: string[];
   githubUrl?: string;
   liveUrl?: string;
   featured?: boolean;
   period: string;
}

export interface Experience {
   company: string;
   role: string;
   period: string;
   description: string;
   tags: string[];
   isCurrent?: boolean;
}

export interface Education {
   institution: string;
   degree: string;
   period: string;
   score: string;
}

export interface Certification {
   title: string;
   issuer: string;
   icon: string;
}

export interface SocialLink {
   label: string;
   url: string;
   icon: string;
}

export interface PortfolioData {
   name: string;
   taglines: string[];
   headline: string;
   bio: string;
   bioExtra: string;
   email: string;
   phone: string;
   location: string;
   photo: string;
   resumeUrl: string;
   social: SocialLink[];
   skills: SkillCategory[];
   projects: Project[];
   experience: Experience[];
   education: Education[];
   certifications: Certification[];
   stats: { label: string; value: string }[];
}
