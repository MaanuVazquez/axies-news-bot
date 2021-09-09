import dotenv from 'dotenv'
import Discord from 'discord.js'
import { CronJob } from 'cron'
import fetchNewsTask from './fetch-news'

dotenv.config()

const { DISCORD_BOT_TOKEN } = process.env

const client = new Discord.Client()

client.on('ready', () => {
  new CronJob('*/10 * * * * *', () => {
    fetchNewsTask(client)
  }).start()
})

client.login(DISCORD_BOT_TOKEN)
