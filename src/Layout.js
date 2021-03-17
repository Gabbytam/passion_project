import React from 'react';
import { Link } from 'react-router-dom';

function Layout(props) {
    return (
        <div>
            <nav>
                <li>
                <Link to={'/'} >
                    Home
                </Link>
                </li>

                <li>
                <Link to={'/pickforme'} >
                    Random!
                </Link>
                </li>
            </nav>

            <div className="main-page">{props.children}</div>
        </div>
    )
}

export default Layout
