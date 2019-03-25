import * as React from 'react'
import { connect } from 'react-redux'
import EmojiPicker from 'emoji-picker-react'

import { AppState } from '../../../../../../models'

import './chatInput.scss'
import {ChangeEvent, SyntheticEvent} from "react";
import {L} from "../../../../../../utils";


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
    caretPosition: number
}

export class ChatInputComponent extends React.Component<ConnectedState & OwnProps, OwnState> {

    state = {
        chatInput: '',
        isEmojiPickerVisible: false,
        caretPosition: 0,
    }

    constructor(props?: ConnectedState & OwnProps) {
        super(props)

        this.keydownHandler = this.keydownHandler.bind(this)
        this.emojiPickerClickOutsideHandler = this.emojiPickerClickOutsideHandler.bind(this)
    }

    focusChatTextarea(): void {

        const el: HTMLTextAreaElement = document.querySelector('.chat-textarea')
        if (el) {
            el.focus()
            el.setSelectionRange(this.state.caretPosition, this.state.caretPosition)
        }
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

        this.focusChatTextarea()
    }

    componentDidMount(): void {

        this.manageKeyBoardListener()

        this.focusChatTextarea()
    }

    componentWillUnmount(): void {

        this.manageKeyBoardListener()
    }

    textChangeHandler = (event: SyntheticEvent): void => {

        // getting target
        const textarea: HTMLTextAreaElement = event.target as HTMLTextAreaElement

        // changing value and saving cursor position
        this.setState({ chatInput: textarea.value, caretPosition: textarea.selectionStart })
    }

    submitHandler = () => {

        const value: string = this.state.chatInput.trim()

        // if value is not empty
        if (value.length) {

            // Call the onSend with the message text
            this.props.onSend(value)

            // Clear the input
            this.setState({ chatInput: '' })
        }
    }

    myCallback(emojiCode: string) {

        // getting unicode emoji
        const emojiUniCode: string = String.fromCodePoint(+`0x${emojiCode}`)

        // inserting into a value
        const newValue: string =
            this.state.chatInput.slice(0, this.state.caretPosition)
            + emojiUniCode
            + this.state.chatInput.slice(this.state.caretPosition)

        const caretPosition = this.state.caretPosition + emojiUniCode.length

        // setting value, closing, emoji panel
        this.setState({chatInput: newValue, caretPosition})

        // closing emoji
        if (this.state.isEmojiPickerVisible) {
            this.emojiPickerToggleHandle()
        }
    }

    emojiPickerToggleHandle() {

        // managing closing emoji on click outside of it
        if (this.state.isEmojiPickerVisible) {

            document.removeEventListener('click', this.emojiPickerClickOutsideHandler)
            document.removeEventListener('tap', this.emojiPickerClickOutsideHandler)
        } else {

            document.addEventListener('click', this.emojiPickerClickOutsideHandler)
            document.addEventListener('tap', this.emojiPickerClickOutsideHandler)
        }

        this.setState({isEmojiPickerVisible: !this.state.isEmojiPickerVisible})
    }

    emojiPickerClickOutsideHandler(event: MouseEvent) {

        if (!(event.target as HTMLElement).closest('.emoji-picker-wrapper')) {

            this.emojiPickerToggleHandle()
        }
    }

    getTextAreaRowsCount(): number {
        return Math.min(this.state.chatInput.split(/\n/).length, 5)
    }


    render() {
        return (
            <div className="chat-input-wrapper">
                <div className="chat-input-panel">
                    <div className="emoji-toggle-icon" onClick={this.emojiPickerToggleHandle.bind(this)}>
                        🙂
                    </div>
                    <textarea
                           rows={this.getTextAreaRowsCount()}
                           className="chat-textarea"
                           onChange={this.textChangeHandler}
                           onSelect={this.textChangeHandler}
                           value={this.state.chatInput}
                           placeholder={L.writeAMessage}/>
                    <div className="send-button" onClick={this.submitHandler}>{L.send}</div>
                </div>

                { this.state.isEmojiPickerVisible ?
                    <div className="emoji-picker-wrapper">
                        <EmojiPicker preload onEmojiClick={this.myCallback.bind(this)} />
                    </div>
                    : '' }
            </div>
        )
    }
}

export const ChatInput: React.ComponentClass<OwnProps> = connect(mapStateToProps)(ChatInputComponent)
