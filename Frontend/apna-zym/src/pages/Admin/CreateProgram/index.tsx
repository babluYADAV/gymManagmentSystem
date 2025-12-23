import axios from "axios";
import { useState } from "react";

/* =======================
   Types
======================= */

interface ProgramCategory {
  title: string;
  image: File[];
  description: string;
  schedule: string;
  programTime?: string;
  price: number | "";
  duration: string;
  status: boolean;
}

interface ProgramForm {
  title: string;
  description: string;
  image: string;
  trainer: string;
  qualification: string;
  status: boolean;
  subCategories: ProgramCategory[];
}

/* =======================
   Component
======================= */

const CreateProgram: React.FC = () => {
  const [formData, setFormData] = useState<ProgramForm>({
    title: "",
    description: "",
    image: "",
    trainer: "",
    qualification: "",
    status: true,
    subCategories: [
      {
        title: "",
        image: [],
        description: "",
        schedule: "",
        programTime: "",
        price: "",
        duration: "",
        status: true,
      },
    ],
  });

  const [programImage, setProgramImage] = useState("");
  const [ProgramCategoryImage, setProgramCategoryImage] = useState<
    Array<string>
  >([]);

  /* =======================
     Handlers
  ======================= */
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "gymManagementSystem");
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dyt4evmw6/image/upload",
          formData
        );
        setProgramImage(response.data.secure_url);
        console.log("????????????????", response);
      } catch (error) {
        console.error("Image upload failed", error);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubCategoryChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, type, checked, files, value } = target;

    const updated = [...formData.subCategories];

    if (type === "file" && files) {
      updated[index] = {
        ...updated[index],
        [name]: Array.from(files),
      };
    } else if (type === "checkbox") {
      updated[index] = {
        ...updated[index],
        [name]: checked,
      };
    } else {
      updated[index] = {
        ...updated[index],
        [name]: value,
      };
    }

    setFormData((prev) => ({
      ...prev,
      subCategories: updated,
    }));
  };

  const addSubCategory = () => {
    setFormData((prev) => ({
      ...prev,
      subCategories: [
        ...prev.subCategories,
        {
          title: "",
          image: [],
          description: "",
          schedule: "",
          programTime: "",
          price: "",
          duration: "",
          status: true,
        },
      ],
    }));
  };

  const handleMultiImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files) return;

    try {
      // Convert FileList to array
      const filesArray = Array.from(files);

      // Upload each file separately
      const uploadPromises = filesArray.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "gymManagementSystem");

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dyt4evmw6/image/upload",
          formData
        );
        return response.data.secure_url; // you can store this in state later
      });

      // Wait for all uploads to finish
      const results = await Promise.all(uploadPromises);
      console.log("All uploads finished:", results);
      setProgramCategoryImage(results);

      // Optionally store URLs in state
      // setUploadedImages(results.map(r => r.secure_url));
    } catch (error) {
      console.error("Image upload failed", error);
    }
  };

  const createProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    const reqBody = {
      title: formData.title,
      description: formData.description,
      image: programImage,
      trainer: formData.trainer,
      qualification: formData.qualification,
      status: true,
      subCategories: formData.subCategories.map((data) => ({
        title: data.title,
        image: ProgramCategoryImage,
        description: data.description,
        schedule: data.schedule,
        programTime: data.programTime,
        price: data.price,
        duration: data.duration,
        status: true,
      })),
    };
    console.log("????????????????reqBody", reqBody);
    const token = localStorage.getItem("token"); // or wherever your token is stored
    console.log("????????????????token", token);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/program/createProgram",
        reqBody,
        {
          headers: {
            Authorization: `Bearer ${token}`, // pass token in header
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Program created successfully:", response.data);
    } catch (error) {
      console.error("Error creating program:", error);
    }
  };

  /* =======================
     Render
  ======================= */

  return (
    <section
      className="py-16 px-6 min-h-screen flex items-center"
      style={{
        background:
          "linear-gradient(90deg, #000000 0%, #1e3a8a 50%, #2563eb 100%)",
        width: "100vw",
      }}
    >
      <div className="max-w-5xl mx-auto w-full bg-white/10 backdrop-blur-lg rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-2 text-center">
          Create Your Program
        </h2>
        <p className="mb-8 text-center text-gray-300">
          Fill out the form below to create and start a program.
        </p>

        <form className="space-y-8">
          {/* Program Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Program Title"
              className={inputClass}
            />

            <input
              name="image"
              //   value={formData.image}
              onChange={handleImageUpload}
              placeholder="Program Image URL"
              type="file"
            />
          </div>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Program Description"
            className={`${inputClass} h-24`}
          />

          {/* Trainer */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="trainer"
              value={formData.trainer}
              onChange={handleChange}
              placeholder="Trainer Name"
              className={inputClass}
            />

            <input
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              placeholder="Trainer Qualification"
              className={inputClass}
            />
          </div>

          {/* Sub Categories */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Program Categories</h3>

            {formData.subCategories.map((cat, index) => (
              <div
                key={index}
                className="border border-white/20 rounded-lg p-4 mb-4 space-y-4"
              >
                <input
                  name="title"
                  value={cat.title}
                  onChange={(e) => handleSubCategoryChange(index, e)}
                  placeholder="Category Title"
                  className={inputClass}
                />

                {/* Multi Image Upload */}
                <div>
                  <label className="block text-sm mb-1">Category Images</label>
                  <input
                    type="file"
                    name="image"
                    multiple
                    accept="image/*"
                    onChange={handleMultiImageUpload}
                    className="w-full text-sm text-gray-300
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-lg file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-600 file:text-white
                      hover:file:bg-blue-700"
                  />
                  {cat.image.length > 0 && (
                    <p className="text-xs mt-1 text-gray-300">
                      {cat.image.length} file(s) selected
                    </p>
                  )}
                </div>

                <textarea
                  name="description"
                  value={cat.description}
                  onChange={(e) => handleSubCategoryChange(index, e)}
                  placeholder="Category Description"
                  className={inputClass}
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    name="schedule"
                    value={cat.schedule}
                    onChange={(e) => handleSubCategoryChange(index, e)}
                    placeholder="Schedule"
                    className={inputClass}
                  />

                  <input
                    name="programTime"
                    value={cat.programTime}
                    onChange={(e) => handleSubCategoryChange(index, e)}
                    placeholder="Program Time"
                    className={inputClass}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    name="price"
                    type="number"
                    value={cat.price}
                    onChange={(e) => handleSubCategoryChange(index, e)}
                    placeholder="Price"
                    className={inputClass}
                  />

                  <input
                    name="duration"
                    value={cat.duration}
                    onChange={(e) => handleSubCategoryChange(index, e)}
                    placeholder="Duration"
                    className={inputClass}
                  />
                </div>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="status"
                    checked={cat.status}
                    onChange={(e) => handleSubCategoryChange(index, e)}
                  />
                  Active
                </label>
              </div>
            ))}

            <button
              type="button"
              onClick={addSubCategory}
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
            >
              + Add Category
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-600 rounded-lg font-semibold hover:bg-green-700 transition"
            onClick={createProgram}
          >
            Create Program
          </button>
        </form>
      </div>
    </section>
  );
};
const inputClass =
  "w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500";

export default CreateProgram;
