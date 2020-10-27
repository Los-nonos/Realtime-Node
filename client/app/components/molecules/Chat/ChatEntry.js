import React from 'react';

class ChatEntry extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p>
                    {this.props.message.user.name}: {this.props.message.content}
                </p>
            </div>
        )
    }
}

export default ChatEntry;