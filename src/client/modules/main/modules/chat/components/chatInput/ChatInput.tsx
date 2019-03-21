import * as React from 'react'
import { AppState } from '../../../../../../models'
import { connect } from 'react-redux'


const mapStateToProps = (state: AppState, ownProps: OwnProps): ConnectedState => ({
    ctrlEnter: state.settings.ctrlEnter,
})

interface OwnProps {
    onSend: (UserMessage: string) => void
}

interface ConnectedState {
    ctrlEnter: boolean
}

interface OwnState {
    chatInput: string
}

export class ChatInputComponent extends React.Component<ConnectedState & OwnProps, OwnState> {

    state = {
        chatInput: ''
    }

    constructor(props?: ConnectedState & OwnProps) {
        super(props)

        this.keydownHandler = this.keydownHandler.bind(this)
    }

    keydownHandler(e: KeyboardEvent): void {

        // if CTRL+ENTER pressed
        if(e.code === 'Enter' && e.ctrlKey) {

            this.submitHandler()
        }
    }

    addKeyboardListener(): void {
        document.addEventListener('keydown', this.keydownHandler)
    }

    removeKeyboardListener(): void {
        document.removeEventListener('keydown', this.keydownHandler)
    }

    manageKeyBoardListener(): void {

        if (this.props.ctrlEnter) {

            this.addKeyboardListener()
        } else {

            this.removeKeyboardListener()
        }
    }

    componentDidUpdate(): void {

        this.manageKeyBoardListener()
    }

    componentDidMount(): void {

        this.manageKeyBoardListener()
    }

    componentWillUnmount(): void {

        this.manageKeyBoardListener()
    }

    textChangeHandler = (event: any): void => {

        this.setState({ chatInput: event.target.value })
    }

    submitHandler = () => {

        // if value is not empty
        if (this.state.chatInput.length) {

            // Call the onSend with the message text
            this.props.onSend(this.state.chatInput)

            // Clear the input
            this.setState({ chatInput: '' })
        }
    }

    render() {
        return (
            <form noValidate className="chat-input">
                <textarea
                       onChange={this.textChangeHandler}
                       value={this.state.chatInput}
                       placeholder="Write a UserMessage..."
                       required />
                <button onClick={this.submitHandler}>Submit</button>
            </form>
        )
    }
}

export const ChatInput: React.ComponentClass<OwnProps> = connect(mapStateToProps)(ChatInputComponent)
