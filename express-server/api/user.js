const {
  verifyToken,
  createUser,
  getUserInfo,
  getAllUsers,
  getUserFullName
} = require("./UserFunctions.js");

module.exports = app => {
  app.post("/user/verify", async (req, res) => {
    if (req.body["token"] != null) {
      const user = await verifyToken(req.body["token"]);
      if (user) {
        res.send({
          success: true,
          user: user.sub,
          message: "Succesfully verified token!"
        });
      } else {
        res.send({
          success: false,
          user: null,
          message: "Unable to verify token!"
        });
      }
    } else {
      res.send({ success: false, user: null, message: "Token not specified!" });
    }
  });

  app.post("/user/info", async (req, res) => {
    if (req.body["token"]) {
      const verified = await verifyToken(req.body["token"]);
      if (verified) {
        const user = await getUserInfo(verified.sub);
        if (user) {
          res.send({
            success: true,
            user: user,
            message: "Info successfully retrieved!"
          });
        } else {
          res.send({
            success: false,
            user: null,
            message: "Unable to retrieve info on user!"
          });
        }
      } else {
        res.send({
          success: false,
          user: null,
          message: "Unable to verify token!"
        });
      }
    } else {
      res.send({ success: false, user: null, message: "No token specified!" });
    }
  });

  app.get("/user/all", async (req, res) => {
    const users = await getAllUsers();
    res.send(users);
  });

  app.get("/user/fullname", async (req, res) => {
    if (req.query["id"]) {
      const name = await getUserFullName(req.query["id"]);
      if (name) {
        res.send({
          success: true,
          name: name,
          message: "Name successfully retrieved!"
        });
      } else {
        res.send({
          success: false,
          name: null,
          message: "Error occured retrieving the name of that user!"
        });
      }
    } else {
      res.send({ success: false, name: null, message: "No Id specified!" });
    }
  });

  app.post("/user/create", async (req, res) => {
    if (req.body["id"] != null) {
      const user = await createUser(req.body["id"]);
      res.send({
        success: true,
        user: user[0],
        message: "User successfully found or created!"
      });
    } else {
      res.send({ success: false, user: null, message: "No id specified!" });
    }
  });
};
