const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { GetUserById } = require('../utiles/getUserJwt');

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
    createCourse: (root, { data }, ctx, info) => {
        // console.log('37 -- ctx: ', ctx)
        const userId = GetUserById(ctx);
        // console.log('24 -- userId: ', userId);
        return ctx.prisma.createCourse({
            ...data,
            postedBy: {
                connect: {
                    id: userId
                }
            }
        }, info);
    },
    updateCourse: (root, { data, where }, ctx, info) => {
        const userId = GetUserById(ctx);
        const { prisma } = ctx;
        // console.log('41 -- prisma: ', prisma)
        return prisma.updateCourse({ data, where })
    },
    deleteCourse: (root, { where }, ctx, info) => {
        const userId = GetUserById(ctx);
        const { prisma } = ctx;
        return prisma.deleteCourse({ ...where });
    },
    signupUser: async (root, { data: { email, password } }, { prisma }, info) => {
        const hashPswd = await bcrypt.hash(password, 10);
        // console.log('33 -- prisma: ', prisma);
        /**
         * after print out prisma, you found there is no signupUser
         * in prisma, the function still call createUser
         */
        const user = await prisma.createUser({
            email,
            password: hashPswd
        }, `{id}`)
        /**
         * use `{id}` ==> set only return id.
         */

        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET, { expiresIn: '3h' });

        return {
            token,
            user
        }
    },
    loginUser: async (root, { data: { email, password } }, { prisma }, info) => {
        const foundUser = await prisma.user({ email }, `{id, password}`);
        if (!foundUser) {
            throw new Error('No such user');
        }
        const isMatched = await bcrypt.compare(password, foundUser.password)
        if (!isMatched) {
            throw new Error('Invalid Password');
        }
        const token = jwt.sign({ userId: foundUser.id }, process.env.APP_SECRET, { expiresIn: '3h' });

        return {
            token,
            user: foundUser
        }
    }
}

module.exports = Mutation;
