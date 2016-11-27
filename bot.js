'use strict'

const botBuilder = require('claudia-bot-builder')

const botFlow = require('./lib/bot-flow')

function getLanguage() {
  return new Promise(resolve => resolve('ru'))
}

module.exports = botBuilder(message => {
  return getLanguage()
    .then(lang => {
      return botFlow(message, lang)
    })
}, {
  platforms: ['telegram']
})
