const io = require('socket.io')(8000,{cors: {origin:"*"}});

let totalVotes = 0;
let votingPolls = {
    'mancity': 0,
    'manutd': 0,
}

io.on('connection', socket =>{
    socket.emit('update',{votingPolls, totalVotes})
    socket.on('send-me-vote',voteTo =>{
        totalVotes += 1;
        console.log(voteTo)
        votingPolls[voteTo] += 1;
        socket.broadcast.emit('recieve-vote',{votingPolls,totalVotes});
        socket.emit('update',{votingPolls,totalVotes})
    })
})