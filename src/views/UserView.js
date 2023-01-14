const createUsersView = (user) => {
  const { _id, firstname, lastname, email, doc_type } = user;

  return {
    id: _id,
    firstname,
    lastname,
    email,
    doc_type,
  };
};

const createUserDetailView = (user) => {
  const {
    _id,
    firstname,
    lastname,
    phone_number,
    email,
    doc_type,
    doc_number,
    birth_place,
    birth_date,
    address,
    sex,
    verified_email,
    password,
  } = user;

  return {
    id: _id,
    firstname,
    lastname,
    phone_number: phone_number.value,
    email,
    doc_type,
    doc_number,
    birth_place,
    birth_date,
    address,
    sex,
    verified_email,
    password,
  };
};

module.exports = { createUsersView, createUserDetailView };
