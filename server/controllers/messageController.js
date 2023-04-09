const Messages = require("../models/messageModel");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
        id:msg._id
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};


module.exports.delMessage =  async(req, res, next) => {
  try {
    const id=req.body.id;

    Messages.findByIdAndDelete(id, function (err, docs) {
      if (err){
          console.log(err)
          return res.json({ msg: "Failed to elete message from the database" });
      }
      else{
        console.log("Deleted");
         return res.json({ msg: "Message deleted successfully." });
          
      }
  });
   
     
  } catch (ex) {
    next(ex);
    
  }
};
