'use strict'

const telegramTemplate = require('claudia-bot-builder').telegramTemplate
const mainMenu = require('./main-menu')

function random(arr) {
  return arr[Math.floor((Math.random() * arr.length))]
}

module.exports = function getHelp(lang) {
  let greeting = lang === 'ru' ? `Я Игорь, ваш чат бот для конференции. Я могу вам помочь с несколькими вещами, такими как: расписание, информация по докладам и спикерам.\n\nПросто следите за кнопками на клавиатуре или попробуйте написать команду. Учтите, что я пока не супер умен, но вы можете помочь! Посетите мой gihub репозиторий, чтобы улучшить мои навыки:` : `\nI am *Igor*, your conference chat bot!\n\nI can help you with a few different things, including the schedule, talks and speakers info, info about the conference, etc. Simply follow the buttons on the keyboard or try to type. Keep in mind I am not that smart yet :) But you can help! Visit my Github repository and send PR to add or improve my skills:`
  let github =  lang === 'ru' ? `Github репозиторий` : 'Github repository'
  return [
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(400).get(),
    new telegramTemplate.Text(random(['Здравствуйте!', 'Привет.', 'Как поживаешь?', 'Рад тебя видеть.', 'Как дела?']) + greeting)
      .addInlineKeyboard([[{ text: github, url: 'https://github.com/stojanovic/conference-telegram-bot' }]])
      .get(),
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(400).get()
  ].concat(mainMenu({
    en: `Here's a few things that I can help you with:`,
    ru: `Вот несколько вещей, с которыми я смогу Вам помочь:`
  }, lang))
}
