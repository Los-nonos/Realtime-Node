import React from 'react';
import ClientSocket from 'socket.io-client';
import ChatEntry from "../../components/molecules/Chat/ChatEntry";
import {connect} from 'react-redux';

class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            error: {},
            data: {},
            channel: 1,
            content: '',
        };
    }

    componentDidMount() {
        this.socket = new ClientSocket(process.env.API_URL);
        this.socket.emit('on-connection', this.props.userData.id);

        this.socket.on('general', data => {
            this.setState({
                data
            });
        });

        this.socket.on('messages', messages => {
            this.setState({messages});
        })

        this.socket.on('private-message', (messages) => {
            console.log(messages);
            this.setState({
                messages
            });
        });

        this.socket.on('error', error => {
            this.setState({error});
        })
    }

    sendMessage = (e) => {
        e.preventDefault();

        const fields = ['content'];

        const formElements = e.target.elements;
        let data = fields.map(field => ({
            [field]: formElements.namedItem(field).value
        })).reduce((current, next) => ({...current, ...next}));

        data = {...data, channelId: this.state.channel, userId: 1};
        this.socket.emit('new-message', data);
        this.setState(oldState => {
            return {...oldState, content: ''};
        });
    };

    render() {
        return (
            <>
                {this.state.error ? this.state.error.message : ''}
                <select onChange={(data) => {
                    this.setState({channel: data.target.value})
                }}>
                    {this.state.data.channels ? this.state.data.channels.map(channel => {
                        return (
                            <option value={channel.id}>{channel.name}</option>
                        )
                    }) : null}
                </select>
                <div>
                    {this.state.messages.map(message => {
                        return <ChatEntry message={message}/>
                    })}
                </div>
                <form onSubmit={this.sendMessage}>
                    <input name={'content'} value={this.state.content} onChange={(data) => {
                        this.setState({content: data.target.value});
                    }} type={'text'} placeholder={'Escribe tu mensaje aquí...'}/>
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