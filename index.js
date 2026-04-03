const mineflayer = require('mineflayer')

const HOST = 'coustom.falix.pro'
const PORT = 25565
const USERNAME = 'NLG_Queen'
const PASSWORD = 'StrongPass123'   // <-- yahan apna password likho

function createBot() {
  const bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username: USERNAME,
    version: false
  })

  bot.once('spawn', () => {
    console.log('Bot spawned. Trying login...')
    
    // Login try after spawn
    setTimeout(() => {
      bot.chat(`/login ${PASSWORD}`)
    }, 4000)

    // Anti AFK jump
    setInterval(() => {
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 500)
    }, 30000)
  })

  // Detect auth messages
  bot.on('messagestr', (msg) => {
    const m = msg.toLowerCase()

    if (m.includes('/register')) {
      console.log('Registering...')
      bot.chat(`/register ${PASSWORD} ${PASSWORD}`)
    }

    if (m.includes('/login')) {
      console.log('Logging in...')
      bot.chat(`/login ${PASSWORD}`)
    }
  })

  // Auto reconnect
  bot.on('end', () => {
    console.log('Disconnected. Reconnecting in 5s...')
    setTimeout(createBot, 5000)
  })

  bot.on('error', (err) => {
    console.log('Error:', err)
  })
}

createBot()
