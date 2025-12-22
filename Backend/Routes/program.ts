import { Router } from "express";
import {} from "../Controllers/auth";
import {
  createProgram,
  deleteProgram,
  getProgramById,
  getPrograms,
  updateProgram,
} from "../Controllers/program";
import { admin, protect } from "../Middleware/auth";

const router = Router();

router.post("/program", protect, admin, createProgram);
router.get("/program", getPrograms);
router.get("/program/:id", getProgramById);
router.put("/program/:id", protect, admin, updateProgram);
router.delete("/program/:id", protect, admin, deleteProgram);

export default router;
