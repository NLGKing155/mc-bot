const mineflayer = require('mineflayer')

const HOST = 'coustom.falix.pro'
const PORT = 25565
const USERNAME = 'NLG_Queen'
const PASSWORD = 'Q7m@9Zp!L2xR'

function createBot() {
  const bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username: USERNAME,
    version: false
  })

  bot.once('spawn', () => {
    console.log('Spawned. Trying login...')
    setTimeout(() => {
      bot.chat(`/login ${PASSWORD}`)
    }, 4000)

    // Anti-AFK
    setInterval(() => {
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 500)
    }, 30000)
  })

  bot.on('messagestr', (msg) => {
    const m = msg.toLowerCase()

    if (m.includes('/register')) {
      bot.chat(`/register ${PASSWORD} ${PASSWORD}`)
    }

    if (m.includes('/login')) {
      bot.chat(`/login ${PASSWORD}`)
    }
  })

  bot.on('end', () => {
    setTimeout(createBot, 5000)
  })

  bot.on('error', console.log)
}

createBot()
