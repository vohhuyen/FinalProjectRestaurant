const express = require("express");
const { updateArea,deleteArea,getArea,getAreas, createArea } = require("../controllers/area.js");
const { verifyAdmin, verifyUser } = require("../utils/verifyToken.js");

const router = express.Router();
// CREATE
router.post('/', verifyAdmin, createArea);
//UPDATE
router.put("/:id",verifyAdmin, updateArea);
//DELETE
router.delete("/:id",verifyAdmin, deleteArea);
//GET
router.get("/:id", getArea);
//GET ALL
router.get("/", getAreas);

module.exports = router;
