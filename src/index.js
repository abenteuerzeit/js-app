import "dotenv/config";
import cors from "cors";
import express from "express";
import models, { sequelize } from "./models";
import routes from "./routes";
import createUsersWithMessages from "./utils/userSeeder";

// Hardcoded fake database
// import models from './models';

const app = express();
const PORT = process.env.PORT || 3000;
const eraseDatabaseOnSync = true;

// Third-party middleware
app.use(cors());

// Built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom middleware
app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin("admin"),
  };
  next();
});

// Routes
app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);


sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    const numberOfUsers = 99;
    createUsersWithMessages(numberOfUsers);
  }
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});
