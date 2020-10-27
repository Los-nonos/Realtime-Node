import React from 'react';
import ClientSocket from 'socket.io-client';
import ChatEntry from "../../components/molecules/Chat/ChatEntry";
import {connect} from 'react-redux';

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

        /*this.socket.on('new-message', (messages) => {
            this.setState(oldState => {
                return {messages: oldState.messages.concat(messages)}
            });
        });*/

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

    sendMessage = (e) => {
        e.preventDefault();

        const fields = ['content'];

        const formElements = e.target.elements;
        let data = fields.map(field => ({
            [field]: formElements.namedItem(field).value
        })).reduce((current, next) => ({...current, ...next}));

        data = {...data, channelId: 1, userId: 1};
        this.socket.emit('new-message', data);
    };

    render() {
        return (
            <>
                <div>
                    {this.state.messages.map(message => {
                        return <ChatEntry message={message}/>
                    })}
                </div>
                <form onSubmit={this.sendMessage}>
                    <input name={'content'} type={'text'} placeholder={'Escribe tu mensaje aquí...'}/>
                    <input name={'channel'} type={'text'} placeholder={'A que canal?'}/>
                    <input value={'Enviar'} type={'submit'}/>
                </form>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {...state.login, ...state.generalReducer};
}

export default connect(mapStateToProps)(Index);