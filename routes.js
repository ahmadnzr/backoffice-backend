const { faker } = require("@faker-js/faker");
const usersData = require("./users.json");

const router = require("express").Router();

let newUser = usersData;

const users = [
  {
    id: 1,
    username: "nizar",
    password: "nizar",
    fullname: "Ahmad Nizar",
  },
  {
    id: 2,
    username: "alex",
    password: "alex",
    fullname: "Muh. Alex",
  },
];

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  if (!username || !password) {
    return res.status(401).json({
      message: "LOGIN_FAILED",
    });
  }

  const user = users.find(
    (user) => user.username == username && user.password == password
  );

  if (user) {
    req.user = user;
    return res.status(200).json({
      token: "randomToken2343",
      user,
    });
  }

  return res.status(401).json({
    status: "LOGIN_FAILED",
    message: "username or password invalid",
  });
});

router.get("/users", (req, res) => {
  return res.status(200).json({
    users: newUser.users,
  });
});

router.get("/users/:userId", (req, res) => {
  const userId = req.params.userId;
  const user = newUser.users.find((user) => user.id === parseInt(userId));

  return res.status(200).json({
    status: "OK",
    message: "Data with id" + userId + "Deleted",
    user,
  });
});

router.delete("/users/:userId", (req, res) => {
  const userId = req.params.userId;
  newUser.users = newUser.users.filter((user) => user.id !== parseInt(userId));

  return res.status(200).json({
    status: "OK",
    message: "Data with id" + userId + "Deleted",
    newUser,
  });
});

module.exports = router;
