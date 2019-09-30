import gql from 'graphql-tag';

export const GET_COURSES_WITH_PAGINATION_AND_FILTER = gql`
    query CoursesWithPagiAndFilter($first: Int, $skip: Int, $orderBy: CourseOrderByInput) {
        courses(first: $first, skip: $skip, orderBy: $orderBy) {
            count
            courses {
                id
                description
                name
                isPublished
            }
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
