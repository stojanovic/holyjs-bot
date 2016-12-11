# Telegram bot for HolyJS conference

Simple chatbot build with Claudia bot builder for HolyJS conference.

## How to use it

Message @holyjs_bot on Telegram. It's just a temporary name, final version will have a different username.

Link: https://telegram.me/holyjs_bot

## Presentation

My presentation for a HolyJS conference 2016 is available [here](https://speakerdeck.com/slobodan/dr-strangelove-or-how-i-learned-to-stop-worrying-and-love-the-serverless-chatbots-holyjs-2016).

Full keynote file with videos is (or will be) available [here](https://dl.dropboxusercontent.com/u/63393755/Slobodan/DrStrangelove-HolyJS-2016.key).

## Contribute

Feel free to send any pull requests and improve the bot.

### Send PR

At the moment there are no tests, so we'll need to check if everything works manually :)

Best way to see what is going on is to check the code and the presentation from HolyJS conference (link above).

### Run it on your telegram account

To run it as your own telegram do following:

1. Clone this repository.
2. Create Telegram bot with [Bot Father](https://core.telegram.org/bots#6-botfather).
3. Create DynamoDB table and add policy.
4. Create API.ai app.
5. Create a new lambda function by running `claudia create --region eu-central-1 --api-module bot --configure-telegram-bot --configure-bot` .
6. Paste you telegram token, Dynamo DB name and API.ai token.
7. Talk to your HolyJS bot :)

## License

MIT
