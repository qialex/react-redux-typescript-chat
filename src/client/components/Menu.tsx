import * as React from 'react'
import { Link } from "react-router-dom"


export class Menu extends React.Component {

    render() {
        return (
            <span>
                <Link to="/">Chat</Link>
                <Link to="/settings">Settings</Link>
            </span>
        )
    }
}
