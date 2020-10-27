import React from 'react';
import ClientSocket from 'socket.io-client';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        };
    }

    componentDidMount() {
        this.socket = new ClientSocket(process.env.API_URL);
        this.socket.on('new-message', (messages) => {
          this.setState(oldState => {
              return {messages: oldState.messages.concat(messages)}
          });
        });

        this.socket.on('general', (messages) => {
            this.setState(oldState => {
                return {messages: oldState.messages.concat(messages)}
            });
        });

        this.socket.on('private-message', (messages) => {
            this.setState(oldState => {
                return {messages: oldState.messages.concat(messages)}
            });
        });
    }

    render() {
        return (
            <div>
                Hola
            </div>
        );
    }
}

export default Index;