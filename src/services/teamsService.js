const Team = require("../models/Team");

const updateTeamDetails = async (teamId, name) => {
  try {
    await Team.update(teamId, {
      name: name,
    });
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const getAllTeams = async () => {
  try {
    const result = await Team.findAll();
    return result.map((team) => ({
      id: team.Id_teams,
      name: team.name,
      createdAt: team.dateCreate,
    }));
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const getTeamById = async (teamId) => {
  try {
    const team = await Team.findById(teamId);
    return {
      id: team.Id_teams,
      name: team.name,
      createdAt: team.dateCreate,
    };
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteTeam = async (teamId) => {
  try {
    await Team.remove(teamId);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  getAllTeams,
  getTeamById,
  updateTeamDetails,
  deleteTeam,
};
