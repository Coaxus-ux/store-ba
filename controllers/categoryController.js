import CategoryModel from "../models/CategoryModel.js";
const addCategory = async (req, res) => {
    const { name, userOwner } = req.body;
    const uniqueName = await CategoryModel.findOne({ name, userOwner });
    if(uniqueName){
        return res.json({
            state: false,
            msg: "La categoría ya existe",
        });
    }
    try{
        const category = new CategoryModel(req.body);
        const result = await category.save();
        res.json({
            state: true,
            msg: "Categoría registrada correctamente",
            result: result
        });
    }catch(error){
        console.log(`Error creating category ${error}`);
        res.json({
            state: false,
            msg: "Error al registrar la categoría",
        });
    }
}
const getCategories = async (req, res) => {
    const { userOwner } = req.body;
    const categories = await CategoryModel.find({ userOwner });
    if(!categories){
        return res.json({
            state: false,
            msg: "No hay categorías registradas",
        });
    }
    res.json({
        state: true,
        categories: categories
    });
}
const deleteCategory = async (req, res) => {
    const { _id, userOwner } = req.body;
    const category = await CategoryModel.findOne({ _id, userOwner });
    if(!category){
        return res.json({
            state: false,
            msg: "La categoría no existe",
        });
    }
    try{
        const result = await CategoryModel.deleteOne({ _id });
        res.json({
            state: true,
            msg: "Categoría eliminada correctamente",
            result: result
        });
    }
    catch(error){
        console.log(`Error deleting category ${error}`);
    }
}
const updateCategory = async (req, res) => {
    const { _id, name, description, userOwner } = req.body;
    const category = await CategoryModel.findOne({ _id, userOwner });
    if(!category){
        return res.json({
            state: false,
            msg: "La categoría no existe",
        });
    }
    try{
        const result = await CategoryModel.updateOne({ _id }, { name, description });
        res.json({
            state: true,
            msg: "Categoría actualizada correctamente",
            result: result
        });
    }
    catch(error){
        console.log(`Error updating category ${error}`);
    }
}
export { addCategory, getCategories, deleteCategory, updateCategory };