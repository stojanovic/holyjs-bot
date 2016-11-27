'use strict'

const telegramTemplate = require('claudia-bot-builder').telegramTemplate

const list = `- Architecture of modern JS-applications;
- Node.js: best practices, performance, memory management;
- JS and ECMAScript specification;
- The practice of ES6 and ES7;
- Optimizing JS-applications;
- Functional programming in JS;
- Customers-server synchronization;
- Application Testing;
- Working with graphics (WebGL, D3.js, etc.);
- Web API (Bluetooth, Network API, IndexedDB, Web Notifications, etc.);
- WebAssembly;
- JS engines;
- JS on the devices;
- Progressive Web Apps;
- Desktop apps (Electron, etc.).`

module.exports = function topicList() {
  return [
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(1000).get(),
    new telegramTemplate.Text(list).get()
  ]
}
