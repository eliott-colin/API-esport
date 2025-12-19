const prisma = require("../v1/prisma");

const User = {
  create: (data) => prisma.users.create({ data }),
  findByEmail: (email) => prisma.users.findMany({ where: { email } }),
  findById: (id) => prisma.users.findUnique({ where: { id_user: Number(id) } }),
  findAll: () => prisma.users.findMany(),
  update: (id, data) =>
    prisma.users.update({
      where: { id_user: Number(id) },
      data: data,
    }),
  remove: (id) => prisma.users.delete({ where: { id_user: Number(id) } }),
};

module.exports = User;
