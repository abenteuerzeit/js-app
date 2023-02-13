import "dotenv/config";
import cors from "cors";
import express from "express";
import models, { sequelize } from "./models";
import routes from "./routes";
import createUsersWithMessages from "./utils/userSeeder";

const app = express();
const PORT = process.env.PORT || 3000;
const eraseDatabaseOnSync = process.env.ERASE_DATABASE_ON_SYNC || true;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom middleware
// TODO use session id to get user login
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
    const numberOfUsers = process.env.NUMBER_OF_USERS || Math.floor(Math.random() * 100);
    createUsersWithMessages(numberOfUsers);
  }
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});
