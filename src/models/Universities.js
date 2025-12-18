const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Universities = {
  findById: (id) =>
    prisma.universities.findUnique({ where: { id_university: id } }),
  list: () => prisma.universities.findMany(),
};

module.exports = Universities;
