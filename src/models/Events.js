const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Events = {
    create: (data) => prisma.events.create({ data }),
  findById: (id) =>
    prisma.events.findUnique({ where: { Id_event: Number(id) } }),
  list: () => prisma.events.findMany(),
};


module.exports = Events;
