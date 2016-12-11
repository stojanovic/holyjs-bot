'use strict'

const moment = require('moment')
const telegramTemplate = require('claudia-bot-builder').telegramTemplate
const mainMenu = require('./main-menu')
const confData = require('../data/conf-data.json')

module.exports = function tweet(lang) {
  const text = {
    en: 'Tweet to #holyjs',
    ru: 'Твитнуть в #holyjs'
  }

  let current = confData[lang].schedule
    .filter(talk => {
      return moment(new Date()).add(3, 'hours').isSameOrAfter(talk.fullStartTime) && moment(new Date()).add(3, 'hours').isSameOrBefore(talk.fullEndTime) && talk.type !== 'break'
    })

  let keyboard = [[{ text: text[lang], url: 'https://eljpuy4bgb.execute-api.eu-central-1.amazonaws.com/latest/tweet' }]]

  if (current.length)
    current.forEach(talk => {
      if (talk.twitter)
        keyboard.push([{
          text: `${text[lang]} @${talk.twitter}`,
          url: `https://eljpuy4bgb.execute-api.eu-central-1.amazonaws.com/latest/tweet?speaker=${talk.twitter}`
        }])
    })

  let reply = new telegramTemplate.Text(`Here's a link:`)
    .addInlineKeyboard(keyboard).get()

  console.log('R', reply)

  return [reply].concat(mainMenu({
    en: `Here's a few more things I can help you with:`,
    ru: `Вот несколько вещей, с которыми я смогу Вам помочь:`
  }, lang))
}
