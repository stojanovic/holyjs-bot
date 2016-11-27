'use strict'

const telegramTemplate = require('claudia-bot-builder').telegramTemplate

const list = {
  en: `- Architecture of modern JS-applications;
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
- Desktop apps (Electron, etc.).`,
  ru: `-  Архитектура современных JS-приложений;
- Node.js: best practices, performance, memory management;
- JS и спецификация ECMAScript;
- Практика применения ES6 и ES7;
- Оптимизация JS-приложений;
- Функциональное программирование на JS;
- Kлиент-серверная синхронизация;
- Тестирование приложений;
- Работа с графикой (WebGL, D3.js и т.п.);
- Web API (Bluetooth, Network API, IndexedDB, Web Notifications и т.п.);
- WebAssembly;
- JS engines;
- JS на устройствах;
- Progressive Web Apps;
- Desktop apps (Electron и т.п.).`
}

module.exports = function topicList(lang) {
  return [
    new telegramTemplate.ChatAction('typing').get(),
    new telegramTemplate.Pause(1000).get(),
    new telegramTemplate.Text(list[lang]).get()
  ]
}
