const Query = {
    feed: (parent, args, context) => {
        return context.prisma.posts({ where: { published: true } })
    },
    drafts: (parent, args, context) => {
        return context.prisma.posts({ where: { published: false } })
    },
    post: (parent, { id }, context) => {
        return context.prisma.post({ id })
    },
    courses: (parent, args, ctx, info) => {
        // console.log('12 -- ctx(everything about reqest return): ', ctx)
        // console.log('13 -- info(everything about query): ', info)
        return ctx.prisma.courses({
            where: { isPublished: true }
        })
    }
};

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

module.exports = { Query, Mutation };
