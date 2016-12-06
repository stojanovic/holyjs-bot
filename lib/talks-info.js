'use strict'

const moment = require('moment')
const telegramTemplate = require('claudia-bot-builder').telegramTemplate
const confData = require('../data/conf-data.json')

module.exports = function talksInfo(lang) {
  let message = 'Conference is finished, check https://holyjs.ru for more info.'
  if (lang === 'ru')
    message = 'Конференция закончилась, зайдите на сайт https://holyjs.ru для дальнейшей информации.'
  if (moment(new Date()).isBefore(confData.date, 'day')) {
    if (lang === 'ru')
      message = `Конференция начнется 11 декабря в 9:00`
    message = `Conference starts on December 11th at 9am`
  }

  let menu = {
    en: [['Schedule'], ['Help'], ['Back to the main menu']],
    ru: [['Рассписание'], ['Помощь'], ['Назад в главное меню']]
  }

  if (!moment(new Date()).isSame(confData.date, 'day'))
    return [
      new telegramTemplate.ChatAction('typing').get(),
      new telegramTemplate.Pause(200).get(),
      new telegramTemplate.Text(message)
        .addReplyKeyboard(menu[lang])
        .get()
    ]

  let current = confData.en.schedule
  .filter(talk => {
    return moment(new Date()).add(2, 'hours').isSameOrAfter(talk.fullStartTime) && moment(new Date()).add(2, 'hours').isSameOrBefore(talk.fullEndTime) && talk.type !== 'break'
  })

  let response = []

  if (current.length) {
    response.push(new telegramTemplate.Text(current.reduce((msg, talk) => {
      if (lang === 'ru')
        return msg + `Трек ${talk.track}\n"${talk.title}" от ${talk.speaker}\n\n`
      return msg + `Track ${talk.track}\n"${talk.title}" by ${talk.speaker}\n\n`
    }, lang === 'ru' ? '*Текущий доклад* \n' : '*Current talk* \n')).get())
  }

  let next = confData.en.schedule
  .filter(talk => {
    return moment(new Date()).add(2, 'hours').isBefore(talk.fullStartTime) && talk.type !== 'break'
  })
  .sort((a, b) => {
    if (a.fullStartTime < b.fullStartTime) return -1
    if (a.fullStartTime > b.fullStartTime) return 1
    return 0
  })

  if (next.length) {
    let talks = next.filter(talk => talk.startTime === next[0].startTime)
    response.push(new telegramTemplate.Text(talks.reduce((msg, talk) => {
      if (lang === 'ru')
        return msg + `Трек ${talk.track}\n"${talk.title}" от ${talk.speaker}\n\n`
      return msg + `Track ${talk.track}\n"${talk.title}" by ${talk.speaker}\n\n`
    }, lang === 'ru' ? `*Следующий доклад* (начинается в ${talks[0].startTime}) \n` : `*Next talk* (starts at ${talks[0].startTime}) \n`)).get())
  }

  if (!response.length)
    response.push(message)

  return response.concat([
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(200).get(),
    new telegramTemplate.Text(lang === 'ru' ? `Могу я чем-нибудь помочь?` : `Can I help you with anything else?`)
      .addReplyKeyboard(menu[lang])
      .get()
  ])
}
