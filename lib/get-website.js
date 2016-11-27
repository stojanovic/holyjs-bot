'use strict'

const telegramTemplate = require('claudia-bot-builder').telegramTemplate

module.exports = function getWebsite() {
  return [
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(200).get(),
    new telegramTemplate.Text(`http://holyjs.ru`).get()
  ]
}
