'use strict'

const telegramTemplate = require('claudia-bot-builder').telegramTemplate

module.exports = function conferenceInfo() {
  return [
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(200).get(),
    new telegramTemplate.Text(`*HolyJS*\n\nDecember 11, Moscow\nRadisson Slavyanskaya Hotel, Square of Europe, 2`).get(),
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(800).get(),
    new telegramTemplate.Text(`There is plenty of frontend conferences held in Russia. However, before this year there weren’t any conferences on the most popular in the world (according to GitHub and RedMonk) programming language, JavaScript, which is mainly associated with frontend.\n\nWe fixed this bug, and now we have HolyJS Moscow, which is the second large-scale conference on JavaScript in 2016. More than 400 JS-developers will come together to discuss questions with JS-experts from all over the world.\n\nIt is guaranteed that all the talks will be on technical topics without any agile, scrum and team management stuff.`)
      .addInlineKeyboard([[{ text: 'HolyJS on facebook', url: 'https://www.facebook.com/holyjs/' }], [{ text: 'HolyJS on VKontakte', url: 'http://vk.com/holyjs' }], [{ text: '@HolyJSconf on twitter', url: 'https://twitter.com/HolyJSconf' }]])
      .get(),
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(600).get(),
    new telegramTemplate.Text(`The conference will include more than 20 technical talks spoken in parallel tracks, lots of new people and communication with colleagues. HolyJS is not only about frontend, it also touches backend, desktop, and other demanded topics of JavaScript world.`)
      .addReplyKeyboard([['List of topics'], ['Website'], ['Location'], ['Help'], ['Back to the main menu']], true, true)
      .get()
  ]
}
