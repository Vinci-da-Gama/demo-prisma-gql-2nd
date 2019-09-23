const Mutation = {
    createDraft(parent, { title, content }, context) {
        return context.prisma.createPost({
            title,
            content
        })
    },
    deletePost(parent, { id }, context) {
        return context.prisma.deletePost({ id })
    },
    publish(parent, { id }, context) {
        return context.prisma.updatePost({
            where: { id },
            data: { published: true }
        })
    },
    createCourse: (root, { data }, { prisma }, info) => {
        // console.log('37 -- data: ', data)
        return prisma.createCourse({ ...data });
    },
    updateCourse: (root, { data, where }, { prisma }, info) => {
        // console.log('41 -- prisma: ', prisma)
        return prisma.updateCourse({ data, where })
    },
    deleteCourse: (root, { where }, { prisma }, info) => {
        return prisma.deleteCourse({ ...where });
    }
}

module.exports = Mutation;
