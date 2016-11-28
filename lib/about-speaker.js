'use strict'

const telegramTemplate = require('claudia-bot-builder').telegramTemplate
const confData = require('../data/conf-data.json')

module.exports = function aboutSpeaker(name, lang) {
  let talk = confData[lang].schedule.find(talk => talk.speaker && talk.speaker.toLowerCase() === name.toLowerCase())
  if (talk) {
    let reply = [
      new telegramTemplate.ChatAction('typing').get(),
      new telegramTemplate.Pause(200).get(),
      new telegramTemplate.Text(`*${talk.speaker}*`).get()
    ]
    if (talk.speakerPic) {
      reply.push(new telegramTemplate.ChatAction('upload_photo').get())
      reply.push(new telegramTemplate.Pause(800).get())
      reply.push(new telegramTemplate.Photo(talk.speakerPic).get())
    }
    reply.push(new telegramTemplate.ChatAction('typing').get())
    reply.push(new telegramTemplate.Pause(600).get())
    reply.push(new telegramTemplate.Text(`${talk.aboutSpeaker}`).get())
    return reply
  }
}
