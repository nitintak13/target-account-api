const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Account = require("../models/Account");

router.get("/", auth, async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(
      accounts.map((a) => ({
        id: a._id,
        companyName: a.companyName,
        matchScore: a.matchScore,
        status: a.status,
      }))
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/:id/status", auth, async (req, res) => {
  const { status } = req.body;
  if (!["Target", "Not Target"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }
  try {
    const account = await Account.findById(req.params.id);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    account.status = status;
    await account.save();
    res.json({
      message: "Status updated",
      account: { id: account._id, status: account.status },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
