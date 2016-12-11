'use strict'

const telegramTemplate = require('claudia-bot-builder').telegramTemplate

module.exports = function mainMenu(messages, lang) {
  let keyboard = {
    en: [['Schedule'], ['Current and next talk info'], ['Tweet to #holyjs'], ['Info'], ['Help'], ['Switch to Russian']],
    ru: [['Расписание'], ['Информация о текущем и следующем докладе'], ['Твитнуть в #holyjs'], ['Информация'], ['Помощь'], ['Переключиться на английский']]
  }

  return [
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(200).get(),
    new telegramTemplate.Text(messages[lang])
      .addReplyKeyboard(keyboard[lang], true, true)
      .get()
  ]
}
