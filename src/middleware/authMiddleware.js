const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res
        .status(401)
        .json({ status: "FAILED", message: "Pas de jetons d'authentification fourni" });
    }

    // On split le token car il est composé de Bearer avant
    const token = authorizationHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const userId = decodedToken.userId;
    const role = decodedToken.role;

    // l'objet req/request est transmis aux routes qui vont être appelées
    // on va donc créer un objet ici auth avec comme info l'id
    req.auth = {
      userId: userId,
      role: role,
    };
    // Si tout va bien, on passe au code suivant avec next
    next();
  } catch (error) {
    res.status(401).json({ status: "FAILED", message: "Token invalide ou expiré" });
  }
};
