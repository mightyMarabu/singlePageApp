const sqlite3 = require('sqlite3').verbose();


function getStuff(){
  // open the database
  let db = new sqlite3.Database('./db.sqlite', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  });

  db.all(() => {
    db.each(`SELECT id, text 
            FROM hello_world`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row.id + "\t" + row.text);
    });
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  })
};
 getStuff();