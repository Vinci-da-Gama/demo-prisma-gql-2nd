import gql from 'graphql-tag';

export const GET_ALL_COURSES = gql`
    query {
        courses {
            id
            name
            description
            isPublished
        }
    }
`;
