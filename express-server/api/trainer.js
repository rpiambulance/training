//local packages
const { verifyToken, findUser } = require("../UserFunctions.js");
const {
  getUserChecklist,
  getAllUserChecklists
} = require("../ChecklistFunctions.js");
const { signItem } = require("../TrainerFunctions.js");

module.exports = app => {
  app.post("/trainer/user/checklists", async (req, res) => {
    if (req.body["id"]) {
      const checklists = await getAllUserChecklists(req.body["id"]);
      if (checklists) {
        res.send({
          success: true,
          checklists: checklists,
          message: "Succesfully retrieved checklists!"
        });
      } else {
        res.send({
          success: false,
          checklists: null,
          message:
            "Hmm. There does not appear to be any checklists for that user, if you believe this an error please contact a dev!"
        });
      }
    } else {
      res.send({
        success: false,
        checklists: null,
        message: "ID not specified!"
      });
    }
  });

  app.post("/trainer/checklist/signItem", async (req, res) => {
    if (req.body["token"] && req.body["itemId"] && req.body["status"]) {
      const user = await verifyToken(req.body.token);
      if (user) {
        const userId = (await findUser(user.sub))[0].id;
        const item = await signItem(
          userId,
          req.body["itemId"],
          req.body["status"],
          req.body["comments"]
        );
        if (item) {
          res.send({
            success: true,
            item: item,
            message: "Succesfully modified item!"
          });
        } else {
          res.send({
            success: false,
            item: null,
            message: "Something went wrong editing this item!"
          });
        }
      } else {
        res.send({
          success: false,
          item: null,
          message: "We could not verify your user token!"
        });
      }
    } else {
      res.send({
        success: false,
        item: null,
        message: "Invalid Post Request please check your parameters!"
      });
    }
  });

  app.post("/trainer/user/checklist", async (req, res) => {
    if (req.body["id"] && req.body["role"]) {
      const checklist = await getUserChecklist(
        req.body["id"],
        req.body["role"]
      );
      if (checklist) {
        res.send({
          success: true,
          checklist: checklist,
          message: "Succesfully retrieved checklist!"
        });
      } else {
        res.send({
          success: false,
          checklist: null,
          message:
            "Hmm. There does not appear to be a checklist for that user + role, if you believe this an error please contact a dev!"
        });
      }
    } else {
      res.send({
        success: false,
        checklist: null,
        message: "ID and/or Role not specified!"
      });
    }
  });
};
