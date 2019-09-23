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

export const GET_COURSE_VIA_ID = gql`
    query GetCourseViaId($where: CourseWhereUniqueInput!) {
        course(where: $where) {
            id
            name
            description
            isPublished
        }
    }
`;
