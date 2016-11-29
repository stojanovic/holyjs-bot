'use strict'

const telegramTemplate = require('claudia-bot-builder').telegramTemplate
const mainMenu = require('./main-menu')

module.exports = function tweet(lang) {
  const text = {
    en: 'Tweet to #holyjs',
    ru: 'Твитнуть в #holyjs'
  }
  return [
    new telegramTemplate.Text(`Here's a link:`)
      .addInlineKeyboard([[{ text: text[lang], url: 'twitter://post?message=%23holyjs%20' }]])
      .get()
  ].concat(mainMenu({
    en: `Here's a few more things I can help you with:`,
    ru: `Вот что я могу для вас сделать:`
  }, lang))
}
