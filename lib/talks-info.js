'use strict'

const telegramTemplate = require('claudia-bot-builder').telegramTemplate

module.exports = function talksInfo() {
  return [
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(200).get(),
    new telegramTemplate.Text(`No talks at the moment`)
      .addReplyKeyboard([['Help'], ['Back to the main menu']])
      .get()
  ]
}
