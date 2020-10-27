import React from 'react';
import ClientSocket from 'socket.io-client';
import ChatEntry from "../../components/molecules/Chat/ChatEntry";
import { connect } from 'react-redux';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        };
    }

    componentDidMount() {
        this.socket = new ClientSocket(process.env.API_URL);
        this.socket.emit('on-connection', this.props.userData.id);

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
            <>
                <div>
                    {this.state.messages.map(message => {
                        return <ChatEntry message={message}/>
                    })}
                </div>
                <form>
                    <input name={'content'} type={'text'} placeholder={'Escribe tu mensaje aquí...'} />
                    <input name={'channel'} type={'text'} placeholder={'A que canal?'} />
                </form>
            </>
        );
    }
}

const mapStateToProps = state => {
    return { ...state.login, ...state.generalReducer };
}

export default connect(mapStateToProps)(Index);