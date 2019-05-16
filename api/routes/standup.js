const Standup = require("../../models/standup");
const mongoose = require("mongoose");
module.exports = router => {
  // list out 12 newest standup notes
  router.get("/standups", (req, res) => {
    Standup.find()
      .sort({ createdOn: -1 })
      .exec()
      .then(docs => res.status(200).json(docs))
      .catch(err =>
        res.status(500).json({
          message: "Error finding standup meeting notes",
          error: err
        })
      );
  });

  // Get standups of a particular user
  router.get("/standups/:teamMemberId", (req, res) => {
    const qry = {
      _teamMemberId: mongoose.Types.ObjectId(req.params.teamMemberId)
    };

    Standup.find(qry)
      .sort({ createdOn: -1 })
      .exec()
      .then(docs => res.status(200).json(docs))
      .catch(err => {
        res
          .status(500)
          .json({ message: "Error in finding standups", error: err });
      });
  });

  router.post("/standups", (req, res) => {
    let note = new Standup(req.body);
    note.save((err, note) => {
      if (err) {
        return res.status(400).json(err);
      }
      return res.status(200).json(note);
    });
  });
};
