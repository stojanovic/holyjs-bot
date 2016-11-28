'use strict'

const mainMenu = require('./main-menu')

module.exports = function switchLanguage(lang, docClient, dynamoDbTable, id) {
  const params = {
    TableName: dynamoDbTable,
    Key: {
      userId: id
    },
    UpdateExpression: 'set lang = :l',
    ExpressionAttributeValues:{
      ':l': lang
    },
    ReturnValues: 'UPDATED_NEW'
  }
  return docClient.update(params).promise()
    .then(res => {
      console.log('RES', res)
      // let language = lang === 'ru' ? 'russian' : 'english'
      return mainMenu({
        en: 'Language is updated to english',
        ru: 'Язык поменялся на русский'
      }, lang)
    })
    .catch(err => {
      console.log('ERR', err)
    })
}
