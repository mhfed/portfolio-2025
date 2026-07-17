import { NextRequest, NextResponse } from 'next/server'
import enMessages from '@/messages/en.json'
import viMessages from '@/messages/vi.json'
import zhTWMessages from '@/messages/zh-TW.json'

type MessagesType = typeof enMessages

const messagesMap: Record<string, MessagesType> = {
  en: enMessages,
  vi: viMessages as unknown as MessagesType,
  'zh-TW': zhTWMessages as unknown as MessagesType,
}

function cleanText(text: string): string {
  if (!text) return ''
  return text.replace(/<br\s*\/?>/gi, '\n')
}

function generateMarkdown(messages: MessagesType): string {
  let md = `# ${messages.hero.front} ${messages.hero.middle} ${messages.hero.end}\n`
  md += `**${messages.hero.developer}**\n\n`
  md += `> ${messages.hero.status}\n\n`

  md += `## ${messages.header.nav.about}\n`
  md += `${cleanText(messages.about.statement)}\n\n`
  md += `${cleanText(messages.about.description1)}\n\n`

  if (messages.about.skillList) {
    md += `### ${messages.about.coreSkills}\n`
    Object.values(messages.about.skillList).forEach((skill) => {
      md += `- **${skill.label}:** ${skill.value}\n`
    })
    md += '\n'
  }

  md += `## ${messages.header.nav.experience}\n\n`
  if (messages.experience.list && messages.experience.list.length > 0) {
    messages.experience.list.forEach((exp) => {
      md += `### ${exp.position} — ${exp.company}\n`
      md += `*${exp.period} | ${exp.location}*\n\n`
      md += `${cleanText(exp.description)}\n\n`
      if (exp.skills && exp.skills.length > 0) {
        md += `*Skills Used:* ${exp.skills.join(', ')}\n\n`
      }
    })
  }

  md += `## ${messages.header.nav.projects}\n\n`
  if (messages.projects.list && messages.projects.list.length > 0) {
    messages.projects.list.forEach((proj) => {
      md += `### ${proj.title} (${proj.year})\n`
      md += `**${proj.description}**\n\n`
      if (proj.details) {
        md += `${cleanText(proj.details)}\n\n`
      }
      if (proj.liveUrl) {
        md += `- **Live Link:** [${proj.liveUrl}](${proj.liveUrl})\n`
      }
      if (proj.githubUrl) {
        md += `- **Source Code:** [${proj.githubUrl}](${proj.githubUrl})\n`
      }
      if (proj.techStack && proj.techStack.length > 0) {
        md += `- **Tech Stack:** ${proj.techStack.join(', ')}\n`
      }
      md += `\n`
    })
  }

  md += `## Contact & Collaboration\n`
  md += `${cleanText(messages.collaborate.description)}\n\n`
  md += `- **Email:** [${messages.hero.contact.email}](mailto:${messages.hero.contact.email})\n`
  md += `- **Location:** ${messages.hero.contact.location}\n`

  return md
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const locale = searchParams.get('locale') || 'en'
  const messages = messagesMap[locale] || enMessages

  const markdown = generateMarkdown(messages)

  // Estimate tokens based on words count (approx 1.3 tokens per word)
  const words = markdown.split(/\s+/).length
  const tokens = Math.ceil(words * 1.3)

  return new NextResponse(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'x-markdown-tokens': tokens.toString(),
    },
  })
}
