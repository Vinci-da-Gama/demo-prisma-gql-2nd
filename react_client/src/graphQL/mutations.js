import gql from 'graphql-tag';

export const CREATE_COURSE = gql`
    mutation CreateCourse($data: CourseCreateInput!) {
        createCourse(data: $data) {
            id
            name
            description,
            isPublished
        }
    }
`;
