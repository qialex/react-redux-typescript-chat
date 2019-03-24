const uuidv1 = require('uuid/v1')

module.exports = function (client, clientManager) {

    function handleJoin(token, callback) {

        console.log(clientManager.getUsers())

        let user = clientManager.getUserByToken(token)

        if (!user) {
            [ user, token ] = clientManager.registerClient(client)
        }

        // const otherUsers = clientManager.getUsers()
        //
        // // const messages = messageManager.getMessages()
        // const messages = []
        //
        // const user = clientManager.registerClient(client)
        //
        // client.emit('initData', {user, otherUsers, messages})

        client.broadcast.emit('otherUserJoined', user)

        const messages = []
        const otherUsers = []
        const uiClient = { token, user }

        callback({client: uiClient, otherUsers, messages})
    }

    function handleUserChangeName(user, callback) {

        // const messages = messageManager.getMessages()
        const messages = []

        if (clientManager.isUserAvailable(user.name, messages)) {

            clientManager.updateUserName(client, user.name)

            const storedUser = clientManager.getUserByClientId(client.id)

            client.broadcast.emit('userChangedName', storedUser)

            return callback(true)

        } else {

            return callback(false)
        }
    }

    function handleMessage(message, callback) {

        // adding new message and removing old ones
        // messageManager.manageMessage(message)

        // sending message to the other users
        client.broadcast.emit('message', message)

        // returning callback to a current user to ensure him/she that message successfully received
        return callback(true)
    }

    function handleDisconnect() {

        // remove user profile
        clientManager.removeClient(client)
    }

    return {
        handleJoin,
        handleUserChangeName,
        handleMessage,
        handleDisconnect
    }
}
