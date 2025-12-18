const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const UserPermission = {
  create: (data) => prisma.userPermissions.create({ data }),
  findByUserId: (id) =>
    prisma.userPermissions.findMany({ where: { id_user: Number(id) } }),
  list: () => prisma.userPermissions.findMany(),
};

module.exports = UserPermission;
