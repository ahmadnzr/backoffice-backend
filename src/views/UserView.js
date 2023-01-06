const createUsersView = (user) => {
  const { _id, name, email, doc_type } = user;

  return {
    id: _id,
    firstname: name.first,
    lastname: name.last,
    email,
    doc_type,
  };
};

const createUserDetailView = (user) => {
  const {
    _id,
    name,
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
    firstname: name.first,
    lastname: name.last,
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
