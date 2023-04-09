const { addMessage, getMessages,delMessage } = require("../controllers/messageController");
const router = require("express").Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);
router.post("/delmsg/", delMessage);
module.exports = router;
