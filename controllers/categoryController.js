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
    }
}
const getCategories = async (req, res) => {
    const { userOwner } = req.body;
    const categories = await CategoryModel.find({ userOwner });
    res.json({
        state: true,
        categories: categories
    });
}
const deleteCategory = async (req, res) => {
    const { _id } = req.body;
    const category = await CategoryModel.findOne({ _id });
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
export { addCategory, getCategories, deleteCategory };