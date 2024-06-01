import Templete from "../models/templete.js";
// import ApiError from "../../errors/customError.js";


export const createNewTemplete = async (req, res, next) => {
  const NewTemplete = new Templete({ ...req.body});
  try {
    const templete = await NewTemplete.save();
    res.status(201).json({message : "new Templete created successfully" , templete:templete});
  } catch (error) {
    next(error);
  }
};

export const getAllTempletes = async (req, res, next) => {
  try {
    const templetes = await Templete.find()
    res.status(200).json(templetes);
  } catch (error) {
    next(error);
  }
};
export const getTempleteById = async (req, res, next) => {
  const { TempleteID } = req.params;
  try {
    const templete = await Templete.findById(TempleteID);
    res.status(200).json(templete);
  } catch (error) {
    next(error);
  }
};
export const updateTemplete = async (req, res, next) => {
  const { TempleteID } = req.params;
  try {
    const templete = await Templete.findByIdAndUpdate(TempleteID, req.body, {
      new: true,
    });
    res.status(200).json(templete);
  }
  catch (error) {
    next(error);
  }
};
export const deleteTemplete = async (req, res, next) => {
  const { TempleteID } = req.params;
  try {
    await Templete.findByIdAndDelete(TempleteID);
    res.status(200).json({ message: "Templete deleted successfully" });
  } catch (error) {
    next(error);
  }
};