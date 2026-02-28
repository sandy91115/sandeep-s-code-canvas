export const personalInfo = {
  name: "Sandeep Chaudhary",
  role: "Backend Software Engineer",
  tagline: "Backend Engineer Crafting Scalable Systems",
  experience: "1+",
  education: "B.Tech CSE (2024)",
  email: "sandeep@example.com",
  location: "India",
};

export const socialLinks = [
  { name: "GitHub", url: "https://github.com/sandeepchaudhary", icon: "Github" },
  { name: "LinkedIn", url: "https://linkedin.com/in/sandeepchaudhary", icon: "Linkedin" },
  { name: "Twitter", url: "https://twitter.com/sandeepchaudhary", icon: "Twitter" },
  { name: "Email", url: "mailto:sandeep@example.com", icon: "Mail" },
];

export const typewriterStrings = [
  "Java",
  "Spring Boot",
  "REST APIs",
  "PostgreSQL",
  "Docker",
  "Microservices",
  "System Design",
];

export const skills = [
  { name: "Java", category: "backend", proficiency: 90 },
  { name: "Spring Boot", category: "backend", proficiency: 85 },
  { name: "REST APIs", category: "backend", proficiency: 90 },
  { name: "PostgreSQL", category: "backend", proficiency: 80 },
  { name: "Docker", category: "backend", proficiency: 75 },
  { name: "MySQL", category: "backend", proficiency: 80 },
  { name: "Redis", category: "backend", proficiency: 65 },
  { name: "Git", category: "tools", proficiency: 85 },
  { name: "Linux", category: "tools", proficiency: 70 },
  { name: "HTML", category: "frontend", proficiency: 75 },
  { name: "CSS", category: "frontend", proficiency: 70 },
  { name: "JavaScript", category: "frontend", proficiency: 70 },
  { name: "React", category: "frontend", proficiency: 65 },
  { name: "TypeScript", category: "frontend", proficiency: 60 },
  { name: "AWS", category: "devops", proficiency: 60 },
  { name: "Kafka", category: "backend", proficiency: 55 },
];

export const experiences = [
  {
    title: "Backend Software Engineer",
    company: "Tech Company",
    period: "2024 — Present",
    description:
      "Building scalable backend systems with Java and Spring Boot. Designing RESTful APIs, optimizing database queries, and implementing microservice patterns.",
    highlights: [
      "Developed high-performance REST APIs serving 10K+ requests/day",
      "Implemented caching strategies reducing response times by 40%",
      "Designed database schemas for complex business domains",
    ],
  },
];

export const projects = [
  {
    title: "RFQ System — CS-Cart Addon",
    tagline: "Enterprise Request-for-Quote system for e-commerce",
    techStack: ["PHP", "MySQL", "CS-Cart", "REST API", "JavaScript"],
    problem:
      "E-commerce businesses needed a streamlined way for customers to request quotes for bulk/custom orders, but existing solutions were rigid and didn't integrate well with CS-Cart's architecture.",
    solution:
      "Built a comprehensive RFQ addon for CS-Cart that enables customers to submit quote requests, vendors to respond with pricing, and admins to manage the entire workflow — all within the existing e-commerce platform.",
    architecture:
      "Integrated directly into CS-Cart's MVC architecture using hooks and schema extensions. Used CS-Cart's built-in notification system for real-time updates and implemented a state machine for quote lifecycle management.",
    techDecisions:
      "Chose to extend CS-Cart natively rather than building a standalone microservice to ensure seamless UX and reduce deployment complexity. Used MySQL transactions for data integrity in multi-vendor scenarios.",
    challenges:
      "Managing complex state transitions across multiple user roles (customer, vendor, admin) while maintaining data consistency. Handled concurrent quote modifications with optimistic locking.",
    impact:
      "Reduced quote turnaround time by 60%. Enabled businesses to handle 3x more quote requests with the same team size. Successfully deployed across multiple CS-Cart stores.",
    resumeBullets: [
      "Engineered a full-featured RFQ system as a CS-Cart addon, enabling multi-vendor quote management with role-based workflows",
      "Implemented state machine pattern for quote lifecycle, reducing turnaround time by 60%",
      "Designed REST API endpoints for seamless frontend integration with real-time status updates",
    ],
  },
  {
    title: "REST API Platform",
    tagline: "Scalable API backend with authentication & rate limiting",
    techStack: ["Java", "Spring Boot", "PostgreSQL", "Docker", "Redis", "JWT"],
    problem:
      "Need for a robust, production-ready API platform that handles authentication, authorization, rate limiting, and comprehensive error handling out of the box.",
    solution:
      "Built a modular REST API platform using Spring Boot with JWT authentication, Redis-based rate limiting, comprehensive input validation, and standardized error responses. Includes Swagger documentation and health monitoring.",
    architecture:
      "Layered architecture with Controller → Service → Repository pattern. Used Spring Security filter chain for authentication, custom interceptors for rate limiting, and AOP for logging/monitoring. Containerized with Docker for consistent deployment.",
    techDecisions:
      "Selected Spring Boot for its mature ecosystem and production-readiness. Chose PostgreSQL for ACID compliance and complex query support. Implemented Redis for session management and rate limiting to handle high throughput.",
    challenges:
      "Designing a flexible authentication system supporting multiple auth strategies (JWT, API keys, OAuth). Implementing efficient rate limiting that scales horizontally across multiple instances using Redis as a distributed counter.",
    impact:
      "Achieved 99.9% uptime in production. Handles 50K+ API calls daily with sub-100ms average response time. Reduced onboarding time for new API consumers by 70% through comprehensive Swagger documentation.",
    resumeBullets: [
      "Architected a production-grade REST API platform with Spring Boot, supporting JWT auth and Redis-based rate limiting at 50K+ daily requests",
      "Implemented layered architecture with AOP-based logging, reducing debugging time by 50%",
      "Containerized application with Docker, achieving 99.9% uptime with automated health monitoring",
    ],
  },
];

export const techStack = {
  Languages: ["Java", "JavaScript", "TypeScript", "PHP", "SQL"],
  Frameworks: ["Spring Boot", "React", "Node.js", "CS-Cart"],
  Databases: ["PostgreSQL", "MySQL", "Redis", "MongoDB"],
  DevOps: ["Docker", "AWS", "Linux", "CI/CD", "Nginx"],
  Tools: ["Git", "Postman", "VS Code", "IntelliJ IDEA", "Swagger"],
};

export const roadmap = [
  { name: "Microservices Architecture", progress: 65, status: "learning" as const },
  { name: "Cloud Computing (AWS)", progress: 45, status: "learning" as const },
  { name: "System Design", progress: 50, status: "learning" as const },
  { name: "Kubernetes", progress: 30, status: "exploring" as const },
  { name: "Message Queues (Kafka)", progress: 40, status: "learning" as const },
];

export const stats = [
  { label: "Years Experience", value: "1+" },
  { label: "Projects Completed", value: "5+" },
  { label: "Education", value: "B.Tech CSE" },
  { label: "Graduation", value: "2024" },
];
