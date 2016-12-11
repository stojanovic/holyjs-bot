'use strict'

const telegramTemplate = require('claudia-bot-builder').telegramTemplate

module.exports = function getSchedule(lang) {
  let text = lang === 'ru' ? `Сейчас много чего происходит, что вы хотите посмотреть?` : `There's a lot of the things going on, what do you want to see?`
  let keyboard = {
    en: [['Track 1', 'Track 2'], ['Track 3', 'All tracks'], ['Help'], ['Back to the main menu']],
    ru: [['Доклад 1', 'Доклад 2'], ['Доклад 3', 'Все доклады'], ['Помощь'], ['Назад в главное меню']]
  }

  return [
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(200).get(),
    new telegramTemplate.Text(text)
    .addReplyKeyboard(keyboard[lang], true, true)
    .get()
  ]
}
