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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<table>
  <tr>
    <td align="center"><a href="https://github.com/joedavies25"><img src="https://user-images.githubusercontent.com/62357077/113481482-bc954500-9491-11eb-8db1-34759253a569.png" width="120px;" alt=""/><br /><sub><b><a href="https://www.linkedin.com/in/joe-davies-2b198220a/" title="linkedin">Joe Davies</a></b></sub></a><br /><a href="https://github.com/hectorkd/typerspace-client/commits?author=joedavies25" title="Code">💻</a><a href="#design-hector" title="Design">🎨</a> <a href="https://youtu.be/oXYnGpOsYNw" title="Videos">📹</a></td>
    <td align="center"><a href="https://github.com/marlukyanova"><img src="https://user-images.githubusercontent.com/62357077/113480026-24e02880-948a-11eb-9220-80f76d7796a0.jpg" width="120px;" alt=""/><br /><sub><b><a href="https://www.linkedin.com/in/marlukyanova/" title="linkedin">Maria Lukyanova</a></b></sub></a><br /><a href="https://github.com/joedavies25/FlowState/commits?author=marlukyanova" title="Code">💻</a><a href="https://github.com/joedavies25/FlowState/commits?author=marlukyanova" title="testing">⚠️</a> </td>
     <td align="center" ><a href="https://github.com/hectorkd"><img src="https://user-images.githubusercontent.com/62357077/113482749-f9fcd100-9497-11eb-8a54-b767e5a7b614.JPG" width="120px;" alt=""/><br /><sub><b><a href="https://www.linkedin.com/in/hector-kennedy-dyson/" title="linkedin">Hector Kennedy-Dyson</a></b></sub></a><br /><a href="https://github.com/joedavies25/FlowState/commits?author=hectorkd" title="Code">💻</a><a href="https://github.com/joedavies25/FlowState/commits?author=hectorkd" title="testing">⚠️</a></td>
  </tr>
</table>
