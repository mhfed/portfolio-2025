export interface BlogPost {
  id: string;
  title: {
    en: string;
    vi: string;
  };
  excerpt: {
    en: string;
    vi: string;
  };
  date: string;
  readTime: string;
  category: string;
  icon: string;
  tags: string[];
  slug: {
    en: string;
    vi: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: {
      en: "Building Modern React Applications with TypeScript",
      vi: "Xây dựng ứng dụng React hiện đại với TypeScript",
    },
    excerpt: {
      en: "Learn how TypeScript enhances React development by providing type safety, better IDE support, and catching errors at compile time. Explore practical patterns and best practices.",
      vi: "Tìm hiểu cách TypeScript nâng cao phát triển React bằng cách cung cấp type safety, hỗ trợ IDE tốt hơn và bắt lỗi tại thời điểm biên dịch. Khám phá các pattern và best practices thực tế.",
    },
    date: "15 January 2024",
    readTime: "8 min read",
    category: "REACT",
    icon: "⚛️",
    tags: ["React", "TypeScript", "Web Development"],
    slug: {
      en: "modern-react-typescript",
      vi: "react-typescript-hien-dai",
    },
  },
  {
    id: "2",
    title: {
      en: "Mastering Next.js App Router for Production",
      vi: "Làm chủ Next.js App Router cho Production",
    },
    excerpt: {
      en: "Deep dive into Next.js App Router features including Server Components, Streaming, and Advanced Routing. Build performant applications with modern React patterns.",
      vi: "Tìm hiểu sâu về các tính năng Next.js App Router bao gồm Server Components, Streaming và Advanced Routing. Xây dựng ứng dụng hiệu năng cao với các pattern React hiện đại.",
    },
    date: "10 February 2024",
    readTime: "12 min read",
    category: "NEXT.JS",
    icon: "▲",
    tags: ["Next.js", "React", "Performance"],
    slug: {
      en: "nextjs-app-router-production",
      vi: "nextjs-app-router-production",
    },
  },
  {
    id: "3",
    title: {
      en: "CSS Animations: From Basics to Advanced Techniques",
      vi: "CSS Animations: Từ cơ bản đến kỹ thuật nâng cao",
    },
    excerpt: {
      en: "Explore the world of CSS animations, from simple transitions to complex keyframe animations. Learn performance tips and create smooth, engaging user experiences.",
      vi: "Khám phá thế giới CSS animations, từ transitions đơn giản đến keyframe animations phức tạp. Học các mẹo về hiệu năng và tạo trải nghiệm người dùng mượt mà, hấp dẫn.",
    },
    date: "5 March 2024",
    readTime: "10 min read",
    category: "CSS",
    icon: "🎨",
    tags: ["CSS", "Animation", "Frontend"],
    slug: {
      en: "css-animations-advanced",
      vi: "css-animations-nang-cao",
    },
  },
  {
    id: "4",
    title: {
      en: "State Management Patterns in React Applications",
      vi: "Patterns quản lý State trong ứng dụng React",
    },
    excerpt: {
      en: "Compare different state management solutions including Context API, Redux, Zustand, and Jotai. Choose the right tool for your project based on complexity and requirements.",
      vi: "So sánh các giải pháp quản lý state khác nhau bao gồm Context API, Redux, Zustand và Jotai. Chọn công cụ phù hợp cho dự án của bạn dựa trên độ phức tạp và yêu cầu.",
    },
    date: "20 March 2024",
    readTime: "15 min read",
    category: "REACT",
    icon: "⚛️",
    tags: ["React", "State Management", "Redux"],
    slug: {
      en: "react-state-management-patterns",
      vi: "react-state-management-patterns",
    },
  },
];

export function getBlogPosts(locale: "en" | "vi" = "en"): BlogPost[] {
  return blogPosts;
}
