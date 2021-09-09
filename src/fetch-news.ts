import Discord from 'discord.js'
import axios from 'axios'

const { DISCORD_BOT_CHANNEL } = process.env

const AXIES_NEWS_URL = 'https://axie.substack.com/api/v1/posts?limit=5&offset=0'

interface RawArticle {
  title: string
  canonical_url: string
  description: string
}

interface Article {
  title: string
  url: string
  description: string
}

const fetchNews = async (): Promise<Article[]> => {
  const { data } = await axios.get(AXIES_NEWS_URL)

  return data.map((article: RawArticle) => ({
    title: article.title,
    url: article.canonical_url,
    description: article.description
  }))
}

const fetchNewsTask = async (client: Discord.Client) => {
  try {
    const news = await fetchNews()
    const newsChannel: Discord.TextChannel = client.channels.cache.get(DISCORD_BOT_CHANNEL) as any
    const messages = await newsChannel.messages.fetch()

    if (!news.length) return

    const lastNewPosted = messages.find(value => {
      return value.content.includes(news[0].title)
    })

    if (lastNewPosted) return
    const newsReversed = news.slice().reverse()

    newsReversed.forEach(n => {
      const articleAlreadyPosted = messages.find(m => m.content.includes(n.title))

      if (articleAlreadyPosted) return

      newsChannel.send({
        content: `**${n.title}**\n\`\`\`${n.description}\`\`\`\n${n.url}`
      })
    })
  } catch (error) {
    console.error(error)
  }
}

export default fetchNewsTask
