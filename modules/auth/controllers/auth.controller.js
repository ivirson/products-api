const authRepository = require("../repositories/auth.repository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthController {
  async login(req, res) {
    // #swagger.tags = ["Auth"]
    // #swagger.description = "Endpoint para login de usuários."

    /* #swagger.parameters['Credentials'] = { 
        in: 'body',
        description: "Autenticando um usuário.",
        schema: { $ref: "#/definitions/UserCredentials" }
    } */
    const { email, password } = req.body;

    try {
      const user = await authRepository.findByEmail(email);

      if (!user) {
        /* #swagger.responses[404] = { 
            description: "Usuário não encontrado." 
        } */
        return res.status(404).json({
          message: "Usuário não encontrado!",
        });
      }

      if (!(await bcrypt.compare(password, user.password))) {
        /* #swagger.responses[401] = {
            description: "Senha incorreta."
        } */
        return res.status(401).json({
          message: "Senha incorreta!",
        });
      }

      const token = jwt.sign(
        {
          userId: user.id,
          email,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      /* #swagger.responses[200] = { 
            description: "Usuário autenticado com succeso." 
        } */
      return res.status(200).json({
        user: {
          ...user.dataValues,
          password: null,
        },
        token,
      });
    } catch (error) {
      /* #swagger.responses[500] = { 
          description: "Problemas com o servidor." 
      } */
      return res.status(500).json(error);
    }
  }

  async register(req, res) {
    // #swagger.tags = ["Auth"]
    // #swagger.description = "Endpoint para cadastrar um usuário."

    /* #swagger.parameters['User'] = { 
        in: 'body',
        description: "Adicionando um novo usuário.",
        schema: { $ref: "#/definitions/AddUser" }
    } */
    const user = req.body;

    try {
      const encryptedPassword = await bcrypt.hash(user.password, 10);
      authRepository.create({ ...user, password: encryptedPassword });

      /* #swagger.responses[201] = { 
          description: "Usuário cadastrado." 
      } */
      return res.status(201).json();
    } catch (error) {
      /* #swagger.responses[500] = { 
          description: "Problemas com o servidor." 
      } */
      return res.status(500).json(error);
    }
  }
}

module.exports = new AuthController();
