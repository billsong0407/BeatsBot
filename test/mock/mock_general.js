
const Client = {
    servers: new Map()
}

const Guild ={
    id: 1234,
}

const TextChannel = {
    guild: null,
    content: null,
    send(content){
        this.content = content;
    },
}

const Message = {
    member: null,
    content: null,
    client: null,
    guild: null,
    channel: null,
    author: "TestUser1",
    reply(content){
        this.channel.content = content;
    },
}

const Member = {
    voice: {
        channel: null,
    },
}

const Connection = {
    dispatcher: {
        isPlaying: false,
        end() {
            this.isPlaying = true;
        }
    }
}

module.exports = {
    Client,
    Guild,
    TextChannel,
    Message,
    Member,
    Connection,
}
    
