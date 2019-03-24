import * as React from 'react'

import './radioButton.scss'


interface OwnProps {
    name: string,
    checked: boolean,
    value: string,
    label: string,
    onChange: () => void
}

interface OwnState {
    id: string
}

export class RadioButton extends React.Component<OwnProps, OwnState> {

    state: OwnState = {
        id: `id_${Math.random() * 100000000 << 0}`
    }

    render() {
        return (
            <div className="md-radio md-radio-inline">
                <input
                    type="radio"
                    id={this.state.id}
                    name={this.props.name}
                    checked={this.props.checked}
                    value={this.props.value}
                    onChange={this.props.onChange}/>

                <label htmlFor={this.state.id}>
                    {this.props.label}
                </label>
            </div>
        )
    }
}
