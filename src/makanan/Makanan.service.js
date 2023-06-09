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

  const Makanan = await prisma.Makanan.update({
    where : {
      id,
    },
    data : {
      Makanan : UpdateMakananData.Makanan ,
      Harga : Harga ,
      Jumlah : Jumlah ,
      Total : Total ,
      Gambar : UpdateMakananData.Gambar ,
    },
  });
  return Makanan;
}

const putMakananById = async(UpdateMakananData,id) => {
  await getMakananById(id);
  if(!(UpdateMakananData.Makanan && Harga && Jumlah && UpdateMakananData.Gambar)){
    return res.status(400).send("Some Fields Are Missing");
  }
  const Makanan = await patchMakananById(UpdateMakananData,id)
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
