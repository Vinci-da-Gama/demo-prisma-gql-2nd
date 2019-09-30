function courses(parent, args, { prisma }, info) {
    return prisma.courses({ where: { id_in: parent.courseIds } })
};

module.exports = {
    courses
}
