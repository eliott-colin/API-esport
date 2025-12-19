const prisma = require("../v1/prisma");

const Team = {
  create: (data) => prisma.teams.create({ data }),
  findById: (id) =>
    prisma.teams.findUnique({ where: { Id_teams: Number(id) } }),
  findAll: () => prisma.teams.findMany(),
  update: (id, data) =>
    prisma.teams.update({
      where: { Id_teams: Number(id) },
      data: data,
    }),
  remove: (id) => prisma.teams.delete({ where: { Id_teams: Number(id) } }),
};

module.exports = Team;
