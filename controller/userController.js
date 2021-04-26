const express = require("express");
const user = express.Router();
const { createUser, readUser, deleteUser, editUser } = require("../model/userModel");

// POST data user
user.post("/", (req, res) => {
    let data_input = req.body;
    
    createUser(data_input)
    .then((result) => {
        if (result.length > 0) {
            res.status(201).json({
                pesan: "user berhasil ditambahkkan",
                hasil: result
            });
        } else {
            res.status(401).json({
                pesan: "email sudah terpakai...",
                hasil: result
            });
        }
    })
    .catch((kesalahan)=>{
        res.status(500).json({
            pesan: "Data gagal di input",
            error: kesalahan
        });
    });
});

// GET data user
user.get("/", (req, res) => {
    readUser()
    .then((result)=>{
        res.status(200).json({
            pesan: "Berikut adalah data yang ada",
            hasil: result
        });
    })
    .catch((kesalahan)=>{
        res.status(500).json({
            pesan: "Data gagal ditampilkan",
            error: kesalahan
        });
    });
});

// DELETE data user
user.delete("/", (req, res) => {
    let data_hapus = req.body;

    deleteUser(data_hapus)
    .then((result)=>{
        if (result > 0) {
            // jika hasil lebih dari 0 berarti data berhasil dihapus
            res.status(200).json({
                pesan: "data berhasil dihapus",
                hasil: result
            });
        } else {
            // jika hasil 0 maka data tidak ditemukan
            res.status(404).json({
                pesan: "Data yang akan dihapus tidak ditemukan!",
                hasil: result
            });
        }
    })
    .catch((kesalahan)=>{
        // error menghapus data
        res.status(401).json({
            pesan: "gagal menghapus data"
        });
    });
});

// UPDATE data user
user.patch("/edit/:id", (req, res) => {
    let id_edit = req.params.id; // capture params id
    let data_edit = req.body; // capture body data

    editUser(id_edit, data_edit)
    .then((result)=>{
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
    .catch((kesalahan)=>{
        console.log(kesalahan);
    });
});

module.exports = user;