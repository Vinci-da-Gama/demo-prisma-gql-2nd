import React from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import { GET_ALL_COURSES } from '../graphQL/queries';
import { DELETE_COURSE } from '../graphQL/mutations';
import { OptNames } from '../constants/gqlOptNames';
import { storageStr } from '../constants/storageConst';
import Spinner from '../shared/Spinner';
import ErrMsg from '../shared/ErrorMessage';

const renderCourses = ({ data, loading, error }) => {
    if (loading) return <Spinner />
    if (error) return <ErrMsg error={error} />

    const updateAfterDelete = (cache, { data: { deleteCourse } }) => {
        // console.log('19 -- cache: ', cache)
        const { courses } = cache.readQuery({
            query: GET_ALL_COURSES
        });
        console.log('28 -- courses: ', courses)
        cache.writeQuery({
            query: GET_ALL_COURSES,
            data: {
                courses: courses.filter((el, idx) => el.id !== deleteCourse.id)
            }
        })
    }

    return data[OptNames.courses].map((el, idx) => {
        return (
            <Card key={`${idx}_${el.name}`}>
                <Card.Title>
                    {el.name}
                </Card.Title>
                <Card.Body>
                    Description: <Card.Text>{el.description}</Card.Text>
                    {
                        localStorage.getItem(storageStr.utk) ? (
                            <>
                                <Link
                                    to={`/course/${el.id}/edit`}
                                    className="btn btn-primary"
                                >
                                    Edit
                                </Link>
                                <Mutation
                                    mutation={DELETE_COURSE}
                                    variables={{
                                        where: { id: el.id }
                                    }}
                                    update={updateAfterDelete}
                                >
                                    {(deleteCourse, { data, loading, error }) => {
                                        if (loading) return <Spinner />
                                        if (error) return <ErrMsg error={error} />
                                        return (
                                            <Button
                                                className="ml-1"
                                                variant="danger"
                                                onClick={async (event) => {
                                                    await deleteCourse()
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        )
                                    }}
                                </Mutation>
                            </>
                        ) : null
                    }
                </Card.Body>
            </Card>
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
