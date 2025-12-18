const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Permission = {
  create: (data) => prisma.permission.create({ data }),
  findById: (id) => prisma.permission.findUnique({ where: { Id_roles: Number(id) } }),
  list: () => prisma.permission.findMany(),
};

module.exports = Permission;
