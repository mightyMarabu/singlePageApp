const express = require("express");
const app = express();
var db = require("./static/js/database.js")


const PORT = process.env.PORT || 3000;

app.use('/static', express.static('static'));

app.get("/", (req, res) => {
  try {
    res.sendFile("index.html", { root: __dirname });
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
///////////////////////////////////////////////////////////////////////////////// 
app.get("/api/users", (req, res, next) => {
    var sql = "select * from hello_world"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.get("/api/user/:id", (req, res, next) => {
    var sql = "select * from hello_world where id = ?"
    var params = [req.params.id]
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});
