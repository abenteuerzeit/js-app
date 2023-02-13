import { Router } from "express";

const router = Router();

router.param("messageId", async (req, res, next, id) => {
  const message = await req.context.models.Message.findByPk(id);
  if (!message) {
    return res.status(404).send({
      message: "Message not found",
    });
  }
  req.context.message = message;
  req.context.messageId = id;
  next();
});

router.get("/", async (req, res) => {
  const messages = await req.context.models.Message.findAll({
    order: [["id", "ASC"]],
  });

  return res.send(messages);
});

router.get("/:messageId", async (req, res) => {
  const message = await req.context.models.Message.findByPk(
    req.context.messageId
  );
  return res.send(message);
});

router.post("/", async (req, res) => {
  const message = await req.context.models.Message.create({
    text: req.body.text,
    userId: req.context.me.id,
  });

  return res.send(message);
});

router.put("/:messageId", async (req, res) => {
  const updatedMessage = await req.context.models.Message.update(
    {
      text: req.body.text,
    },
    { returning: true, where: { id: req.context.messageId } }
  );
  if (updatedMessage) {
    return res.send(updatedMessage[1]);
  }
  return res.send({ error: "Message not updated" });
});

router.delete("/:messageId", async (req, res) => {
  const result = await req.context.models.Message.destroy({
    where: { id: req.context.messageId },
  });
  if (result) {
    return res.send({ message: "Message deleted" });
  }
  return res.send({ error: "Message not deleted"});
});

export default router;
