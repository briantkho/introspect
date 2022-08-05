const router = require("express").Router();

router.get("/", async (req: any, res: any, next: any) => {
  res.send({ message: "Ok api is working 🚀" });
});

module.exports = router;
