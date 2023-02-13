import seederAsync from "./seeder/users";
import seedMessages from "./seeder/messages";

import models from "../models";

const createUsersWithMessages = async (n) => {
  await models.User.create(
    {
      username: 'admin',
      password: 'password',
      name: 'Adrian Mroz',
      email: 'admin@localhost.com',
      phone: '+14432169316',
      birthday: new Date('1990-01-01'),

      messages: [{ text: 'Admin message'}],
    }, 
    {
      include: [models.Message],
    }
  );

  const users = seederAsync(n);
  for (let i = 0; i < n; i++) {
    await models.User.create(
      {
        username: users[i].getEmail().split('@')[0],
        name: users[i].getName(),
        password: users[i].getPassword(),
        email: users[i].getEmail(),
        messages: seedMessages(),
        phone: users[i].getPhone(),
      },
      {
        include: [models.Message],
      }
    );
  }
};

export default createUsersWithMessages;
