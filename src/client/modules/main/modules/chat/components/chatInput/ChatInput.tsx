import * as React from 'react'

interface OwnProps {
    onSend: (UserMessage: string) => void
}

interface OwnState {
    chatInput: string
}

export class ChatInput extends React.Component<OwnProps, OwnState> {

    state = {
        chatInput: ''
    }

    textChangeHandler = (event: any) => {
        this.setState({ chatInput: event.target.value })
    }

    submitHandler = (event: any) => {

        // prevent page refresh
        event.preventDefault();

        // Call the onSend with the message text
        this.props.onSend(this.state.chatInput)

        // Clear the input
        this.setState({ chatInput: '' })
    }

    render() {
        return (
            <form className="chat-input" onSubmit={this.submitHandler}>
                <input type="text"
                       onChange={this.textChangeHandler}
                       value={this.state.chatInput}
                       placeholder="Write a UserMessage..."
                       required />
            </form>
        )
    }

}
