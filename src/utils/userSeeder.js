import seeder from "./seeder/users";
import seedMessages from "./seeder/messages";

import models from "../models";

const createUsersWithMessages = async (n) => {
  const users = seeder(n);
  for (let i = 0; i < n; i++) {
    await models.User.create(
      {
        username: users[i].getName(),
        messages: seedMessages(),
      },
      {
        include: [models.Message],
      }
    );
  }
};

export default createUsersWithMessages;
