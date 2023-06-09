//handle req dan res
const express = require('express');
const prisma = require("../db");
const { getAllMakanan, getMakananById, postCreateMakanan, deleteMakananById, putMakananById } = require('./Makanan.service');

const router = express.Router();

router.get("/", async (req, res) => {
    const Makanan = await getAllMakanan;

    res.send(Makanan);
})

router.get("/:id", async (req, res) => {
  try {
    const MakananId = parseInt(req.params.id);
    const Makanan = await getMakananById(MakananId);
  
    res.send(Makanan);
  } catch (err) {
    res.status(400).send(err.messege);
  }
});

router.post("/", async (req, res) => {
  try {
    const newMakananData = req.body;
    const Makanan = await postCreateMakanan(newMakananData);
  
    res.send({
      data : Makanan ,
      messege : "Input Makanan Sukses"
    });
  } catch (error) {
    res.status(400).send(error.messege);
  }
});

router.delete("/:id", async (req,res) => {
try {
  const MakananId = req.params.id;
  await deleteMakananById(parseInt(MakananId));
  res.send("Data Berhasi Di Hapus")
  } catch (error) {
    res.status(400).send("Makanan Not Found")
  }
});

router.put("/:id", async(req, res) => {
  try {
    const UpdateMakananData = req.body;
    const MakananId = parseInt(req.params.id);
    const Makanan = await putMakananById(UpdateMakananData,MakananId);
    res.send({
    data : Makanan,
    messege : "Data Berhasil Di Update!",
    errMessege : "Data Tidak Berhasil Di Update!"
  })
} catch (error) {
 res.status(400).send(error.errMessege); 
}
});

router.patch("/:id", async (req, res) => {
  try {
    const UpdateMakananData = req.body;
    const MakananId = parseInt(req.params.id);
    const Makanan = await patchMakananById(UpdateMakananData,MakananId);
    res.send({
      data : Makanan,
      messege : "Data Berhasil Di Update!",
      errMessege : "Data Tidak Berhasil Di Update!"
    })
  } catch (error) {
   res.status(400).send(error.errMessege); 
  }
});

module.exports = router;