import React from 'react';
import {Navbar, NavItem, Icon} from 'react-materialize';
import {connect} from "react-redux";
import {logIn} from "../redux/actions";


class NavBar extends React.Component {


    render() {
        return (
            <Navbar brand={<a>ayy</a>} alignLinks="right">
                <NavItem href="get-started.html">
                    <Icon>
                        search
                    </Icon>
                </NavItem>
                <NavItem href="get-started.html">
                    <Icon>
                        view_module
                    </Icon>
                </NavItem>
                <NavItem href="get-started.html">
                    <Icon>
                        refresh
                    </Icon>
                </NavItem>
                <NavItem href={this.state} onClick={() => {
                    console.log(this.props.user);
                    this.props.logIn("test");
                }}>
                    <Icon>
                        person
                    </Icon>
                </NavItem>
            </Navbar>
        )
    }


}

const mapStateToProps = state => {
    return state;
};


export default connect(mapStateToProps, {logIn})(NavBar);
