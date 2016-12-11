'use strict'

const telegramTemplate = require('claudia-bot-builder').telegramTemplate

module.exports = function getSchedule(lang) {
  let text = lang === 'ru' ? `Сейчас много чего происходит, что вы хотите посмотреть?` : `There's a lot of the things going on, what do you want to see?`
  let keyboard = {
    en: [['Track 1', 'Track 2'], ['Track 3', 'All tracks'], ['Help'], ['Back to the main menu']],
    ru: [['Трек 1', 'Трек 2'], ['Трек 3', 'Все треки'], ['Помощь'], ['Назад в главное меню']]
  }

  return [
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(200).get(),
    new telegramTemplate.Text(text)
    .addReplyKeyboard(keyboard[lang], true, true)
    .get()
  ]
}
