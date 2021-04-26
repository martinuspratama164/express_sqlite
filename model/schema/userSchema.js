const db = require("../connection");

// membuat fungsi untuk membuat tabel bernama "Users"
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
    .then((hasil)=>{
        console.log(hasil);
    })
    .catch((kesalahan)=>{
        console.log(kesalahan);
    });
}

// memanggil fungsi bernama createTableUsers yang telah dibuat di atas
createTableUsers().then((data) => {
    process.exit();
});