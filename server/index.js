import express, { json } from 'express';
import { createConnection } from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(json());

const db = createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "employeeSystem",
  port: 3306,
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const category = req.body.category;
  const price = req.body.price;
  const stocked = [req.body.stocked ? 1 : 0];

  db.query(
    `INSERT INTO product (name, category, price, stocked) VALUES ("${name}", "${category}", "${price}", ${stocked});`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/get", (req, res) => {
  db.query("SELECT * FROM product ORDER BY category DESC;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  const change = req.body.change;

  if (change === undefined) {
    db.query(
      `UPDATE product SET price="${price}" WHERE name="${name}";`,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );  
  }

  if (price === undefined) {
    db.query(
      `UPDATE product SET name="${change}" WHERE name="${name}";`,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );  
  }
});

app.delete("/remove/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    `DELETE FROM product WHERE id=${id};`, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});


app.listen(3001 , ()=>{
  console.log('ok, server is running on port 3001')
});