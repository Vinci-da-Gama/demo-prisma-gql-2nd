import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import { rls } from '../constants/routesNlinks';
import Courses from '../containers/Courses';
import CreateCourse from '../containers/createCourse';
import CustClientQuery from '../components/customApolloRender';

const Routes = (props) => (
    <Switch>
        <Route exact path={rls.landing} component={Courses} />
        <Route path={rls.cc} component={CreateCourse} />
        <Route path={rls.custQuery} component={CustClientQuery} />
    </Switch>
)

Routes.propTypes = {}

export default Routes;
