//service layer bertujuan untuk handle business logic
//berfungsi agar function/code kita reusable
//dapat digunakan dengan hanya require

const { Prisma } = require("@prisma/client");
const { Makanan } = require("../db");
const prisma = require("../db/index.js");

const getAllMakanan = async (req, res) => {
  try {
    const Makanan = await prisma.Makanan.findMany();
    res.status(200).send(Makanan);
  } catch (error) {
    res.status(500).json({msg : "Internal server error"})
  }
  

};
const getMakananById = async(req, res) =>
{
  const MakananId = parseInt(req.params.id);
  try {
    const Makanan = await prisma.Makanan.findUnique({
      where : {
        id : MakananId
      }
    })
    res.status(200).send(Makanan);
  } catch (error) {
    res.status(500).json({msg : "Internal server error"})
  }
}

const postCreateMakanan = async (req, res) => {
  const newMakananData = req.body;
  const { Harga, Jumlah } = newMakananData;
  const Total = Harga * Jumlah;
  try {
    const Makanan = await prisma.Makanan.create({
      data: {
        Makanan: newMakananData.Makanan,
        Harga: Harga,
        Jumlah: Jumlah,
        Total: Total,
        Gambar: newMakananData.Gambar,
      },
    });
    res.send(Makanan)
  } catch (error) {
    res.status(500).json({msg : "Internal server error"})
  }
};

const deleteMakananById = async (req, res) => {
  const MakananId = parseInt(req.params.id);
  try {
    await prisma.Makanan.delete({
      where: {
        id : MakananId
      },
    });
    res.status(200).json({msg : "ok"})
  } catch (error) {
    res.status(500).json({msg : "Internal server error"})
  }
};

const putMakananById = async(req, res) => {
  const MakananId = parseInt( req.params.id);
  const editMakananData = req.body;
  const { Harga, Jumlah } = editMakananData;
  const Total = Harga * Jumlah;
  try {
    const Makanan = await prisma.Makanan.update({
      where : {
        id : MakananId,
      },
      data : {
        Makanan: editMakananData.Makanan,
        Harga: Harga,
        Jumlah: Jumlah,
        Total: Total,
        Gambar: editMakananData.Gambar,
      }
    })
    res.status(200).json({msg : "ok"})
  } catch (error) {
    res.status(500).json({msg : "Internal server error"})
  }
};

module.exports = {
  getAllMakanan,
  getMakananById,
  postCreateMakanan,
  deleteMakananById,
  putMakananById
};
