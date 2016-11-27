'use strict'

const telegramTemplate = require('claudia-bot-builder').telegramTemplate

module.exports = function followOnTwitter(username) {
  return [
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(200).get(),
    new telegramTemplate.Text(`https://twitter.com/${username}`).get()
  ]
}
