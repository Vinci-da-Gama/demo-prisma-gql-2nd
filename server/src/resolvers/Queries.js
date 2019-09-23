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
    },
    course: (parent, { where }, { prisma }, info) => {
        return prisma.course({ ...where });
    }
};

module.exports = Query;
