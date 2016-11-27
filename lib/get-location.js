'use strict'

const telegramTemplate = require('claudia-bot-builder').telegramTemplate

module.exports = function getLocation(lang) {
  let justASecond = lang === 'ru' ? 'Секунду, сейчас пришлю координаты' : 'Just a second, sharing you the location'
  return [
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(400).get(),
    new telegramTemplate.Text(justASecond).get(),
    new telegramTemplate.ChatAction('find_location').get(),
    new telegramTemplate.Pause(1000).get(),
    new telegramTemplate.Venue(55.741718, 37.566829, 'Radisson Slavyanskaya Hotel', 'Square of Europe, 2, Moscow, Russia').get()
  ]
}
