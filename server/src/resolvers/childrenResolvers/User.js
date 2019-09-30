/**
 * This resolver name must be one of prisma generated method name.
 */
function user(parent, args, { prisma }, info) {
    // console.log('2 -- check parent: ', parent)
    /**
     * After print parent, then u found parent is mutation: signupUser return value
     * token AND
     * user: {
     * id: 'ck135qmzpe6f30b09k1tics2v',
     * email: 'yan0@gmail.com',
     * password: '$2a$10$WVaMidrO5hfxr.fkLL6j6umZTfdKCGBBAb.XVCRaodiIk8J4IKuSi'
     * }
     */
    return prisma.user({ id: parent.user.id });
}

module.exports = {
    user
}
