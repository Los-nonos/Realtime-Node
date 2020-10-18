const socket = io.connect('http://localhost:8080', {'forceNew': true});

let author = '';

socket.on('messages', function(data) {
  console.log(data);
  render(data);
});

socket.on('general', function (data) {
    console.log(data);
    render(data);
})

socket.on('private-message', function(data) {
    console.log("conversation private post");
    console.log(data);
    render(data);
});

function render (data) {
    document.getElementById('messages').innerHTML = data.map(function (elem, index) {
      return (
        `<div>
          <strong>${elem.author}</strong>:
          <em>${elem.text}</em>
        </div>`
      );
    }).join(" ");
}

function addMessage(e) {
    if (!author) {
        author = document.getElementById('username').value;
    }
    const room = document.getElementById('to').value;

    const message = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value,
        room
    };

    console.log(message);
    socket.emit('new-message', message);
  return false;
}

function subscribeToNewChannel(e) {
    const name = document.getElementById('channel-name').value;

    socket.emit('subscribe', name);
    return false;
}