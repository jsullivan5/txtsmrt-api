[![CircleCI](https://circleci.com/gh/jsullivan5/txtsmrt-api/tree/master.svg?style=svg)](https://circleci.com/gh/jsullivan5/txtsmrt-api/tree/master)

# txtSmrt API Tutorial (Under Construction)

This project, under construction, uses Twilio and Watson to take some of the guesswork out of reading text messages.  Users can text content to a Twilio number and receive setinment analysis from Watson, gaining insights into their texts.  This API also interfaces with a decoupled UI that allows users to see their history and view community submitted content.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

```
git
```

```
npm
```

### Installing

```
$ git clone git@github.com:jsullivan5/txtsmrt-api.git

```

```
$ npm install
```

Start Dev Server:

```
$ npm start
```

## Running the tests

```
$ npm test
```

### Break down into end to end tests

Test are written with Mocha, Chai, and Sinon

## Built With

* [Express](https://expressjs.com/)
* [Twilio](https://www.twilio.com/docs/?pdv=c&pcrid=232791460976&pmt=b&pkw=%2Btwilio&campaign=G_S_Brand_Beta_NA&utm_source=google&utm_medium=cpc&utm_term=%2Btwilio&utm_campaign=G_S_Brand_Beta_NA&utm_content=Brand&gclid=Cj0KCQiA5t7UBRDaARIsAOreQtgxUP3qeECYZpzvhnMoynU-oQ2utftR1jcRUJeFKCK4GPwu6zXlfC8aAmZqEALw_wcB) - Text Messaging
* [IBM Watson](https://console.bluemix.net/developer/watson/documentation) - Sentiment Analysis


