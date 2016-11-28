'use strict'

const telegramTemplate = require('claudia-bot-builder').telegramTemplate
const confData = require('../data/conf-data.json')

module.exports = function showAllTracks(lang) {
  const text = confData[lang].schedule.reduce((prev, item) => {
    let speaker = ''
    if (item.speaker && lang === 'ru') {
      speaker = ` от ${item.speaker} `
    } else if (item.speaker) {
      speaker = ` by ${item.speaker} `
    }
    prev += `${item.startTime} - ${item.endTime} - *${item.title}* ${speaker}(*${item.id}*)\n\n`
    return prev
  }, '')

  if (lang === 'ru')
    return [
      new telegramTemplate.ChatAction('typing').get(),
      new telegramTemplate.Pause(700).get(),
      new telegramTemplate.Text(text)
        .addReplyKeyboard([['Помощь'], ['Назад в главное меню']])
        .get()
    ]

  return [
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(700).get(),
    new telegramTemplate.Text(text)
      .addReplyKeyboard([['Help'], ['Back to the main menu']])
      .get()
  ]
}
