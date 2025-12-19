const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Team = {
  create: (data) => prisma.teams.create({ data }),
  findById: (id) =>
    prisma.teams.findUnique({ where: { Id_teams: Number(id) } }),
  findAll: () => prisma.teams.findMany(),
  update: (id, data) =>
    prisma.teams.update({
      where: { Id_teams: 1 },
      data: data,
    }),
  remove: (id) => prisma.teams.delete({ where: { Id_teams: Number(id) } }),
  list: () => prisma.teams.findMany(),
};

module.exports = Team;
