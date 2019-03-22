module.exports = function () {

    // saved messages count
    const SAVED_MESSAGES_COUNT = 10

    // messages storage
    let messages = []

    function getMessages() {

        // getting mesages
        return messages.slice()
    }

    function manageMessage(message) {

        // pushing new message
        messages.push(message)

        // removing old messages
        messages = messages.slice(-SAVED_MESSAGES_COUNT)
    }

    return {
        getMessages,
        manageMessage,
    }
}
