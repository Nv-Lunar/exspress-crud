//handle req dan res
const express = require('express');
const prisma = require("../db");
const { getAllMakanan, getMakananById, postCreateMakanan, deleteMakananById, putMakananById} = require('./Makanan.service');

const router = express.Router();

router.get("/Makanan", getAllMakanan);
router.get("/:id", getMakananById);
router.post("/", postCreateMakanan);
router.delete("/:id", deleteMakananById)
router.put("/:id", putMakananById);


module.exports = router;