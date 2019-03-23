import * as React from 'react'

import './messageBody.scss'

interface TextChunk {
    text: string
    isUrl: boolean
    isMedia?: boolean
    youtubeId?: string
}

interface OwnProps {
    message: string
}

interface OwnState {
    parsedMessage: TextChunk[]
}

export class MessageBody extends React.Component<OwnProps, OwnState>{

    state: OwnState = {
        parsedMessage: MessageBody.parseMessage(this.props.message),
    }

    static parseMessage(text: string): TextChunk[] {

        // regex
        const urlRegex = /(https?:\/\/[^\s]+)/g

        // looping text
        return text.split(urlRegex).map((part: string) => {

            const result: TextChunk = {
                text: part,
                isUrl: false,
            }

            if (!urlRegex.test(part)) {
                return result;
            }

            result.isUrl = true

            const youtubeVideoId = MessageBody.extractYoutubeVideoID(part)
            if (youtubeVideoId) {
                result.isMedia = true
                result.youtubeId = youtubeVideoId
                return result
            }

            if(MessageBody.isUrlImage(part)) {
                result.isMedia = true
                return result
            }

            return result
        }).filter((textChunk: TextChunk) => textChunk.text)
    }

    static extractYoutubeVideoID(url: string): string {

        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/

        const match = url.match(regExp)

        if ( match && match[7].length == 11 ){

            return match[7]
        } else {
            return ''
        }
    }

    static isUrlImage(url: string): boolean {

        return /^http:\/\/.+\.(gif|png|jpg|jpeg)$/i.test(url)
    }

    getMessageText() {
        return this.state.parsedMessage.map((textChunk: TextChunk, i: number) => (
            textChunk.isUrl ? <a key={i} href={textChunk.text}>{textChunk.text}</a>
                : <span key={i}>{textChunk.text}</span>
        ))
    }

    getMediaAdditions() {
        return this.state.parsedMessage
            .filter((textChunk: TextChunk) => textChunk.isMedia)
            .map((textChunk: TextChunk, i: number) => (
                !textChunk.youtubeId ? <img key={i} alt={textChunk.text} src={textChunk.text} />
                    : <div key={i} className="youtube-frame">
                        <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${textChunk.youtubeId}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                        </iframe>
                    </div>
            ))
    }

    render() {

        return (
            <div className="message-body">
                <div className='message-body-text'>
                    {this.getMessageText()}
                </div>
                <div className="message-body-medias">
                    {this.getMediaAdditions()}
                </div>
            </div>
        )
    }
}
