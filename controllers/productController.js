import ProductModel from "../models/ProductModel.js";
const addProduct = async (req, res) => {
    console.log(req.body);
    const { name, userOwner } = req.body;
    const uniqueName = await ProductModel.findOne({ name, userOwner });
    if(uniqueName){
        return res.json({
            state: false,
            msg: "El producto ya existe",
        });
    }
    try{
        const product = new ProductModel(req.body);
        const result = await product.save();
        res.json({
            state: true,
            msg: "Producto registrado correctamente",
            result: result
        });
    }catch(error){
        console.log(`Error creating product ${error}`);
    }
}
const getProducts = async (req, res) => {
    const { userOwner, category } = req.body;
    const products = await ProductModel.find({ userOwner, category });
    if(!products){
        return res.json({
            state: false,
            msg: "No se encontraron productos",
        });
    }
    res.json({
        state: true,
        products: products
    });
}
const deleteProduct = async (req, res) => {
    
    const { _id, userOwner } = req.body;
    const product = await ProductModel.findOne({ _id, userOwner });
    if(!product){
        return res.json({
            state: false,
            msg: "El producto no existe",
        });
    }
    try{
        const result = await ProductModel.deleteOne({ _id });
        res.json({
            state: true,
            msg: "Producto eliminado correctamente",
            result: result
        });
    }
    catch(error){
        console.log(`Error deleting product ${error}`);
    }
}
const updateProduct = async (req, res) => {
    console.log(req.body);
    const { _id, name, category, price, description, userOwner } = req.body;
    const product = await ProductModel.findOne({ _id });
    if(!product){
        return res.json({
            state: false,
            msg: "El producto no existe",
        });
    }
    try{
        const result = await ProductModel.updateOne({ _id }, { name, category, price, description, userOwner });
        res.json({
            state: true,
            msg: "Producto actualizado correctamente",
            result: result
        });
    }
    catch(error){
        console.log(`Error updating product ${error}`);
    }
}
export { addProduct, getProducts, deleteProduct, updateProduct };