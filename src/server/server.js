const server = require('http').createServer()
const io = require('socket.io')(server)

const handlers = require('./handlers')
const ClientManager = require('./ClientManager')

const clientManager = ClientManager()

io.on('connection', function (client) {
    const {
        handleConnection,
        handleUserChangeName,
        handleMessage,
        handleDisconnect
    } = handlers(client, clientManager)

    console.log('client connected...', client.id)

    // handling user connection and sending an init data to the client
    handleConnection()

    // handling user trying to change name
    client.on('userChangeName', handleUserChangeName)

    // handling user message
    client.on('message', handleMessage)

    // handling user disconnected
    client.on('disconnect', function () {
        console.log('client disconnect...', client.id)
        handleDisconnect()
    })

    // handling user error
    client.on('error', function (err) {
        console.error('received error from client:', client.id)
        console.log(err)
    })
})

server.listen(3000, function (err) {
    if (err) throw err
    console.log('listening on port 3000')
})
