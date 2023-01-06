const { faker } = require("@faker-js/faker");
const { v4: uuidv4 } = require("uuid");

faker.locale = "id_ID";

exports.createRandomUser = () => {
  const r = Math.ceil(Math.random() * 2);
  const sex = r > 1 ? "male" : "female";
  const firstname = faker.name.firstName(sex);
  const lastname = faker.name.lastName(sex);

  const user = {
    _id: uuidv4(),
    email: faker.internet.email(firstname, lastname),
    doc_type: r > 1 ? "KTP" : "SIM",
    name: {
      first: firstname,
      last: lastname,
    },
    birth_place: faker.address.cityName(),
    birth_date: new Date(faker.date.birthdate()).getTime(),
    sex,
    password: faker.internet.password(),
    address: `${faker.address.streetAddress()}, ${faker.address.streetName()}`,
    phone_number: { code: "ID", value: faker.phone.number("62###########") },
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
