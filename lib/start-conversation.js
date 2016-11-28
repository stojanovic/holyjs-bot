'use strict'

const telegramTemplate = require('claudia-bot-builder').telegramTemplate

module.exports = function startConversation(lang) {
  if (lang === 'ru')
    return [
      new telegramTemplate.ChatAction('typing').get(),
      new telegramTemplate.Pause(200).get(),
      'Добро пожаловать на конференцию HolyJS :) \n',
      new telegramTemplate.ChatAction('typing').get(),
      new telegramTemplate.Pause(400).get(),
      new telegramTemplate.Text(`Я Игорь, ваш чат бот. Вы можете спросить любые вопросы связанные с конференцией.\n\nЯ еще не совсем умен, так что если вдруг я чего-то не знаю - посмотрите на сайте http://holyjs.ru 😉`)
        .addReplyKeyboard([['Рассписание'], ['Информация о текущем и следующем докладе'], ['Твитнуть в #holyjs'], ['Информация'], ['Помощь'], ['Переключится на английский']], true, true)
        .get()
    ]

  return [
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(200).get(),
    'Welcome to HolyJS conference :) \n',
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(400).get(),
    new telegramTemplate.Text(`I am *Igor*, your chatbot friend. You can ask me anything related to the conference!\n\nI'm still not that smart, so check http://holyjs.ru if you have any questions that I can't answer 😉`)
      .addReplyKeyboard([['Schedule'], ['Current and next talk info'], ['Tweet to #holyjs'], ['Info'], ['Help'], ['Switch to Russian']], true, true)
      .get()
  ]
}
