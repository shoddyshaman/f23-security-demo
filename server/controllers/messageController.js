const bcrypt = require("bcryptjs");
let chats = [];

module.exports = {
  handleMessage: (req, res) => {
    console.log(req.body);
    const { pin, message } = req.body;
    for (let i = 0; i < chats.length; i++) {
      const existing = bcrypt.compareSync(pin, chats[i].pinHash);
      if (existing === true) {
        chats[i].messages.push(message);
        let messagesToReturn = { ...chats[i] };
        delete messagesToReturn.pinHash;
        res.status(200).send(messagesToReturn);
        return;
      }
    }

    const salt = bcrypt.genSaltSync(5);
    const pinHash = bcrypt.hashSync(pin, salt);

    let msgObj = {
      pinHash,
      messages: [message],
    };

    chats.push(msgObj);
    let messagesToReturn = { ...msgObj };
    delete messagesToReturn.pinHash;
    res.status(200).send(messagesToReturn);
  },
};
