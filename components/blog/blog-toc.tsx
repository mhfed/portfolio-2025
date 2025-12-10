'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface BlogTOCProps {
  content: any;
}

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function BlogTOC({ content }: BlogTOCProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  // Extract headings from content
  useEffect(() => {
    if (!content) return;

    const extractHeadings = (node: any, items: TOCItem[] = []): TOCItem[] => {
      if (!node) return items;

      if (node.type === 'heading') {
        const level = node.attrs?.level || 1;
        let text = '';

        if (node.content && Array.isArray(node.content)) {
          node.content.forEach((child: any) => {
            if (child.type === 'text') {
              text += child.text || '';
            } else if (child.content) {
              child.content.forEach((grandchild: any) => {
                if (grandchild.type === 'text') {
                  text += grandchild.text || '';
                }
              });
            }
          });
        }

        if (text) {
          const id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
          items.push({ id, text, level });
        }
      }

      if (node.content && Array.isArray(node.content)) {
        node.content.forEach((child: any) => {
          extractHeadings(child, items);
        });
      }

      return items;
    };

    const items: TOCItem[] = [];
    if (content.type === 'doc' && content.content) {
      content.content.forEach((node: any) => {
        extractHeadings(node, items);
      });
    } else {
      extractHeadings(content, items);
    }

    setTocItems(items);

    // Add IDs to headings in the DOM
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach((heading, index) => {
      if (items[index]) {
        heading.id = items[index].id;
      }
    });
  }, [content]);

  // Track active heading on scroll
  useEffect(() => {
    if (tocItems.length === 0) return;

    const handleScroll = () => {
      const headings = tocItems.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      // Find the heading that's currently in view
      let currentId = '';
      const scrollPosition = window.scrollY + 100; // Offset for sticky header

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        if (heading.element) {
          const offsetTop = heading.element.offsetTop;
          if (scrollPosition >= offsetTop) {
            currentId = heading.id;
            break;
          }
        }
      }

      setActiveId(currentId);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [tocItems]);

  if (tocItems.length === 0) {
    return null;
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Offset for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className='border-l border-border pl-4'>
      <h3 className='text-sm font-semibold text-foreground mb-4'>
        Table of Contents
      </h3>
      <nav className='space-y-1'>
        {tocItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              scrollToHeading(item.id);
            }}
            className={cn(
              'block text-sm text-foreground/70 hover:text-foreground transition-colors',
              item.level === 1 && 'font-medium',
              item.level === 2 && 'pl-2',
              item.level === 3 && 'pl-4',
              item.level === 4 && 'pl-6',
              activeId === item.id && 'text-primary font-medium'
            )}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
