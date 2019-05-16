const TeamMember = require("../../models/teamMember");
module.exports = router => {
  //list team  members
  router.get("/teams", (req, res) => {
    TeamMember.find()
      .sort({ name: 1 })
      .exec()
      .then(docs => res.status(200).json(docs))
      .catch(err =>
        res
          .status(200)
          .json({ message: "Error in finding team members", error: err })
      );
  });

  router.post("/teams", (req, res) => {
    let member = new TeamMember(req.body);
    member.save((err, member) => {
      if (err) {
        return res.status(400).json(err);
      }
      return res.status(200).json(member);
    });
  });
};
