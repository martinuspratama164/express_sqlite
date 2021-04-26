const db = require("./connection");

// membuat function bernama createUser
exports.createUser = async(data)=>{
    return await db("users").insert(data)
    .then((hasil)=>{
        return hasil;
    })
    .catch((kesalahan)=>{
        return kesalahan;
    });
};

// membuat function bernama readUser
exports.readUser = async() => {
    return await db("users").select("*")
    .then((hasil)=>{
        return hasil;
    })
    .catch((kesalahan) => {
        return kesalahan;
    });
};

// membuat function bernama deleteUser
exports.deleteUser = async(data)=>{
    return await db("users").where(data).del()
    .then((hasil)=>{
        return hasil;
    })
    .catch((kesalahan)=>{
        return kesalahan;
    });
};

// membuat function bernama editUser
exports.editUser = async(id, data)=>{
    return await db("users").where({id_user: id}).update(data)
    .then((hasil)=>{
        return hasil;
    })
    .catch((kesalahan)=>{
        return kesalahan;
    });
};