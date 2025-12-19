const prisma = require("../v1/prisma");

const Events = {
  create: (data) => prisma.events.create({ data }),
  findById: (id) =>
    prisma.events.findUnique({ where: { Id_event: Number(id) } }),
  findAll: () => prisma.events.findMany(),
};


module.exports = Events;
