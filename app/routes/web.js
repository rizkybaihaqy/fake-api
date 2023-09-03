import express from "express";

const web = express.Router({
  mergeParams: true,
});

web.get("/", (req, res) => {
  res.send("Hello from Space! 🚀");
});

export { web };
