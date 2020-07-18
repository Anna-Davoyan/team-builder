import React, {Component} from 'react';
import Main from "./Menu";
import {connect} from "react-redux";


class Header extends Component {
    render() {
        return (
            <Main/>
        )
    }

}

const mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps)(Header);