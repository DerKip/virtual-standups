const Project = require("../../models/project");
module.exports = router => {
  // Get all active projects
  router.get("/projects", (req, res) => {
    const qry = { isActive: { $eq: true } };

    Project.find(qry)
      .sort({ createdOn: -1 })
      .exec()
      .then(docs => res.status(200).json({ projects: docs }))
      .catch(err =>
        res
          .status(500)
          .json({ message: "Error in Finding active projects", error: err })
      );
  });

  // Get all inactive projects
  router.get("/projects/inactive", (req, res) => {
    Project.find({ isActive: false })
      .sort({ createdOn: -1 })
      .exec()
      .then(docs => {
        if (docs.length === 0) {
          res.status(200).json({
            message: "There are'nt any inactive projects",
            projects: docs
          });
        }
        res.status(200).json({
          projects: docs
        });
      })
      .catch(err =>
        res
          .status(500)
          .json({ message: "Error in Finding inactive projects", error: err })
      );
  });

  router.post("/projects", (req, res) => {
    let project = new Project(req.body);
    project.save(err => {
      if (err) {
        return res.status(400).json(err);
      }
      return res.status(200).json(project);
    });
  });
};
