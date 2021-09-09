import dotenv from 'dotenv'
import Discord from 'discord.js'
import { CronJob } from 'cron'
import fetchNewsTask from './fetch-news'

const { CRON_JOB_TIME, DISCORD_BOT_TOKEN } = process.env

const client = new Discord.Client()

client.on('ready', () => {
  new CronJob(CRON_JOB_TIME, () => {
    fetchNewsTask(client)
  }).start()
})

client.login(DISCORD_BOT_TOKEN)
