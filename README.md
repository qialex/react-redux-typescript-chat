# React Redux Typescript Chat
React Redux Typescript Chat


### Message date
1. there is a setting to define weather to display date in _12h_ or _24h_ 
2. `moment.js` is used to display dates
3. There is a **clever** date. 
   1. If message was sent less than _3 minutes ago_, than date will displayed using `moment.fromNow()` method.
   2. While message is _fresh_ (defined in `Message.isMessageQuiteFresh`) a `Message` component will be re-rendered every _15_ seconds. So we will see _just now_, _1 minute age_ etc
   3. `moment.locale()` is also managed, so user will see _just now_ etc in different languages 

### Localization
react-localization ([npm](https://www.npmjs.com/package/react-localization)) is used for localization. 2 supported languages: English and Russian.
