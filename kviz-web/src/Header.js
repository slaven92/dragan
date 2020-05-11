import React from 'react';

function Header(props) {
    const username = props.username ? props.username : "Anonimus"
    const isLogedIn = props.isLogedIn ? props.isLogedIn : false

    const loginUrl = isLogedIn ? "/accounts/logout/" : "/accounts/login/?next=/"
    const label = isLogedIn ? "Odjavi se" : "Prijavi se"

    if (isLogedIn === true) {
        return (
            <div>
                <nav className="navbar navbar-expand-lg  navbar-dark bg-primary">
                    <div className="navbar-brand">{username}</div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href={loginUrl}>{label}<span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item active">
                                <button className="nav-link btn btn-link" onClick={()=>props.onClick()}>Kreiraj pitanje<span className="sr-only">(current)</span></button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    } else {
        return (
            <div>
                <nav className="navbar navbar-expand-lg  navbar-dark bg-primary">
                    <div className="navbar-brand">{username}</div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href={loginUrl}>{label}<span className="sr-only">(current)</span></a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}
export default Header;