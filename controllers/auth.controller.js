const db = require("../models");
const config = require("../config/auth.config");

const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  signup: (req, res) => {
    const { username, email, password, roles } = req.body;
    User.create({
      username,
      email,
      password: bcrypt.hashSync(password, 8),
    })
      .then((user) => {
        if (req.body.roles) {
          Role.findAll({
            where: {
              name: {
                //select * from table_role where tbRole.name='admin' or tbRole.name='moderation'
                [Op.or]: roles,
              },
            },
          }).then((roles) => {
            user.setRoles(roles).then(() => {
              res.send({ message: "User was registered successfully!" });
            });
          });
        } else {
          user.setRoles([1]).then(() => {
            res.send({ message: "User was registered succesfully" });
          });
        }
      })
      .catch((e) => {
        res.status(500).send({
          message: e.message,
        });
      });
  },
  signin: (req, res) => {
    const { username, email, password, roles } = req.body;
    User.findOne({
      where: {
        username,
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: "User not found" });
        }
        let passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid password",
          });
        }
        let token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400,
        });
        let authorities = [];
        user.getRoles().then((roles) => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLES_" + roles[i].name.toUpperCase());
          }
          res.status(200).send({
            id: user.id,
            username,
            email,
            roles: authorities,
            accessToken: token,
          });
        });
      })
      .catch((e) => {
        res.status(500).send({
          message: e.message,
        });
      });
  },
};
