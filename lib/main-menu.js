'use strict'

const telegramTemplate = require('claudia-bot-builder').telegramTemplate

module.exports = function mainMenu() {
  return [
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(200).get(),
    new telegramTemplate.Text(`Here's a few things that I can help you with`)
      .addReplyKeyboard([['Schedule'], ['Current talk info'], ['Next talk info'], ['Info'], ['Help']], true, true)
      .get()
  ]
}
