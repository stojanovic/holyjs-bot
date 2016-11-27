'use strict'

const telegramTemplate = require('claudia-bot-builder').telegramTemplate

module.exports = function getSchedule(lang) {
  if (lang === 'ru')
    return [
      new telegramTemplate.ChatAction('typing').get(),
      new telegramTemplate.Pause(200).get(),
      new telegramTemplate.Text(`Сейчас много чего происходит, что вы хотиете посмотреть?`)
      .addReplyKeyboard([['Трек 1', 'Трек 2'], ['Трек 3', 'Все треки'], ['Помощь'], ['Back to the main menu']], true, true)
      .get()
    ]

  return [
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(200).get(),
    new telegramTemplate.Text(`There's a lot of the things going on, what do you want to see?`)
    .addReplyKeyboard([['Track 1', 'Track 2'], ['Track 3', 'All tracks'], ['Help'], ['Back to the main menu']], true, true)
    .get()
  ]
}
