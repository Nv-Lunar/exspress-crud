//service layer bertujuan untuk handle business logic
//berfungsi agar function/code kita reusable
//dapat digunakan dengan hanya require

const { Makanan } = require("../db");
const prisma = require("../db");
const getAllMakanan = async () => {
  const Makanan = await findMakanan();

  return Makanan;
};

const getMakananById = async (id) => {
  if (typeof id !== "number") {
    throw Error("Id Is Not a Number");
  }
  const Makanan = await prisma.Makanan.findUnique({
    where: {
      id,
    },
  });
  if (!Makanan) {
    throw Error("Makanan Is Not Found");
  }
  return Makanan;
};

const postCreateMakanan = async (newMakananData) => {
  const { Harga, Jumlah } = newMakananData;
  const Total = Harga * Jumlah;
  const Makanan = await prisma.Makanan.create({
    data: {
      Makanan: newMakananData.Makanan,
      Harga: Harga,
      Jumlah: Jumlah,
      Total: Total,
      Gambar: newMakananData.Gambar,
    },
  });
  return Makanan;
};

const deleteMakananById = async (id) => {
    await getMakananById(id);
    await prisma.Makanan.delete({
      where: {
        id,
      },
    });
};

const patchMakananById = async(UpdateMakananData,id) => {
  await getMakananById(id);
  const {Harga, Jumlah} = UpdateMakananData;
  const Total = Harga * Jumlah;

  const Makanan = await patchMakananById
}

const putMakananById = async(UpdateMakananData,id) => {
  await getMakananById(id);
  const Makanan = await putMakananById(UpdateMakananData,id);
  if(!(UpdateMakananData.Makanan && Harga && Jumlah && UpdateMakananData.Gambar)){
    return res.status(404).json({ msg : "Data tdk lengkap"})
  };
  return Makanan;
}

module.exports = {
  getAllMakanan,
  getMakananById,
  postCreateMakanan,
  deleteMakananById,
  patchMakananById,
  putMakananById
};
