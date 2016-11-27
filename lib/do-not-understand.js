'use strict'

const telegramTemplate = require('claudia-bot-builder').telegramTemplate
const excuse = require('huh')

module.exports = function doNotUnderstand() {
  return [
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(400).get(),
    new telegramTemplate.Text(`Hmm, I can't answer that 🙁 \n*Reason*:\n${excuse.get()}`).get(),
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(600).get(),
    new telegramTemplate.Text(`But here's a few things that I can help you with`)
      .addReplyKeyboard([['Schedule'], ['Current talk info'], ['Next talk info'], ['Info'], ['Help']], true, true)
      .get()
  ]
}
