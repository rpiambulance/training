module.exports = app => {
  app.get("/login", function(req, res) {
    res.send("Hello");
  });
};
