const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const User = {
  create: (data) => prisma.users.create({ data }),
  findByEmail: (email) => prisma.users.findMany({ where: { email } }),
  findById: (id) => prisma.users.findUnique({ where: { id_user: Number(id) } }),
  update: (id, data) => prisma.users.update({
    where: { id_user: 1 },
    data: data}),
  remove: (id) => prisma.users.delete({ where: { _id: Number(id) } }),

  list: () => prisma.users.findMany(),
};

module.exports = User;
