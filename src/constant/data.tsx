import { StaticImageData } from "next/image";
import project1 from "../assets/projects/project-1.png";
import project2 from "../assets/projects/project-2.jpg";
import project3 from "../assets/projects/project-3.jpg";
import project4 from "../assets/projects/project-4.jpg";
export interface Project {
  title: string;
  image?: string | StaticImageData | null;
  description: string;
  technologies: string[];
  link?: string;
}

export const HERO_CONTENT = `I am a passionate back end developer with a knack for crafting robust and scalable web applications.  I have honed my skills in  back-end technologies like Node.js, MySQL, and MongoDB, as well as learning front-end technologies like React and Next.js . My goal is to become a full stack devloper and leverage my expertise to create innovative solutions that drive business growth and deliver good user experiences.`;

export const ABOUT_TEXT = `I am a dedicated and versatile back end developer with a passion for creating efficient and user-friendly web applications. I have worked with a variety of technologies, including React, Node.js, MySQL, and MongoDB. My journey in web development began with a deep curiosity for how things work, and it has evolved into a career where I continuously strive to learn and adapt to new challenges. I thrive in collaborative environments and enjoy solving complex problems to deliver high-quality solutions. Outside of coding, I enjoy playing video games, exploring new technologies, and contributing to open-source projects.`;

export const EXPERIENCES = [
  {
    year: 2024-2025,
    role: "Web Developer Intern",
    company: "Maity Innovations Pvt. Ltd",
    description:"" ,
    technologies:""
  },
  {
    year: "2025-2025", 
    role: "Web Developer",
    company:" Maity Innovations Pvt. Ltd",
    description: "",
    technologies:"",
  },
  // {
  //   year: 
  //   role:
  //   company: 
  //   description: 
  //   technologies:
  // },
  // {
  //   year: 
  //   role: 
  //   company: 
  //   description: 
  //   technologies: 
  // },
];

export const PROJECTS = [
  {
    title: "Online Exam Portal",
    image: project1,
    description:
      "A fully functional exam taking website with features like Selective candidates can give the exam , Automated Grading , Remote Monitoring.",
    technologies: ["HTML", "CSS", "React", "Node.js", "MongoDB", "Yarn"],
    link:""
  },
  {
    title: "Task Management App",
    image: project2,
    description:
      "An application for managing tasks and projects, with features such as task creation, assignment, and progress tracking.",
    technologies: ["HTML", "CSS", "Angular", "Firebase"],
    link:""
  },
  {
    title: "Portfolio Website",
    image: project3,
    description:
      "A personal portfolio website showcasing projects, skills, and contact information.",
    technologies: ["HTML", "CSS", "React", "TalwindCSS"],
    link:""
  },
  {
    title: "Blogging Platform",
    image: project4,
    description:
      "A platform for creating and publishing blog posts, with features like rich text editing, commenting, and user profiles.",
    technologies: ["HTML", "CSS", "Express", "mySQL"],
    link:""
  },
];

export const CONTACT = {
  address: "School Bazar , Midnapore , Paschim Medinipur , West Bengal, India , Pin:-721101 ",
  email: "nayanberaofficial@gmail.com",
};
