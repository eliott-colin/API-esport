const prisma = require("../v1/prisma");

const Universities = {
  findById: (id) =>
    prisma.universities.findUnique({ where: { Id_universities: Number(id) } }),
  findAll: () => prisma.universities.findMany(),
};

module.exports = Universities;
