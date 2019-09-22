import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import { GET_ALL_COURSES } from '../graphQL/queries';
import { OptNames } from '../constants/gqlOptNames';
import Spinner from '../shared/Spinner';

const renderCourses = ({data, loading, error}) => {
    if (loading) return <Spinner />
    if (error) return <div>error</div>
    return data[OptNames.courses].map((el, idx) => {
        return (
            <div key={idx}>
                <p>Name: {el.name}</p>
                <p>Description: {el.description}</p>
            </div>
        )
    })
}

const Courses = (props) => {
    return (
        <div>
            <Query
                query={GET_ALL_COURSES}
            >
                {renderCourses}
            </Query>
        </div>
    )
}

Courses.propTypes = {}

export default Courses;
