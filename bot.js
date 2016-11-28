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
  return getLanguage(message.sender, originalApiRequest.env.dynamoDbTable)
    .then(lang => {
      return botFlow(message, lang, originalApiRequest.env, docClient)
    })
}, {
  platforms: ['telegram']
})

api.addPostDeployConfig('dynamoDbTable', 'DynamoDB table name:', 'configure-bot')

module.exports = api
