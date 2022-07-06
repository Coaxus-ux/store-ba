import ProductModel from "../models/ProductModel";
const addProduct = async (req, res) => {
    const { name, description, price, category, userOwner } = req.body;
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
    res.json({
        state: true,
        products: products
    });
}
const deleteProduct = async (req, res) => {
    const { _id } = req.body;
    const product = await ProductModel.findOne({ _id });
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
export { addProduct, getProducts, deleteProduct };