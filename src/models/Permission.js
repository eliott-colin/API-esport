const prisma = require("../v1/prisma");

const Permission = {
  create: (data) => prisma.permission.create({ data }),
  findById: (id) =>
    prisma.permission.findUnique({ where: { Id_roles: Number(id) } }),
  findByName: (name) => prisma.permission.findFirst({ where: { name: name } }),
  findAll: () => prisma.permission.findMany(),
};

module.exports = Permission;
