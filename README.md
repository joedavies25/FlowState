# Flow State

Flow state is an app designed for those who love watersports and need an easy, real time display of the waterlevels in the UK . Flow state now allows you to save your most frequently visited locations so that you can quickly gauge the waterlevels instead of searching for them on the map.

<p align='center'>
  <img width='50%' src='./Images/map.png'><img width='50%' src='./Images/saved.png'>
</p>

## Video
Here's a short [demo](https://www.youtube.com/watch?v=oXYnGpOsYNw)!

## Getting Started

In order to work on Flow State you will need a couple of things:

- [Expo](https://docs.expo.io/) -  the Expo development environment.

   `npm install -g expo-cli`

- Local [Mongodb](https://docs.mongodb.com/manual/installation/) database - To store static data

- IOS Device or [emulator](https://apps.apple.com/us/app/xcode/id497799835?mt=12)

## Installation

1. Fork and clone this repo

2. Install dependancies

   `npm run install`
   
3. Start mongodb service

  `sudo service mongodb start`
  or
  `brew services start mongodb-community`

4. Run scraper

   `npm run scraper`

4. Start server

   `npm start-server`

5. start client

   `npm start-client`

6. Connect to expo with ios emulator or with an ios phone and the [Expo App](https://apps.apple.com/gb/app/expo-go/id982107779)

## Tech Stack
- React Native (expo)
- TypeScript
- Express
- Mongoose
- Mongodb
- Jest

## Observations
In the future I plan to add functionality for **separate users** to have their own unique saved locations.
I'm also planning to increase the amount of information that the user can access in such a way as **not to overwhelm** them.


