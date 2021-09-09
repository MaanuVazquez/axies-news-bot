declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    DISCORD_BOT_TOKEN: string
    DISCORD_BOT_CHANNEL: string
    CRON_JOB_TIME: string
  }
}
