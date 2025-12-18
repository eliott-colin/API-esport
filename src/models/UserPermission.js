const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const UserPermission = {
  create: (data) => prisma.userPermissions.create({ data }),
  list: () => prisma.users.findMany(),
};

module.exports = UserPermission;
