import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

import { rls } from '../constants/routesNlinks';

const AppNavbars = (props) => {
    return (
        <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
            <Navbar.Brand to={rls.landing}>React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink className="nav-link" to={rls.landing} exact>Courses</NavLink>
                    <NavLink className="nav-link" to={rls.cc}>Create Course</NavLink>
                    <NavLink className="nav-link" to={rls.custQuery}>Custom Client Query</NavLink>
                    <NavLink className="nav-link" to={rls.editCourse}>Edit Course</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

AppNavbars.propTypes = {}

export default AppNavbars;
