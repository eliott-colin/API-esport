const teamsService = require("../services/teamsService");

const updateTeamDetails = async (req, res) => {
  const { name } = req.body;
  const teamId = req.params.id;
  try {
    await teamsService.updateTeamDetails(teamId, name);
    res.status(200).json({ ok: true });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getAllTeams = async (req, res) => {
  try {
    const teams = await teamsService.getAllTeams();
    res.status(200).json({ data: teams });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getTeamById = async (req, res) => {
  const teamId = req.params.id;
  try {
    const team = await teamsService.getTeamById(teamId);
    res.status(200).json({ data: team });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteTeam = async (req, res) => {
  const teamId = req.params.id;
  try {
    await teamsService.deleteTeam(teamId);
    res.status(204).send();
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllTeams,
  getTeamById,
  updateTeamDetails,
  deleteTeam,
};
