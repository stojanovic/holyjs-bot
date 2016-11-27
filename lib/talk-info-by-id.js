'use strict'

const telegramTemplate = require('claudia-bot-builder').telegramTemplate
const confData = require('../data/conf-data.json')

module.exports = function talkInfoById(talkId) {
  const talk = confData.schedule.find(item => item.id.toLowerCase() === talkId)
  let reply = `*${talk.title}*\n`
  reply += talk.speaker ? `by ${talk.speaker}\n` : ''
  reply += `${talk.date}, ${talk.startTime} - ${talk.endTime} `
  reply += talk.place ? `@ ${talk.place}` : ''
  reply += talk.track !== 'all' ? ` (Track ${talk.track})\n` : '\n'
  return [
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(400).get(),
    new telegramTemplate.Text(reply)
      .addReplyKeyboard([[`About ${talk.speaker}`], [`Follow @${talk.twitter} on twitter`], ['Help'], ['Back to the main menu']], true, true)
      .get(),
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(800).get(),
    talk.description
  ]
}
