module.exports = function () {

    // clients storage
    const clients = new Map()

    function registerClient(client, messages) {

        const user = {name: `guest${getGuestNumber(messages)}`, clientId: client.id}

        clients.set(client.id, { client, user })

        return user
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

    function getUserByClientId(clientId) {

        return (clients.get(clientId) || {}).user
    }

    function updateUserName(client, newName) {

        clients.set(client.id, { client, user: {clientId: client.id, name: newName } })
    }

    function getUsers() {

        return [...clients.values()].map(_ => _.user)
    }

    return {
        registerClient,
        removeClient,
        isUserAvailable,
        getUserByClientId,
        getUsers,
        updateUserName,
    }
}
