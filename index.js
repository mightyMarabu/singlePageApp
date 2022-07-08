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
app.get("/api/score", (req, res, next) => {
    var sql = "select * from score order by score desc"
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

app.get("/api/score/:id", (req, res, next) => {
    var sql = "select * from score where id = ?"
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

app.get("/api/addScore/:name/:score", (req, res, next) => {
    var sql = "insert into score(name, score) values (?,?)"
    var params = [req.params.name, req.params.score]
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