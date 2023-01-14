const { faker } = require("@faker-js/faker");
const dayjs = require("dayjs");
const { v4: uuidv4 } = require("uuid");

faker.locale = "id_ID";

exports.createRandomUser = () => {
  const r = Math.ceil(Math.random() * 2);
  const sex = r > 1 ? "male" : "female";
  const fullname = faker.name.fullName();
  const firstname = fullname.split(" ")[0];
  const lastname = fullname.split(" ")[1];
  const sevenYago = dayjs().subtract(17, "year").format();

  const user = {
    _id: uuidv4(),
    email: faker.internet
      .email(firstname, lastname, "gmail.com")
      .toLocaleLowerCase(),
    doc_type: r > 1 ? "ktp" : "sim",
    doc_number: faker.phone.number("################"),
    firstname,
    lastname,
    birth_place: faker.address.cityName(),
    birth_date: sevenYago,
    sex,
    password: faker.internet.password() + "#",
    address: `${faker.address.street()}, ${faker.address.streetName()}`,
    phone_number: { code: "ID", value: faker.phone.number("8###########") },
  };

  return user;
};

exports.createRandomAdmin = () => {
  const fullname = faker.name.fullName();
  const username = fullname.split(" ")[0].toLowerCase();
  return {
    _id: uuidv4(),
    username: username,
    password: username,
    fullname,
  };
};
