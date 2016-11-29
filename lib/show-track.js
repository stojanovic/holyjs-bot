'use strict'

const telegramTemplate = require('claudia-bot-builder').telegramTemplate
const confData = require('../data/conf-data.json')

function splitIntoChunks(arr, chunkSize) {
  const newArr = []
  while (arr.length > 0) {
    let chunk = arr.splice(0, chunkSize)
    newArr.push(chunk)
  }
  return newArr
}

module.exports = function showTrack(trackNumber, lang) {
  const data = confData[lang].schedule.filter(item => (item.track === parseInt(trackNumber, 10) || item.track === 'all'))
  const text = data.reduce((prev, item) => {
    let speaker = ''
    if (item.speaker && lang === 'ru') {
      speaker = `от ${item.speaker}`
    } else if (item.speaker) {
      speaker = `by ${item.speaker}`
    }
    prev += `${item.startTime} - ${item.endTime} - *${item.title}* ${speaker} (*${item.id}*)\n\n`
    return prev
  }, '')

  if (lang === 'ru')
    return [
      new telegramTemplate.ChatAction('typing').get(),
      new telegramTemplate.Pause(200).get(),
      new telegramTemplate.Text(`*Трек ${trackNumber}*`).get(),
      new telegramTemplate.ChatAction('typing').get(),
      new telegramTemplate.Pause(400).get(),
      new telegramTemplate.Text(text)
        .addReplyKeyboard(splitIntoChunks(data.filter(item => item.type != 'break').map(item => item.id), 4).concat([['Помощь'], ['Назад в главное меню']]), true, true)
        .get(),
      new telegramTemplate.ChatAction('typing').get(),
      new telegramTemplate.Pause(200).get(),
      'Чтобы быстро посмотреть информацию о докладе, просто выберете или напечатейте его ID.'
    ]

  return [
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(200).get(),
    new telegramTemplate.Text(`*Track ${trackNumber}*`).get(),
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(400).get(),
    new telegramTemplate.Text(text)
      .addReplyKeyboard(splitIntoChunks(data.filter(item => item.type != 'break').map(item => item.id), 4).concat([['Help'], ['Back to the main menu']]), true, true)
      .get(),
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(200).get(),
    'For a quick access to the talk info simply type or select an ID from the brackets'
  ]
}
