const mongoose = require("mongoose");
const connectDB = require("../config/database");
const Event = require("../models/Event");

const seedEvents = async () => {
  try {
    await connectDB();

    const newEvents = [
      {
        title: "Exploring the Pyramids of Giza",
        description:
          "A guided tour of the Great Pyramids of Giza and the Sphinx, exploring the history and mysteries of these ancient wonders.",
        location: "Giza",
        date: new Date("2024-01-15T09:00:00"),
        created_at: Date.now(),
      },
      {
        title: "Cruising the Nile River",
        description:
          "Enjoy a luxurious cruise down the Nile River with stops at historical sites and breathtaking views.",
        location: "Cairo",
        date: new Date("2024-02-20T10:00:00"),
        created_at: Date.now(),
      },
      {
        title: "Beach Relaxation in Alexandria",
        description:
          "Spend a relaxing day at the beautiful beaches of Alexandria, soaking up the sun and enjoying the Mediterranean Sea.",
        location: "Alexandria",
        date: new Date("2024-03-10T08:30:00"),
        created_at: Date.now(),
      },
      {
        title: "Historical Tour of Luxor Temples",
        description:
          "Join us for an immersive tour of the Luxor Temple and Karnak Temple, delving into ancient Egyptian history and architecture.",
        location: "Luxor",
        date: new Date("2024-04-25T09:00:00"),
        created_at: Date.now(),
      },
      {
        title: "Aswan and Abu Simbel Adventure",
        description:
          "Explore the majestic sites of Aswan and Abu Simbel, including the Aswan Dam, Philae Temple, and the temples of Ramses II.",
        location: "Aswan",
        date: new Date("2024-05-05T07:00:00"),
        created_at: Date.now(),
      },
    ];

    for (const eventData of newEvents) {
      const event = new Event(eventData);
      await event.save();
    }

    console.log("Travel events have been seeded successfully");
  } catch (err) {
    console.error("Error seeding events:", err);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
};

// Call the seed function
seedEvents();
