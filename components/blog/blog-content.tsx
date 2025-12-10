'use client';

import { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface BlogContentProps {
  content: any; // JSON content from rich text editor
}

export function BlogContent({ content }: BlogContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Render JSON content to HTML
  // This is a basic renderer - you may need to customize based on your rich text editor
  const renderContent = (content: any): string => {
    if (!content) {
      console.log('[BlogContent] Content is null/undefined');
      return '';
    }

    // If content is a string, try to parse as JSON first
    if (typeof content === 'string') {
      // Check if it's a JSON string
      if (content.trim().startsWith('{') || content.trim().startsWith('[')) {
        try {
          const parsed = JSON.parse(content);
          console.log('[BlogContent] Parsed JSON string:', parsed);
          return renderContent(parsed); // Recursively process parsed content
        } catch (error) {
          console.log(
            '[BlogContent] Failed to parse JSON string, treating as HTML'
          );
          // If parsing fails, treat as HTML string
          return content;
        }
      }
      // Otherwise treat as HTML string
      console.log('[BlogContent] Content is plain string');
      return content;
    }

    // If content is an object/array (JSON from rich text editor)
    if (typeof content === 'object') {
      console.log('[BlogContent] Content is object:', content);
      console.log('[BlogContent] Content type:', content.type);
      console.log('[BlogContent] Content keys:', Object.keys(content));

      // Handle TipTap/Editor.js format
      if (content.type === 'doc') {
        console.log('[BlogContent] Rendering TipTap doc format');
        return renderTipTapContent(content);
      }

      // Handle empty object - this shouldn't happen with new posts, but handle legacy data
      if (Object.keys(content).length === 0) {
        console.log(
          '[BlogContent] Content is empty object - this post may need content to be added'
        );
        return '';
      }

      // Check if it's an array (could be TipTap content array)
      if (Array.isArray(content)) {
        console.log('[BlogContent] Content is array, wrapping in doc');
        // Wrap array in doc structure
        return renderTipTapContent({ type: 'doc', content });
      }

      // Try to find nested doc structure
      if (content.content && typeof content.content === 'object') {
        console.log('[BlogContent] Found nested content, trying to render');
        return renderTipTapContent({
          type: 'doc',
          content: Array.isArray(content.content)
            ? content.content
            : [content.content],
        });
      }

      // Handle other formats as needed
      console.warn(
        '[BlogContent] Unknown content format, stringifying:',
        content
      );
      return '';
    }

    console.log('[BlogContent] Content type not handled:', typeof content);
    return '';
  };

  const renderTipTapContent = (node: any): string => {
    if (!node) {
      console.log('[BlogContent] renderTipTapContent: node is null');
      return '';
    }

    let html = '';

    if (node.type === 'doc') {
      // Handle doc node
      if (node.content && Array.isArray(node.content)) {
        console.log(
          '[BlogContent] Rendering doc with',
          node.content.length,
          'children'
        );
        node.content.forEach((child: any) => {
          html += renderTipTapNode(child);
        });
      } else if (node.content) {
        // Single content node, wrap in array
        console.log('[BlogContent] Rendering doc with single child');
        html = renderTipTapNode(node.content);
      } else {
        console.log('[BlogContent] Doc node has no content');
      }
    } else {
      // Handle other node types directly
      console.log('[BlogContent] Rendering non-doc node:', node.type);
      html = renderTipTapNode(node);
    }

    console.log('[BlogContent] Generated HTML length:', html.length);
    return html;
  };

  const renderTipTapNode = (node: any): string => {
    if (!node) return '';

    const { type, content, attrs, marks } = node;
    let html = '';

    // Render marks (bold, italic, etc.)
    const openMarks: string[] = [];
    const closeMarks: string[] = [];

    if (marks) {
      marks.forEach((mark: any) => {
        switch (mark.type) {
          case 'bold':
            openMarks.push('<strong>');
            closeMarks.unshift('</strong>');
            break;
          case 'italic':
            openMarks.push('<em>');
            closeMarks.unshift('</em>');
            break;
          case 'code':
            openMarks.push('<code>');
            closeMarks.unshift('</code>');
            break;
          case 'link':
            openMarks.push(
              `<a href="${mark.attrs?.href || '#'}" target="_blank" rel="noopener noreferrer">`
            );
            closeMarks.unshift('</a>');
            break;
        }
      });
    }

    html += openMarks.join('');

    // Render node content
    switch (type) {
      case 'paragraph':
        if (content && content.length > 0) {
          content.forEach((child: any) => {
            html += renderTipTapNode(child);
          });
        } else {
          html += '<br>';
        }
        html = `<p>${html}</p>`;
        break;

      case 'heading':
        const level = attrs?.level || 1;
        let headingContent = '';
        if (content && content.length > 0) {
          content.forEach((child: any) => {
            headingContent += renderTipTapNode(child);
          });
        }
        html = `<h${level}>${headingContent}</h${level}>`;
        break;

      case 'bulletList':
        let listContent = '';
        if (content && content.length > 0) {
          content.forEach((child: any) => {
            listContent += renderTipTapNode(child);
          });
        }
        html = `<ul>${listContent}</ul>`;
        break;

      case 'orderedList':
        let orderedContent = '';
        if (content && content.length > 0) {
          content.forEach((child: any) => {
            orderedContent += renderTipTapNode(child);
          });
        }
        html = `<ol>${orderedContent}</ol>`;
        break;

      case 'listItem':
        let itemContent = '';
        if (content && content.length > 0) {
          content.forEach((child: any) => {
            itemContent += renderTipTapNode(child);
          });
        }
        html = `<li>${itemContent}</li>`;
        break;

      case 'codeBlock':
        let codeContent = '';
        if (content && Array.isArray(content)) {
          // Handle code block content - could be text nodes or direct text
          content.forEach((child: any) => {
            if (child.type === 'text') {
              codeContent += child.text || '';
            } else if (typeof child === 'string') {
              codeContent += child;
            }
          });
        }
        // Fallback: try to get text from first content item
        if (!codeContent && content?.[0]?.text) {
          codeContent = content[0].text;
        }
        html = `<pre><code>${escapeHtml(codeContent)}</code></pre>`;
        break;

      case 'blockquote':
        let quoteContent = '';
        if (content && content.length > 0) {
          content.forEach((child: any) => {
            quoteContent += renderTipTapNode(child);
          });
        }
        html = `<blockquote>${quoteContent}</blockquote>`;
        break;

      case 'hardBreak':
        html = '<br>';
        break;

      case 'horizontalRule':
        html = '<hr class="my-8 border-border" />';
        break;

      case 'text':
        html = escapeHtml(node.text || '');
        break;

      case 'image':
        const src = attrs?.src || '';
        const alt = attrs?.alt || '';
        const title = attrs?.title || '';
        html = `<img src="${src}" alt="${alt}" ${title ? `title="${escapeHtml(title)}"` : ''} class="rounded-lg max-w-full h-auto my-4" />`;
        break;

      default:
        // Fallback: render content if available
        if (content && Array.isArray(content)) {
          content.forEach((child: any) => {
            html += renderTipTapNode(child);
          });
        } else if (node.text) {
          html = escapeHtml(node.text);
        }
    }

    html += closeMarks.join('');

    return html;
  };

  const escapeHtml = (text: string): string => {
    if (typeof document === 'undefined') {
      // SSR fallback
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  useEffect(() => {
    if (contentRef.current) {
      if (content) {
        try {
          const html = renderContent(content);
          if (html) {
            contentRef.current.innerHTML = html;
          } else {
            contentRef.current.innerHTML =
              '<p class="text-muted-foreground italic">No content available.</p>';
          }
        } catch (error) {
          console.error('Error rendering content:', error);
          contentRef.current.innerHTML =
            '<p class="text-destructive">Error rendering content.</p>';
        }
      } else {
        contentRef.current.innerHTML =
          '<p class="text-muted-foreground italic">No content available.</p>';
      }
    }
  }, [content]);

  return (
    <div
      ref={contentRef}
      className='blog-content'
      style={{
        lineHeight: '1.75',
      }}
    />
  );
}
