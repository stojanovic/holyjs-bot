'use strict'

const botBuilder = require('claudia-bot-builder')

const botFlow = require('./lib/bot-flow')

const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()

function getLanguage(id, table) {
  let params = {
    TableName: table,
    Key: {
      userId: id
    }
  }

  console.log('params', params)

  return docClient.get(params).promise()
    .then(result => {
      console.log('OK', result)
      if (!result.Item)
        throw new Error('Not found')
      return result.Item.lang
    })
    .catch(err => {
      params = {
        TableName: table,
        Item: {
          userId: id,
          lang: 'en'
        }
      }
      console.log('Err', err)
      return docClient.put(params).promise()
        .then(res => {
          console.log('Create', res)
          return 'en'
        })
    })
}

const api = botBuilder((message, originalApiRequest) => {
  console.log(message)
  return getLanguage(message.sender, originalApiRequest.env.dynamoDbTable)
    .then(lang => {
      console.log(lang)
      return botFlow(message, lang, originalApiRequest.env, docClient)
    })
    .catch(console.log)
}, {
  platforms: ['telegram']
})

api.get('/tweet', request => {
  let url = `twitter://post?message=%23holyjs%20`
  if (typeof request.queryString === 'object' && request.queryString.speaker)
    url += `%40${request.queryString.speaker}%20`
  return url
}, {
  success: 302
})

api.addPostDeployConfig('dynamoDbTable', 'DynamoDB table name:', 'configure-bot')
api.addPostDeployConfig('apiAiToken', 'API.ai token:', 'configure-bot')

module.exports = api
