import { Router } from "express";

import {
  createProgram,
  deleteProgram,
  getProgramById,
  getPrograms,
  updateProgram,
} from "../Controllers/program";
import { admin, protect } from "../Middleware/auth";

const router = Router();

router.post("/createProgram", protect, admin, createProgram);
router.get("/program", getPrograms);
router.get("/program/:id", getProgramById);
router.put("/program/:id", protect, admin, updateProgram);
router.delete("/program/:id", protect, admin, deleteProgram);

export default router;
