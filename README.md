# React Redux Typescript Chat
React Redux Typescript Chat app

##Setup
1. Make sure you use **Node.js** version **10.15.3** and **NPM** version **6.4.1**
2. `npm i`
4. `npm start-server` - It should create a server on `localhost:3000`. Keep it running. 
5. `npm start` - In a separate terminal. It should open `localhost:3005`


## Server
1. Custom server.
2. When user joining server will send up to 10 previous messages.
3. server is listening and broadcasting following events: joining new users, changing user name, new message.

## App

### Localization
**react-localization** ([npm](https://www.npmjs.com/package/react-localization)) is used for localization. 2 supported languages.

### Top menu
Two links on _Chat_ and _Settings_, active is underlined.
##### Unread messages count
Displayed in top menu. While user is on a **settings** page all messages that he/she receiving counted as unread. When he/she will back on a chat page, **all** messages will be count as read   

## Chat Page

### Messages
Own messages displayed on the right, the reset - on the left.

##### Message date
1. there is a setting to define weather to display date in _12h_ or _24h_ 
2. `moment.js` is used to display dates
3. There is a **clever** date. 
   1. If message was sent less than _3 minutes ago_, than date will displayed using `moment.fromNow()` method.
   2. While message is _fresh_ (defined in `Message.isMessageQuiteFresh`) a `Message` component will be re-rendered every _15_ seconds. So we will see _just now_, _1 minute age_ etc
   3. `moment.locale()` is also managed, so user will see _just now_ etc in different languages 

##### Message body
1. Link parser. Whole text will be displayed. URLs will be replaced by links.
3. Below a text:
    2. Youtube link parser - will appear as video
    3. Images link parser - will appear as image (no popup for a fullscreen image)
    4. Multiple links, youtube links, image links are allowed _without any restrictions_

#### Input message
1. emoji picker
   1. icon will not appear if screen height less than `500px`)
   2. emoji picker will be displayed above the message input if screen `width` is more than `300px`
2. Textarea. Will auto increase height up to 5 lines. Auto focused after a sending message.
3. Send button working on click or CTRL+ENTER (if turned on in _Settings_)

## Settings Page
All settings (except `Username`) are stored in `localStorage`.  
1. **Username** - user can pick any name if this name is not occupied by other user
2. **Interface color** - scss `@mixins` are used for theming
3. **Clock display** - 12/24 hours format
4. **CTRL+ENTER** - send message on CTRL+ENTER
5. **Language** - select box 
6. **Reset Settings** - button. First click changing text to a _confirmation_. If second click will happen in 5 seconds it will reset settings.    

## Restriction by design
1. We agree that server is **always** working. There is no handler for a disconnects, unreachable server etc.
2. No user recognition and sessions storage
3. No handling of manual url #hash manipulations
4. No limit for a message length and attached Yutube and Image medias
5. We agree that browser correctly display Unicode Emoji. It's being displayed as unicode chars (🦄) without any additional libraries.
6. Emoji picker isn't translated as well as skinned
7. User story: "while user is on setting page he/she received let's say 100 messages. Any count more that one screen can display". Better practice would be to count message as _read_ only when it's appears on a user's screen. But as for now, **all** messages will be counted as _read_ when he/she will return to a chat page

