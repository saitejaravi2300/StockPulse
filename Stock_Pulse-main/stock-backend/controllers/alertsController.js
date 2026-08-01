const db = require("../config/db");
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: "****************",
  secretAccessKey: "*******************",
  region: "ap-south-1"
});

const sns = new AWS.SNS();

exports.createAlert = (req, res) => {
  const { email, stock, condition_type, target_price } = req.body;

  db.query(
    "INSERT INTO alerts (email, stock, condition_type, target_price) VALUES (?, ?, ?, ?)",
    [email, stock, condition_type, target_price],
    async (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "DB Error" });
      }

      const params = {
        TopicArn: "*****************",
        Subject: "StockPulse Alert Created",
        Message:
`New Stock Alert Created!

Email: ${email}
Stock: ${stock}
Condition: ${condition_type}
Target Price: ₹${target_price}

Created Successfully`
      };

      try {
        await sns.publish(params).promise();
      } catch (error) {
        console.log(error);
      }

      res.json({
        message: "Alert Saved"
      });
    }
  );
};
