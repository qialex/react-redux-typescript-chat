const uuidv4 = require('uuid/v4')

module.exports = function () {

    // clients storage
    const clients = new Map()

    function getUserByClientId(clientId) {

        return (clients.get(clientId) || {}).user
    }

    function getUserByToken(token) {

        return ([...clients.values()].find((_) => _.token === token) || {}).user
    }

    function getUsers() {

        return [...clients.values()].map(_ => _.user)
    }

    function registerClient(client) {

        const user = {name: '', id: uuidv4()}

        const token = uuidv4()

        clients.set(client.id, {client, token, user})

        return [user, token]
    }

    function removeClient(client) {

        clients.delete(client.id)
    }

    function isUserAvailable(userName, messages) {

        return ![ ...clients.values()]
            .concat(messages)
            .filter(c => c.user)
            .find(c => c.user.name.toLowerCase() === userName.toLowerCase())
    }

    function getGuestNumber(messages) {

        const userNumbersArray = [ ...clients.values() ]
            .concat(messages)
            .filter(c => c.user && /^guest\w+$/i.test(c.user.name))
            .map(c => +c.user.name.split(/^guest/i)[1]).sort()

        let number
        for (let n = 1; n <= userNumbersArray[userNumbersArray.length - 1] + 1; n++) {
            if (!number && !userNumbersArray.find(_ => _ === n)) {
                number = n
                break
            }
        }

        return number || 1
    }

    function updateUserName(client, newName) {

        const user = getUserByClientId(client.id)

        console.log(getUsers())

        user.name = newName
    }

    return {
        getUserByToken,
        registerClient,


        removeClient,
        isUserAvailable,
        getUserByClientId,
        getUsers,
        updateUserName,
    }
}
