import { Router } from "express";

const router = Router();

router.param("userId", async (req, res, next, id) => {
  const user = await req.context.models.User.findByPk(id);
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  req.context.user = user;
  req.context.userId = Number(id);
  return next();
});

router.get("/", async (req, res) => {
  const users = await req.context.models.User.findAll({
    order: [["id", "ASC"]],
  });
  return res.send(users);
});

router.get("/:userId", async (req, res) => {
  return res.send(req.context.user);
});

router.post("/", async (req, res) => {
  const { username, email, name, phone, birthday, password } = req.body;
  const userExists = await req.context.models.User.findOne({
    where: { username, email },
  });
  if (userExists) {
    return res.status(400).send({ message: "Username already exists" });
  }
  if (username && email && name && phone && birthday && password) {
    const newUser = await req.context.models.User.create({
      username,
      email,
      name,
      phone,
      birthday,
      password,
    });
    return res.status(201).send({ newUser });
  }
  return res.status(400).send({ message: "Missing required fields" });
});

router.put("/:userId", async (req, res) => {
  const { username, email, name, phone, birthday, password } = req.body;
  const updatedUser = await req.context.models.User.update(
    {
      username,
      email,
      name,
      phone,
      birthday,
      password,
    },
    { returning: true, where: { id: req.params.userId } }
  );
  const numOfUpdatedRows = updatedUser[0];
  const updatedUserInstance = updatedUser[1][0];
  return res.send({ numOfUpdatedRows, updatedUserInstance });
});

router.delete("/:userId", async (req, res) => {
  const numOfDeletedRows = await req.context.models.User.destroy({
    where: { id: req.params.userId },
  });
  if (numOfDeletedRows > 0) {
    return res.status(200).send({ message: "User deleted" });
  } else {
    return res.status(400).send({ message: "User not deleted" });
  }
});

export default router;
