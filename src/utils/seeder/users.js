import { surnames, maleNames, femaleNames } from "./_names";	
import { nouns, colors, adjectives, emailDomains, loremIpsumArr, allWords } from "./_words";
import { v4 as uuid } from "uuid";
const genders = ["male", "female"];
const usernames = [];
const pwdRegExp = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);

const _getUniqueWords = (arr) => {
  return Array.from(new Set(arr));
};


const _userIds = new Set();
const insertUserToDb = (user) => {
  try {
    const generateNewId = () => {
      let id = uuid();
      if (_userIds.has(id)) {
        return generateNewId();
      }
      return id;
    };
    if (get100Users.find((u) => u.email === user.email)) {
      return null;
    }
    user.id = generateNewId();
    _userIds.add(user.id);
    get100Users.push(user);
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

class UserGenerator {
  constructor(id) {
    this.id = id;
    _userIds.add(id);
    this.name = this._generateName();
    this.email = this._generateEmail();
    this.password = this._generatePassword();
    this.birthday = this._generateBirthday();
    this.phone = this._generatePhone();
  }

  _generateName() {
    this.name = `${this._generateFirstName()} ${this._generateLastName()}`;
    return this.name;
  }

  _generateFirstName() {
    this.gender = genders[Math.floor(Math.random() * genders.length)];
    switch (this.gender) {
      case genders[0]:
        return maleNames[Math.floor(Math.random() * maleNames.length)];
      case genders[1]:
        return femaleNames[Math.floor(Math.random() * femaleNames.length)];
      default:
        return "Unknown";
    }
  }
  _generateLastName() {
    return surnames[Math.floor(Math.random() * surnames.length)];
  }
  _generateEmail() {
    return `${this._generateUsername()}@${
      emailDomains[Math.floor(Math.random() * emailDomains.length)]
    }`;
  }
  _generateUsername() {
    let words = [
      _getUniqueWords(nouns),
      _getUniqueWords(adjectives),
      _getUniqueWords(colors),
    ].flat();
    let _username = "";
    const name = this.name.toLowerCase();
    const firstInitial = name[0];
    const lastName = name.split(" ")[1];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const randomNumber = Math.floor(Math.random() * 1000);
    const rollDice = Math.floor(Math.random() * 4);
  
    switch (rollDice) {
      case 0:
        _username = firstInitial + lastName;
        break;
      case 1:
        _username = firstInitial + lastName[0] + randomNumber;
        break;
      case 2:
        _username = randomWord;
        break;
      case 3:
        _username = randomWord + randomNumber;
        break;
      default:
        _username = `${name}${id}`;
        return _username;
    }
  
    if (usernames.includes(_username) || ["", " ", "."].includes(_username)) {
      return this._generateUsername();
    } else {
      usernames.push(_username);
      return _username;
    }
  }
  
  _generatePassword() {
    // make password to match pwdRegExp const above
    let _password = "";
    while (!_password.match(pwdRegExp)) {
      _password = "";
      for (let i = 0; i < Math.floor(Math.random() * 10) + 8; i++) {
        _password += String.fromCharCode(Math.floor(Math.random() * 94) + 33);
      }
    }
    return _password;
  }

  _generateBirthday() {
    const birthday = new Date();
    birthday.setFullYear(Math.floor(Math.random() * 100) + 1920);
    birthday.setMonth(Math.floor(Math.random() * 12));
    if (birthday.getMonth() in [0, 2, 4, 6, 7, 9, 11]) {
      birthday.setDate(Math.floor(Math.random() * 31));
    } else if (birthday.getMonth() in [3, 5, 8, 10]) {
      birthday.setDate(Math.floor(Math.random() * 30));
    } else {
      birthday.setDate(Math.floor(Math.random() * 28));
    }
    this.birthday = birthday.toISOString().split("T")[0];
    return this.birthday;
  }
  _generatePhone() {
    const phone = new Array(10);
    for (let i = 0; i < phone.length; i++) {
      phone[i] = Math.floor(Math.random() * 10);
    }
    const formatPhoneNumber = (phone) =>
      `+1(${phone.slice(0, 3).join("")})${phone.slice(3, 6).join("")}-${phone
        .slice(6)
        .join("")}`;
    return formatPhoneNumber(phone);
  }
  getName() {
    return this.name;
  }
  getEmail() {
    return this.email;
  }
  getPassword() {
    return this.password;
  }
  getBirthday() {
    return this.birthday;
  }
  getGender() {
    return this._gender;
  }
  getPhone() {
    return this.phone;
  }
  getId() {
    return this.id;
  }
  setId(id) {
    this.id = id;
  }
}

const seeder = (num = 10) => {
  const users = [];
  for (let i = 0; i < num; i++) {
    const user = new UserGenerator(i);
    users.push(user);
  }
  return users;
};

export const get100UsersAsync = async () => seeder(100);
export const seederAsync = async () => seeder;
export const addAsync = async () => insertUserToDb;

export default seeder