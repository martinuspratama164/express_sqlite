# Express dengan sqlite3

Apa itu sqlite?
Sqlite merupakan sebuah Data Base Management System (DBMS) yang berbentuk file. Database sqlite bersifat "Relational Database" seperti layaknya pada MYSQL.
Bedanya pada sqlite hanya memerlukan sebuah file dengan extension sqlite, berbeda dengan MYSQL yang harus di jalankan apache web servernya terlebih dahulu.

# Persiapan

Untuk memulai menggunakan SQLITE ada beberapa kebutuhan yang perlu kita install terlebih dahulu

1. Dbeaver (aplikasi desktop)
2. express js library
3. cors
4. knex
5. sqlite3

Buat sebuah project bernama express_sqlite dan install dependencies library yang dibutuhkan.

```bash
mkdir express_sqlite
cd express_sqlite
npm init -y
npm install --save express cors knex sqlite3
touch server.js
code .
```

## Struktur folder

1. Buat folder bernama **model** dan **controller**
2. Setelah itu, buat file bernama **connection.js** dan **userModel.js** di dalam folder **model**
3. Buat folder **schema** di dalam folder **model**, dan isi dengan sebuah file bernama **userSchema.js**
4. Buat file bernama **userController.js** di dalam folder bernama **controller**
5. Buat sebuah file bernama **test.rest** untuk tester api kita, di _root directory_ kita.
6. Buat sebuah file bernama **dbUser.sqlite** di root directory kita.
   > _ROOT DIRECTORY_ adalah folder utama project node js kita

## Import dependencies package into server.js

<small>./server.js</small>

```javascript
const express = require("express");
const cors = require("cors");
const app = express();

const user = require("./controller/userController");
```

## Setup middleware into server.js

<small>./server.js</small>

```javascript
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
```

## Setup Controller into server.js

<small>./server.js</small>

```javascript
app.use("/api/user", user);
```

## Setup port listener server.js

<small>./server.js</small>

```javascript
app.listen(8000, () => console.log("server berjalan di port 8000"));
```

# Connection ke sqlite

Sebelumnya kita sudah membuat file database bernama **dbUser.sqlite**, selanjutnya kita akan membuat connector ke database tersebut.
<small>./models/connection.js</small>

```javascript
const path = require("path");

const db = require("knex")({
  client: "sqlite3",
  connection: {filename: path.resolve(__dirname, "../dbUser.sqlite")}
});

module.exports = db;
```

# SCHEMA
Schema berguna untuk memudahkan kita dalam bermigrasi, maksudnya seperti apa? bisa saja kita membuat sebuah aplikasi kita di server local, dan saat deployment kita harus membuat skema yang sama dalam database kita.

Saat di production server, kita tinggal menjalankan function schema yang sudah kita buat, sehingga database di server sama persis dengan database kita di local.

Okay, tadi kita telah membuat sebuah file bernama **userSchema.js** di dalam ./models/schema, mari kita isi dengan code berikut.
<small>./models/schema/userSchema.js</small>

```javascript
const db = require("../connection");

// membuat fungsi untuk create table bernama "Users"
async function createTableUsers() {
  return await db.schema.createTable("users", (table) => {
      table.increments("id_user").notNullable();
      table.string("fullname").notNullable();
      table.string("username").notNullable();
      table.string("email").notNullable();
      table.string("password").notNullable();
      table.string("telephone").notNullable();
      table.string("address").notNullable();
      table.integer("batch").notNullable();
      table.timestamp("created_at").defaultTo(db.fn.now());
      table.unique("username");
    })
    .then((hasil) => {
      console.log(hasil);
    })
    .catch((kesalahan) => {
      console.log(kesalahan)
    });
}

// memanggil fungsi bernama createTableUsers yang telah dibuat di atas
createTableUsers().then((data) => {
  process.exit();
});
```

Bisa kita lihat pada code di atas, kita perintahkan KNEX query builder untuk membuat sebuah tabel dengan nama **users** yang diisi dengan kolom id_user, fullname, username, email, password, telephone, address, batch, dan created_at.

## Mengatur NODE CLI CODE untuk membuat schema database

Schema yang sudah kita buat tadi harus di jalankan agar kita memperoleh tabel **users** sesuai dengan struktur yang diharapkan. Kita bisa menjalankan function schema user yang sudah kita buat dengan bantuan node CLI.

Bukalah file bernama **package.json** kemudian atur dan sesuaikan isinya terlebih dahulu dengan mengedit bagian **_script_** dengan code seperti ini

<small>./package.json</small>

```json
 {
  "name": "express_sqlite",
  "version": "1.0.0",
  "description": "belajar express sqlite",
  "main": "server.js",
  "scripts": {
    "dev": "nodemon server.js --watch",
    "migration:user": "node ./model/schema/userSchema.js"
  },
  "keywords": [],
  "author": "martinuspratama164",
  "license": "MIT",
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "knex": "^0.95.4",
    "sqlite": "^4.0.21"
  }
}
```

Bisa di lihat di atas, kita menambahkan syntax untuk node cli bernama **migration:user**, selanjutnya kita tinggal jalankan pada terminal / git bash kita.

Buka terminal / gitbash dan masuk ke dalam folder kita, silakan jalankan syntax berikut :

```bash
npm run migration:user
```
jika berhasil akan ada array kosong yang tampil dalam console

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/99wfzm2ubacah06xcjvd.png)

# DBEAVER database management software

![dev.to](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ttnv6z92ge1w2ri6v5sq.png)
Selanjutnya, untuk menghandle database sqlite, kita akan menggunakan sebuah software bernama **dbeaver**, software ini dapat kita gunakan untuk mengatur database yang teleh kita miliki.

Silakan download [disini](https://dbeaver.io/download/)

## Membuat connection di dbeavers

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tsb6irdg7y71d9b985pd.png)
Buka aplikasi dbeaver, dipanel sebelah kiri, silakan click kanan, dan pilih **CREATE** dan pilih **CONNECTION**.

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/h9byxi5u11gwkf6d3pyi.png)
Akan muncul panel connect to database, panel sebelah kiri pilih **popular** dan pilih **SQLITE** lalu tekan **next**.

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/g604lkj28nnsqg3fbh7w.png)
Silakan click **browse** dan arahkan pada folder project kita dan pilih file bernama **dbUser.sqlite** yang tadi sudah dibuat.

lalu ketik **FINISH**

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qmw2xwasl0tdszt3vn5n.png)

Perhatikan panel sebelah kiri, dan connection ke file sqlite kita sudah berhasil di buat, dan kita sudah memiliki tabel users sesuai yang kita buat di schema.

# Model
Sekarang kita buat sebuah model untuk penghubung database dengan logic yang akan kita buat.
Buka file bernama userModel.js pada ./models dan isikan dengan code dibawah ini :

<small>./models/userModel.js</small>

```javascript
const db = require("./connection");

// membuat function bernama createUser
exports.createUser = async (data) => {
  return await db("users")
    .insert(data)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

// membuat function bernama readUser
exports.readUser = async () => {
  return await db("users")
    .select("*")
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

// membuat function bernama deleteUser
exports.deleteUser = async (data) => {
  return await db("users")
    .where(data)
    .del()
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

// membuat function bernama editUser
exports.editUser = async (id, data) => {
  return await db("users")
    .where({ id: id })
    .update(data)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

```

# Controller

Selanjutnya kita masuk ke folder controller, silakan buat sebuah file bernama **userController.js** di ./controller dan isi dengan code berikut :

```javascript
const { createUser, readUser, deleteUser, editUser } = require("../models/userModel");
const express = require("express");
const user = express.Router();

// POST data user
user.post("/", (req, res) => {
  createUser(req.body)
    .then((result) => {
      if (result.length > 0) {
        res.status(201).json({
          pesan: "berhasil menambahkan user",
          hasil: result,
        });
      } else {
        res.status(401).json({
          pesan: "email sudah terpakai..",
          result: result,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// GET data user
user.get("/", (req, res) => {
  readUser()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        pesan: "gagal menampilkan data",
        error: err,
      });
    });
});

// DELETE data user
user.delete("/", (req, res) => {
  let data = req.body;

  deleteUser(data)
    .then((result) => {
      if (result > 0) {
        // jika hasil lebih dari 0 berarti berhasil menghapus data
        res.status(200).json({
          pesan: "berhasil menghapus data",
        });
      } else {
        // jika hasil 0 maka data tidak ditemukan
        res.status(404).json({
          pesan: "Data yang akan dihapus tidak ditemukan!",
        });
      }
    })
    .catch((err) => {
      // error menghapus data
      res.status(401).json({
        pesan: "gagal menghapus data",
      });
    });
});

// UPDATE data user
user.patch("/edit/:id", (req, res) => {
  let id = req.params.id; //capture params id
  let data = req.body; // capture body data
  editUser(id, data)
    .then((result) => {
      if (result > 0) {
        res.status(200).json({
          pesan: "berhasil mengubah data",
          hasil: result
        });
      } else {
        res.status(404).json({
          pesan: "data yang akan diubah tidak ditemukan",
          hasil: result
        });
      }
    })
    .catch((err) => {
         console.log(err)
     });
});

module.exports = user;
```

# Test API dengan .rest

Kita tadi sudah membuat file bernama test.rest di root directory kita, mari kita isi dengan ini :

```json
###
POST http://localhost:8000/api/user
Content-Type: application/json
Accept: application/json

{
    "email" : "alif@gmail.com",
    "password" : "1qazxsw2"
}

###
GET http://localhost:8000/api/user
Content-Type: application/json
Accept: application/json

###
DELETE http://localhost:8000/api/user
Content-Type: application/json
Accept: application/json

{
    "id" : 1
}

###
PATCH http://localhost:8000/api/user/edit/2
Content-Type: application/json

{
    "email" : "test@gmail.com"
}

```

Silakan coba hit dan lihat hasilnya dengan dbeaver

> Apabila data belum mucul pada DBEAVER, refresh dengan cara tekan tombol **F5**
