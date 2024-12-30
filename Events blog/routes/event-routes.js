const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const { check, validationResult } = require("express-validator");
const moment = require("moment");
moment().format();

// Middleware to check if user is logged in
isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/users/login");
};

// Route to create new events
router.get("/create", isAuthenticated, (req, res) => {
  res.render("event/create", {
    errors: req.flash("errors"),
  });
});
// Route to list events with pagination
router.get("/:pageNo?", async (req, res) => {
  let pageNo = parseInt(req.params.pageNo) || 1;
  if (pageNo <= 0) pageNo = 1;
  const queryOptions = {
    skip: 5 * (pageNo - 1),
    limit: 5,
  };
  //find totoal documents
  try {
    const totalDocs = await Event.countDocuments();
    const events = await Event.find({}, {}, queryOptions);
    const chunk = [];
    const chunkSize = 3;
    for (let i = 0; i < events.length; i += chunkSize) {
      chunk.push(events.slice(i, i + chunkSize));
    }
    res.render("event/index", {
      chunk,
      message: req.flash("info"),
      total: totalDocs,
      pageNo,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Route to save event to the database
router.post(
  "/create",
  [
    check("title")
      .isLength({ min: 5 })
      .withMessage("Title should be more than 5 char"),
    check("description")
      .isLength({ min: 15 })
      .withMessage("Description should be more than 5 char"),
    check("location")
      .isLength({ min: 3 })
      .withMessage("Location should be more than 5 char"),
    check("date").isLength({ min: 5 }).withMessage("Date should valid Date"),
  ],
  isAuthenticated,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.flash("errors", errors.array());
      res.redirect("/events/create");
    }
    const { title, description, date, location } = req.body;

    try {
      const newEvent = new Event({
        title,
        description,
        date,
        location,
        user_id: req.user.id,
        created_at: Date.now(),
      });
      await newEvent.save();
      req.flash("info", "The event was created successfully");
      res.redirect("/events");
      return;
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

// Route to show a single event
router.get("/show/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      return res.render("event/show", { event, moment });
    } else {
      return res.status(404).send("Event not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Route to edit an event
router.get("/edit/:id", isAuthenticated, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      res.render("event/edit", {
        event,
        eventDate: moment(event.date).format("YYYY-MM-DD"),
        errors: req.flash("errors"),
        message: req.flash("info"),
      });
      return;
    } else {
      return res.status(404).send("Event not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Route to update an event
router.post(
  "/update",
  [
    check("title")
      .isLength({ min: 5 })
      .withMessage("Title should be more than 5 characters"),
    check("description")
      .isLength({ min: 5 })
      .withMessage("Description should be more than 5 characters"),
    check("location")
      .isLength({ min: 3 })
      .withMessage("Location should be more than 3 characters"),
    check("date").isISO8601().withMessage("Date should be a valid date"),
  ],
  isAuthenticated,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("errors", errors.array());
      return res.redirect(`/events/edit/${req.body.id}`);
    }
    const { id, title, description, location, date } = req.body;
    const newFields = { title, description, location, date };

    try {
      await Event.updateOne({ _id: id }, newFields);
      req.flash("info", "The event was updated successfully");
      return res.redirect(`/events/edit/${id}`);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

// Route to delete an event
router.delete("/delete/:id", isAuthenticated, async (req, res) => {
  try {
    await Event.deleteOne({ _id: req.params.id });
    return res.status(200).json("Deleted");
  } catch (err) {
    console.error(err);
    res.status(404).json("There was an error. Event was not deleted");
  }
});

module.exports = router;
