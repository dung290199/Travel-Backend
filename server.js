const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// const corsOptions = {
//   origin: "http://localhost:3000",
// };

// app.use(cors(corsOptions));

// app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({ extended: true }));

// const db = require("./models");
// const Role = db.role;
// const authRoute = require("./routes/auth.routes");
// const userRoute = require("./routes/user.routes");
// // { force: true }
// db.sequelize.sync().then(() => {
//   console.log("Drop and resync db success");
//   // initial();
// });
// function initial() {
//   Role.create({
//     id: 1,
//     name: "user",
//   });

//   Role.create({
//     id: 2,
//     name: "moderator",
//   });

//   Role.create({
//     id: 3,
//     name: "admin",
//   });
// }

app.get("/", (req, res) => {
  res.json({ message: "Welcome " });
});
// app.use("/api/auth", authRoute);
// app.use("/api/test", userRoute);
const PORT = process.env.PORT || 8005;

app.listen(PORT, () => console.log("Server running on port ", PORT));
