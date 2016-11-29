'use strict'

const rp = require('minimal-request-promise')

module.exports = function apiAiQuery(text, sessionId, token) {
  return rp.post('https://api.api.ai/v1/query?v=20161120', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      query: text,
      lang: 'en',
      sessionId: sessionId
    })
  })
    .then(data => {
      let response = JSON.parse(data.body)

      console.log('API.ai response', response)

      if (!response && typeof response.result !== 'object' || response.result.action === 'input.unknown')
        throw new Error('I do not understand')

      return {
        action: response.result.action,
        params: response.result.parameters,
        reply: response.result.fulfillment,
        score: response.result.score,
        metadata: response.result.metadata
      }
    })
}

// {
//   id: 'bd646d86-b4cf-4482-b8f2-4fe79d6e8d7f',
//   timestamp: '2016-11-28T22:25:51.134Z',
//   result: {
//     source: 'agent',
//     resolvedQuery: 'Show me the schedule',
//     action: '',
//     actionIncomplete: false,
//     parameters: {
//       schedule: 'schedule',
//       timing: ''
//     },
//     contexts: [],
//     metadata: {
//       intentId: 'e693e57f-df71-4bc9-8946-70624023b15f',
//       webhookUsed: 'false',
//       intentName: 'schedule'
//     },
//     fulfillment: {
//       speech: '',
//       messages: [Object]
//     },
//     score: 0.95
//   },
//   status: { code: 200, errorType: 'success' }, sessionId: '44259452' }
