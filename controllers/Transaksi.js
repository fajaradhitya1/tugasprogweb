import Transaksi from "../models/TransaksiModel.js";
import Produk from "../models/ProdukModel.js";

export const getTransaksi = async (req, res) => {
    try {
        const data = await Transaksi.findAll({
            include: Produk
        });
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Terjadi kesalahan" });
    }
};

export const createTransaksi = async (req, res) => {
    try {
        const { product_id, qty } = req.body;

        // 1. Cek produk
        const produk = await Produk.findByPk(product_id);
        if (!produk) {
            return res.status(404).json({ message: "Produk tidak ditemukan" });
        }

        // 2. Cek stok
        if (produk.stock < qty) {
            return res.status(400).json({
                msg: "Stok tidak mencukupi",
                stok_tersisa: produk.stock
            });
        }

        // 3. Hitung total
        const total_price = produk.price * qty;

        // 4. Simpan transaksi
        await Transaksi.create({
            product_id,
            qty,
            total_price
        });

        // 5. Kurangi stok
        produk.stock -= qty;
        await produk.save();

        res.json({
            message: "Transaksi berhasil dibuat",
            total_price,
            stok_sisa: produk.stock
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Terjadi kesalahan" });
    }
};

export const updateTransaksi = async (req,res)=>{
    try{
     const { id,product_id,qty } = req.body
   
     const transaksi = await Transaksi.findByPk(id)
     if(!transaksi)
      return res.status(404).json({ message:"Transaksi tidak ditemukan" })
   
     const produk = await Produk.findByPk(product_id)
     if(!produk)
      return res.status(404).json({ message:"Produk tidak ditemukan" })
   
     const selisih = qty - transaksi.qty
     if(produk.stock < selisih)
      return res.status(400).json({
       msg:"Stok tidak mencukupi",
       stok_tersisa: produk.stock
      })
   
     const total_price = produk.price * qty
   
     await transaksi.update({ product_id,qty,total_price })
   
     produk.stock -= selisih
     await produk.save()
   
     res.json({
      message:"Transaksi berhasil diupdate",
      total_price,
      stok_sisa: produk.stock
     })
    }catch(err){
     res.status(500).json({ msg:"Terjadi kesalahan" })
    }
   }

   export const deleteTransaksi= async (req,res) => {
    const { id } = req.body;
    await Transaksi.destroy({where:{ id }});
    res.json({ message: "Transaksi berhasil dihapus" });
};