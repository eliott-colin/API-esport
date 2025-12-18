const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Permission = {
  create: (data) => prisma.permission.create({ data }),
  findById: (id) =>
    prisma.permission.findUnique({ where: { Id_roles: Number(id) } }),
  findByName: (name) => prisma.permission.findFirst({ where: { name: name } }),

  list: () => prisma.permission.findMany(),
};

module.exports = Permission;
