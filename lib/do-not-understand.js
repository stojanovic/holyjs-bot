'use strict'

const telegramTemplate = require('claudia-bot-builder').telegramTemplate
const excuse = require('huh')
const mainMenu = require('./main-menu')

module.exports = function doNotUnderstand(lang) {
  let generatedExcuse = lang === 'ru' ? `Хмм.. Я не могу ответить на это 🙁\n${excuse.get(lang)}` : `Hmm, I can't answer that 🙁 \n*Reason*:\n${excuse.get(lang)}`

  return [
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(400).get(),
    new telegramTemplate.Text(generatedExcuse).get(),
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(600).get()
  ].concat(mainMenu({
    en: `But here's a few things that I can help you with`,
    ru: `Но вот, что я могу сделать:`
  }, lang))
}
