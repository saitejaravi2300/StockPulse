const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req,res)=>{
  res.send("StockPulse Backend Running");
});

app.get("/health",(req,res)=>{
  res.status(200).send("OK");
});

app.get("/api/stocks",(req,res)=>{
  res.json([
    { name:"RELIANCE", price:2890 },
    { name:"TCS", price:4120 },
    { name:"INFY", price:1640 }
  ]);
});

app.listen(3000,"0.0.0.0",()=>{
 console.log("Server running on 3000");
});
