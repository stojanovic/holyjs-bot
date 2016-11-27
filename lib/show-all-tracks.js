'use strict'

const telegramTemplate = require('claudia-bot-builder').telegramTemplate
const confData = require('../data/conf-data.json')

module.exports = function showAllTracks() {
  const text = confData.schedule.reduce((prev, item) => {
    let speaker = ''
    if (item.speaker)
      speaker = ` by ${item.speaker} `
    prev += `${item.startTime} - ${item.endTime} - *${item.title}* ${speaker}(*${item.id}*)\n\n`
    return prev
  }, '')

  return [
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(700).get(),
    new telegramTemplate.Text(text)
      .addReplyKeyboard([['Help'], ['Back to the main menu']])
      .get()
  ]
}
