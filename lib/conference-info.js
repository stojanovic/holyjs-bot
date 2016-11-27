'use strict'

const telegramTemplate = require('claudia-bot-builder').telegramTemplate

module.exports = function conferenceInfo(lang) {
  let location = `*HolyJS*\n\nDecember 11, Moscow\nRadisson Slavyanskaya Hotel, Square of Europe, 2`
  let description = `There is plenty of frontend conferences held in Russia. However, before this year there weren’t any conferences on the most popular in the world (according to GitHub and RedMonk) programming language, JavaScript, which is mainly associated with frontend.\n\nWe fixed this bug, and now we have HolyJS Moscow, which is the second large-scale conference on JavaScript in 2016. More than 400 JS-developers will come together to discuss questions with JS-experts from all over the world.\n\nIt is guaranteed that all the talks will be on technical topics without any agile, scrum and team management stuff.`
  let links = [[{ text: 'HolyJS on facebook', url: 'https://www.facebook.com/holyjs/' }], [{ text: 'HolyJS on VKontakte', url: 'http://vk.com/holyjs' }], [{ text: '@HolyJSconf on twitter', url: 'https://twitter.com/HolyJSconf' }]]
  let moreInfo = `The conference will include more than 20 technical talks spoken in parallel tracks, lots of new people and communication with colleagues. HolyJS is not only about frontend, it also touches backend, desktop, and other demanded topics of JavaScript world.`
  let keyboard = [['List of topics'], ['Website'], ['Location'], ['Help'], ['Back to the main menu']]

  if (lang === 'ru') {
    location = `*HolyJS*\n\nДекабрь 11, Москва\nГостиница «Radisson Славянская», площадь Европы, 2`
    description = `Не следует путать HolyJS с A1:C65 по фронтенду — в России есть много таких. Однако до этого года не было ни одной конференции по самому популярному в мире (по версии GitHub и RedMonk) языку программирования — JavaScript, который чаще всего ассоциируется с фронтендом.\n\nМы это исправили — HolyJS Moscow станет уже второй масштабной конференцией по JavaScript в 2016 году. Более 400 JS-разработчиков под одной крышей соберутся для того, чтобы обсудить наболевшее с JavaScript-экспертами со всего мира.`
    links = [[{ text: 'HolyJS на facebook', url: 'https://www.facebook.com/holyjs/' }], [{ text: 'HolyJS Вконтакте', url: 'http://vk.com/holyjs' }], [{ text: '@HolyJSconf в твиттере', url: 'https://twitter.com/HolyJSconf' }]]
    moreInfo = `На конференции будет более 20 технических докладов и море общения с коллегами. Как видите, речь пойдет не только о фронте: коснемся и бэкэнда, и десктопа, и работы с железом.`
    keyboard = [['Список тем'], ['Сайт'], ['Местоположение'], ['Помощь'], ['Назад в главное меню']]
  }

  return [
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(200).get(),
    new telegramTemplate.Text(location).get(),
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(800).get(),
    new telegramTemplate.Text(description)
      .addInlineKeyboard(links)
      .get(),
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(600).get(),
    new telegramTemplate.Text(moreInfo)
      .addReplyKeyboard(keyboard, true, true)
      .get()
  ]
}
