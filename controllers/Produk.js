import Product from "../models/ProdukModel.js";

export const getProduk = async (req,res) => {
    const data = await Product.findAll();
    res.json(data);
};

export const createProduct = async (req,res) => {
    const { name, price, stock } = req.body;
    await Product.create({ name, price, stock });
    res.json({ message: "Produk berhasil ditambah" });
};

export const updateProduct = async (req,res) => {
    const { id, name, price, stock } = req.body;
    await Product.update({ name, price, stock },{where:{ id }});
    res.json({ message: "Produk berhasil diupdate" });
};

export const deleteProduct = async (req,res) => {
    const { id } = req.body;
    await Product.destroy({where:{ id }});
    res.json({ message: "Produk berhasil dihapus" });
};