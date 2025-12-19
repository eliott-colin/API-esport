const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Events = {
    create: (data) => prisma.events.create({ data }),
  findById: (id) =>
    prisma.events.findUnique({ where: { id_events: id } }),
  list: () => prisma.events.findMany(),
};


module.exports = Events;
