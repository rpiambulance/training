//local packages
const { roleNameToAbbr } = require("./HelperFunctions.js");

module.exports = app => {
  app.get("/role/abbreviation", async (req, res) => {
    if (req.query["name"]) {
      const abbr = await roleNameToAbbr(decodeURIComponent(req.query["name"]));
      if (abbr) {
        res.send({ success: true, abbr: abbr, message: "" });
      } else {
        res.send({ success: false, abbr: null, message: "No role found!" });
      }
    } else {
      res.send({ success: false, abbr: null, message: "No name specified!" });
    }
  });
};
