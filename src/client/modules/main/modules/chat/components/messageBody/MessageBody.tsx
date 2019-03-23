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

        const mediaChunks: TextChunk[] = this.state.parsedMessage
            .filter((textChunk: TextChunk) => textChunk.isMedia)

        if (!mediaChunks.length) {
            return
        }

        const additions = mediaChunks.map((textChunk: TextChunk, i: number) => (

                <div key={i} className="media-item">
                    <div className="media-url">
                        <a href={textChunk.text}>{textChunk.text}</a>
                    </div>
                    <div className="media-content">
                        {
                            textChunk.youtubeId ?
                                <div className="youtube-content">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${textChunk.youtubeId}`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen>
                                    </iframe>
                                </div>

                                :

                                <div className="media-image">
                                    <img alt={textChunk.text} src={textChunk.text} />
                                </div>
                        }
                    </div>
                </div>
            ))

        return (
            <div className="media-wrapper">
                {additions}
            </div>
        )
    }

    render() {

        return (
            <div className="message-body">
                <div className='message-body-text'>
                    {this.getMessageText()}
                </div>

                {this.getMediaAdditions()}

            </div>
        )
    }
}
