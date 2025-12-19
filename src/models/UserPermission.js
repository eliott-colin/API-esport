const prisma = require("../v1/prisma");

const UserPermission = {
  create: (data) => prisma.userPermissions.create({ data }),
  findByUserId: (id) =>
    prisma.userPermissions.findMany({ where: { id_user: Number(id) } }),
  findAll: () => prisma.userPermissions.findMany(),
};

module.exports = UserPermission;
