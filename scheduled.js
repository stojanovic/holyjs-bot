'use strict'

const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()

const moment = require('moment')
const confData = require('./data/conf-data.json')

const mainMenu = require('./lib/main-menu')

const reply = require('./node_modules/claudia-bot-builder/lib/telegram/reply')

exports.handler = function(event, context) {
  console.log('!!!')
  console.log(event, context)

  if (!moment(new Date()).isSame(confData.date, 'day'))
    return true

  let nextEn = confData.en.schedule
    .filter(talk => {
      return moment(new Date()).add(3, 'hours').isSameOrAfter(moment(talk.fullStartTime).subtract(10, 'minutes')) && moment(new Date()).add(3, 'hours').isBefore(moment(talk.fullStartTime).subtract(5, 'minutes')) && talk.type !== 'break'
    })

  let nextRu = confData.ru.schedule
    .filter(talk => {
      return moment(new Date()).add(3, 'hours').isSameOrAfter(moment(talk.fullStartTime).subtract(10, 'minutes')) && moment(new Date()).add(3, 'hours').isBefore(moment(talk.fullStartTime).subtract(5, 'minutes')) && talk.type !== 'break'
    })

  if (!nextEn.length)
    return true

  return docClient.scan({
    TableName: event.table
  })
    .promise()
    .then(results => {
      console.log('DynamoDB results', results)
      console.log('Current time and date', new Date())

      return Promise.all(results.Items.map(user => {
        return reply({
          sender: user.userId, // 44259452
          originalRequest: {}
        }, mainMenu({
          en: nextEn.reduce((msg, talk) => {
            let track = talk.track !== 'all' ? `Track ${talk.track}\n` : ''
            let speaker = talk.speaker ? ` by ${talk.speaker}\n\n` : ''
            return msg + track + `"${talk.title}"` + speaker
          }, `Hey, next talk is a less than 10 minutes!\n\n`),
          ru: nextRu.reduce((msg, talk) => {
            let track = talk.track !== 'all' ? `Доклад ${talk.track}\n` : ''
            let speaker = talk.speaker ? ` от ${talk.speaker}\n\n` : ''
            return msg + track + `"${talk.title}"` + speaker
          }, `Привет, до следующего доклада остаётся менее 10 минут!\n\n`)
        }, user.lang), event.token)
      }))
    })
    .catch(console.log)
}
