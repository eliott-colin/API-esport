const prisma = require("../v1/prisma");

const UserPermission = {
  create: (data) => prisma.userpermissions.create({ data }),
  findByUserId: (id) =>
    prisma.userpermissions.findMany({ where: { id_user: Number(id) } }),
  findAll: () => prisma.userpermissions.findMany(),
};

module.exports = UserPermission;
