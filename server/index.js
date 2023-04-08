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
  const age = req.body.age;

  db.query(
    `INSERT INTO employee (name, age) VALUES ("${name}", ${age})`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/employee", (req, res) => {
  db.query("SELECT * FROM employee", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const age = req.body.age;
  db.query(
    "UPDATE employees SET age = ? WHERE id = ?",
    [age, id],
    (err, result) => {
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