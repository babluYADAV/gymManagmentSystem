import { Request, Response } from "express";
import Program from "../Modals/program";

// Create Program
export const createProgram = async (req: Request, res: Response) => {
  try {         
    const { title, description, image, trainer,subCategories,status } = req.body;

    const program = new Program({
      title,
      description,
      image,
      trainer,
      subCategories,
      status,
    });

    const savedProgram = await program.save();
    res.status(201).json(savedProgram);
  }

    catch (error) {
    res.status(500).json({ message: "Server error" });
    }
};

// Get All Programs
export const getPrograms = async (req: Request, res: Response) => {
  try {
    const programs = await Program.find();
    res.status(200).json(programs);
  }
    catch (error) {
    res.status(500).json({ message: "Server error" });
    }
}

// Get Program by ID
export const getProgramById = async (req: Request, res: Response) => {
    try {   
    const program = await Program.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }
    res.status(200).json(program);
    }
    catch (error) {
    res.status(500).json({ message: "Server error" });
    }
};
// Update Program
export const updateProgram = async (req: Request, res: Response) => {
    try {
    const updatedProgram = await Program.findByIdAndUpdate(
      req.params.id,
      req.body,
        { new: true }

    );

    if (!updatedProgram) {
      return res.status(404).json({ message: "Program not found" });
    }   
    res.status(200).json(updatedProgram);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const  deleteProgram= async (req: Request, res: Response) => {}