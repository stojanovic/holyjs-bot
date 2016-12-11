'use strict'

const confData = require('../data/conf-data.json')

const startConversation = require('./start-conversation')
const getSchedule = require('./get-schedule')
const showTrack = require('./show-track')
const showAllTracks = require('./show-all-tracks')
const talksInfo = require('./talks-info')
const talkInfoById = require('./talk-info-by-id')
const conferenceInfo = require('./conference-info')
const followOnTwitter = require('./follow-on-twitter')
const aboutSpeaker = require('./about-speaker')
const topicList = require('./topic-list')
const getWebsite = require('./get-website')
const getLocation = require('./get-location')
const getHelp = require('./get-help')
const mainMenu = require('./main-menu')
const doNotUnderstand = require('./do-not-understand')
const switchLanguage = require('./switch-language')
const tweet = require('./tweet')
const apiAi = require('./helpers/api-ai')

function isInArray(value, arr) {
  return arr.map(item => item.toLowerCase()).indexOf(value.toLowerCase()) > -1
}

module.exports = function botFlow(message, lang, env, docClient) {
  if (message.text === '/start' || message.text === '/start start')
    return startConversation(lang)

  if (isInArray(message.text, ['schedule', 'расписание']) || message.text === '/schedule')
    return getSchedule(lang)

  let trackNumber = parseInt(message.text.toLowerCase().replace(/track|трек (\d)/gi, '$1'), 10)
  if (!isNaN(trackNumber) && trackNumber > 0 && trackNumber < 4)
    return showTrack(trackNumber, lang)

  if (isInArray(message.text, ['all tracks', 'все треки']))
    return showAllTracks(lang)

  if (isInArray(message.text, ['current and next talk info', 'информация о текущем и следующем докладе']) || message.text === '/talk-info')
    return talksInfo(lang)

  if (confData[lang].schedule.map(item => item.id.toLowerCase()).indexOf(message.text.toLowerCase()) > -1)
    return talkInfoById(message.text.toLowerCase(), lang)

  if (isInArray(message.text, ['info', 'информация']) || message.text === '/info')
    return conferenceInfo(lang)

  if (/^Follow @([0-1a-zA-Z_]{1,50}) on twitter$/i.test(message.text.toLowerCase()))
    return followOnTwitter(message.text.toLowerCase().replace(/^Follow @([0-1a-zA-Z_]{1,50}) on twitter$/ig, '$1'), lang)

  if (/^Зафоловить @([0-1a-zA-Z_]{1,50}) в твиттере$/i.test(message.text.toLowerCase()))
    return followOnTwitter(message.text.toLowerCase().replace(/^Зафоловить @([0-1a-zA-Z_]{1,50}) в твиттере$/ig, '$1'), lang)

  if (/^About ([0-1a-zA-Z -]{1,100})$/i.test(message.text.toLowerCase()))
    return aboutSpeaker(message.text.toLowerCase().replace(/^About ([0-1a-zA-Z -]{1,100})$/i, '$1'), lang)

  if (/^Про ([0-1\wа-я -]{1,100})$/i.test(message.text.toLowerCase()))
    return aboutSpeaker(message.text.toLowerCase().replace(/^Про ([0-1\wа-я -]{1,100})$/gi, '$1'), lang)

  if (isInArray(message.text, ['tweet to #holyjs', 'твитнуть в #holyjs']))
    return tweet(lang)

  if (isInArray(message.text, ['list of topics', 'Список тем']))
    return topicList(lang)

  if (isInArray(message.text, ['website', 'Сайт']))
    return getWebsite()

  if (isInArray(message.text, ['location', 'местоположение'])  || message.text === '/location')
    return getLocation(lang)

  if (isInArray(message.text, ['help', 'помощь'])  || message.text === '/help')
    return getHelp(lang)

  if (isInArray(message.text, ['back to the main menu', 'назад в главное меню'])  || message.text === 'main menu')
    return mainMenu({
      en: `Here's a few things that I can help you with:`,
      ru: `Вот что я могу для вас сделать:`
    }, lang)

  if (isInArray(message.text, ['switch to russian', 'russian', 'русский']))
    return switchLanguage('ru', docClient, env.dynamoDbTable, message.sender)

  if (isInArray(message.text, ['переключится на английский', 'english', 'английский']))
    return switchLanguage('en', docClient, env.dynamoDbTable, message.sender)

  return apiAi(message.text, message.sender, env.apiAiToken)
    .then(res => {
      console.log('Res', res)
      if (res.action && res.reply.speech)
        return res.reply.speech
      if (res.metadata.intentName === 'schedule' && !res.params.timing)
        return showAllTracks(lang)
      if (res.metadata.intentName === 'track.info' && !res.params.timing && res.params.number)
        return showTrack(res.params.number, lang)
    })
    .catch(() => doNotUnderstand(lang))
}
