module.exports = function (client, clientManager, messageManager) {

    function handleConnection() {

        const otherUsers = clientManager.getUsers()

        const messages = messageManager.getMessages()

        const user = clientManager.registerClient(client, messages)

        client.emit('initData', {user, otherUsers, messages})

        client.broadcast.emit('otherUserJoined', user)
    }

    function handleUserChangeName(user, callback) {

        const messages = messageManager.getMessages()

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
        messageManager.manageMessage(message)

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
        handleConnection,
        handleUserChangeName,
        handleMessage,
        handleDisconnect
    }
}
