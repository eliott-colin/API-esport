const User = require("../models/User");

const getUserSelfDetails = async (userId) => {
    try {
        const user = await User.findById(userId);
        return {
            id: user.id_user,
            name: user.name,
            firstName: user.firstname,
            email: user.email,
            photoUrl: user.photo ? `http://localhost:3000/${user.photo}.png` : null,
        };
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const updateUserDetails = async (userId, firstName, lastName, email) => {
    try {
        await User.update(userId, {
            firstname: firstName,
            name: lastName,
            email: email
        })
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
}

module.exports = {
    getUserSelfDetails,
    updateUserDetails,
};