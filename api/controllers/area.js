const Area = require("../models/area.js");

const createArea = async (req, res, next) => {
    try {
            const newArea = new Area({
                ...req.body, 
            });
            await newArea.save();
            res.status(200).json(newArea);
    } catch (err) {
        next(err);
    }
}

const updateArea = async (req, res, next) => {
    try {
            const updateData = { ...req.body};
            const updatedArea = await Area.findByIdAndUpdate(
                req.params.id,
                { $set: updateData },
                { new: true, runValidators: true }
            );
            if (!updatedArea) {
                return res.status(404).json("Area not found.");
            }

            res.json(updatedArea);
    } catch (error) {
        next(error);
    }
};



const deleteArea = async (req, res, next) => {
    try {
        await Area.findByIdAndDelete(req.params.id);
        res.status(200).json("Area has been deleted.");
    } catch (err) {
        next(err);
    }
};

const getArea = async (req, res, next) => {
    try {
        const Area = await Area.findById(req.params.id);
        res.status(200).json(Area);
    } catch (err) {
        next(err);
    }
};

const getAreas = async (req, res, next) => {
    try {
        const Areas = await Area.find();
        res.status(200).json(Areas);
    } catch (err) {
        next(err);
    }
};


module.exports = {
    updateArea,
    deleteArea,
    getArea,
    getAreas,
    createArea
};
