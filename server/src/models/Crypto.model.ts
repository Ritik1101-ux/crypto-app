import mongoose, { Document } from "mongoose";

const CryptoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  marketcap: { type: Number, required: true },
},{
    timestamps:true
});

const Crypto = mongoose.model("Crypto", CryptoSchema);

export default Crypto;
