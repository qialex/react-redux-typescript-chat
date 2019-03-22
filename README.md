# React Redux Typescript Chat
React Redux Typescript Chat


### Messages
#### Unread messages count
Displayed in top menu. While user is on a **settings** page all messages that he/she receiving counted as unread. When he/she will back on a chat page, all messages will be count as read   

#### Message date
1. there is a setting to define weather to display date in _12h_ or _24h_ 
2. `moment.js` is used to display dates
3. There is a **clever** date. 
   1. If message was sent less than _3 minutes ago_, than date will displayed using `moment.fromNow()` method.
   2. While message is _fresh_ (defined in `Message.isMessageQuiteFresh`) a `Message` component will be re-rendered every _15_ seconds. So we will see _just now_, _1 minute age_ etc
   3. `moment.locale()` is also managed, so user will see _just now_ etc in different languages 

#### Message body
1. Link parser
2. At first whole text will be displayed. URLs will be replaced by links. below a text:
    2. Youtube link parser - will appear as video
    3. Images link parser - will appear as image
    4. Multiple links, youtube links, image links are allowed _without any restrictions_

### Localization
**react-localization** ([npm](https://www.npmjs.com/package/react-localization)) is used for localization. 2 supported languages.

### Settings
All settings (except `Username`) are stored in `localStorage`.  
1. **Username** - user can pick any name if this name is not occupied by other user
2. **Interface color** - scss `@mixins` are used for theming
3. **Clock display** - 12/24 hours format
4. **CTRL+ENTER** - send message on CTRL+ENTER
5. **Language** - select box 
6. **Reset Settings** - button. First click changing text to a _confirmation_. If second click will happen in 5 seconds it will reset settings.    


### By design restriction
1. We guess that server is **always** working. There is no handler for a disconnects, unreachable server etc.
2. User story: "while user is on setting page he/she received let's say 100 messages. Any count more that one screen can display". Better practice would be to count message as _read_ only when it's appears on a user's screen. But as for now, **all** messages will be counted as _read_ when he/she will return to a chat page 
