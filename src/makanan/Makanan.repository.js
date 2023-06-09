//berkomunikasi dgn database

const prisma = require("../db");

const findMakanan = async() => {
    const Makanan = await prisma.Makanan.findMany();

    return Makanan;
}

module.exports = {
    findMakanan,
}