import * as React from 'react'
import { connect } from 'react-redux'
import EmojiPicker from 'emoji-picker-react'

import { AppState } from '../../../../../../models'

import './chatInput.scss'


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
    isEmojiPickerVisible: boolean
}

export class ChatInputComponent extends React.Component<ConnectedState & OwnProps, OwnState> {

    state = {
        chatInput: '',
        isEmojiPickerVisible: false
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

    submitHandler = (event?: any) => {

        if (event && event.preventDefault) {

            // prevent default
            event.preventDefault()
        }


        // if value is not empty
        if (this.state.chatInput.length) {

            // Call the onSend with the message text
            this.props.onSend(this.state.chatInput)

            // Clear the input
            this.setState({ chatInput: '' })
        }
    }

    myCallback(event: any) {
        console.log(event)
    }

    emojiPickerToggleHandle() {
        this.setState({isEmojiPickerVisible: !this.state.isEmojiPickerVisible})
    }

    render() {
        return (
            <div className="chat-input-wrapper">
                <form noValidate>
                    <div className="emoji-toggle-icon" onClick={this.emojiPickerToggleHandle.bind(this)}>
                        +
                    </div>
                    <textarea
                           onChange={this.textChangeHandler}
                           value={this.state.chatInput}
                           placeholder="Write a UserMessage..."
                           required />
                    <div className="send-button" onClick={this.submitHandler}>Submit</div>
                </form>

                { this.state.isEmojiPickerVisible ?
                    <EmojiPicker onEmojiClick={this.myCallback} />
                    : '' }
            </div>
        )
    }
}

export const ChatInput: React.ComponentClass<OwnProps> = connect(mapStateToProps)(ChatInputComponent)
