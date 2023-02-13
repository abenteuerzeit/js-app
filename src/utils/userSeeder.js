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
      phone: '+1(443)216-9316',
      birthday: new Date('1988-05-18'),

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
        password: users[i].getPassword(),
        name: users[i].getName(),
        email: users[i].getEmail(),
        phone: users[i].getPhone(),
        birthday: users[i].getBirthday(),

        messages: seedMessages(),
      },
      {
        include: [models.Message],
      }
    );
  }
};

export default createUsersWithMessages;
