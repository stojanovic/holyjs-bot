'use strict'

const telegramTemplate = require('claudia-bot-builder').telegramTemplate
const confData = require('../data/conf-data.json')

module.exports = function talkInfoById(talkId, lang) {
  const talk = confData[lang].schedule.find(item => item.id.toLowerCase() === talkId)
  let reply = `*${talk.title}*\n`
  reply += talk.speaker ? lang === 'ru' ? `от ${talk.speaker}\n` : `by ${talk.speaker}\n` : ''
  reply += `${talk.date}, ${talk.startTime} - ${talk.endTime} `
  reply += talk.place ? `@ ${talk.place}` : ''
  reply += talk.track !== 'all' ? lang === 'ru' ? ` (Трек ${talk.track})\n` : ` (Track ${talk.track})\n` : '\n'
  let keyboard = {
    en: [[`About ${talk.speaker}`], [`Follow @${talk.twitter} on twitter`], ['Help'], ['Back to the main menu']],
    ru: [[`Про ${talk.speaker}`], [`Зафоловить @${talk.twitter} в твиттере`], ['Помощь'], ['Назад в главное меню']]
  }
  return [
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(400).get(),
    new telegramTemplate.Text(reply)
      .addReplyKeyboard(keyboard[lang], true, true)
      .get(),
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(800).get(),
    talk.description
  ]
}
