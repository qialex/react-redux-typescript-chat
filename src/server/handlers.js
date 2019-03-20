module.exports = function (client, clientManager) {

    function handleConnection() {

        const otherUsers = clientManager.getUsers()

        const user = clientManager.registerClient(client)

        client.emit('initData', {user, otherUsers})

        client.broadcast.emit('otherUserJoined', user)
    }

    function handleUserChangeName(user, callback) {

        if (clientManager.isUserAvailable(user.name)) {

            clientManager.updateUserName(client, user.name)

            const storedUser = clientManager.getUserByClientId(client.id)

            client.broadcast.emit('userChangedName', storedUser)

            return callback(true)

        } else {

            return callback(false)
        }
    }

    function handleMessage(message, callback) {

        // const createEntry = () => ({ message })
        //
        // handleEvent(chatroomName, createEntry)
        //     .then(() => callback(null))
        //     .catch(callback)
        //
        // if (!message.user) {
        //     message.user = clientManager.registerClient(client)
        // }
        //
        // socket.broadcast.emit('message', message)
        client.broadcast.emit('message', message)

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
