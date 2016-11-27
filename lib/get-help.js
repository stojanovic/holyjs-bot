'use strict'

const telegramTemplate = require('claudia-bot-builder').telegramTemplate

function random(arr) {
  return arr[Math.floor((Math.random() * arr.length))]
}

module.exports = function getHelp() {
  return [
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(400).get(),
    new telegramTemplate.Text(random(['Здравствуйте!', 'Привет.', 'Как поживаешь?', 'Рад тебя видеть.', 'Как дела?']) + `\nI am *Igor*, your conference chat bot!\n\nI can help you with a few different things, including the schedule, talks and speakers info, info about the conference, etc. Simply follow the buttons on the keyboard or try to type. Keep in mind I am not that smart yet :) But you can help! Visit my Github repository and send PR to add or improve my skills:`)
      .addInlineKeyboard([[{ text: 'Github repository', url: 'https://github.com/stojanovic/conference-telegram-bot' }]])
      .get(),
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(400).get(),
    new telegramTemplate.Text(`Here's a few things I can help you with`)
      .addReplyKeyboard([['Schedule'], ['Current talk info'], ['Next talk info'], ['Info']], true, true)
      .get()
  ]
}
