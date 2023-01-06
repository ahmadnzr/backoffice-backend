const createUsersView = (user) => {
  const {
    _id,
    name,
    phone_number,
    email,
    doc_type,
    birth_place,
    birth_date,
    address,
    sex,
    verified_email,
  } = user;

  return {
    id: _id,
    firstname: name.first,
    lastname: name.last,
    phone_number: phone_number.value,
    email,
    doc_type,
    birth_place,
    birth_date,
    address,
    sex,
    verified_email,
  };
};

module.exports = createUsersView;
