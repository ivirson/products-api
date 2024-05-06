const database = require("../../../infra/db");
const User = require("../models/user.model");
const { v4: uuidv4 } = require("uuid");

class AuthRepository {
  async findByEmail(email) {
    await database.sync();
    const user = await User.findOne({
      where: {
        email,
      },
    });
    return user;
  }

  async create(userP) {
    await database.sync();

    const { address, ...user } = userP;

    user.id = uuidv4();
    await User.create(user);
  }
}

module.exports = new AuthRepository();
