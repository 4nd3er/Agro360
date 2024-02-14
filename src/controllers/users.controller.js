import { Users, Roles, Courses } from "../models/models.js";
import { compObjectId, errorResponse, messages } from "../libs/libs.js";
import {
  getMethod,
  getOneMethod,
  createMethod,
  updateMethod,
} from "../libs/methods.js";
import { validateSenaEmail } from "../libs/functions.js";

export const users = async (req, res) => {
  await getMethod(res, Users, "User");
};

export const instructorImages = async () => {
  try {
    const instructors = await Users.find({
      course: { $exists: false, $eq: null },
    });
    const notImageInstructors = instructors.map((instructor) => {
      const img = `http://localhost:5173/src/img/instructores/${instructor.document}.png`;
      if (!findImage(img)) {
        return {
          instructor: instructor.names + instructor.lastnames,
          document: instructor.document,
          image: false,
        };
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//Comprobar existencia de la imagen
const findImage = async (ruta) => {
  try {
    const response = await fetch(ruta, { method: "HEAD" });
    return response.status !== 404;
  } catch (error) {
    console.error("Error al verificar la existencia de la imagen:", error);
    return false;
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  await getOneMethod(id, res, Users, "User");
};

export const createUser = async (req, res) => {
  const { names, lastnames, documentType, document, rol, email, course } =
    req.body;
  const data = { names, lastnames, documentType, document, rol, email, course };
  const find = { $or: [{ document: document }, { email: email }] };
  try {
    const compRol = await compObjectId(rol, Roles, "Role");
    if (!compRol.success)
      return res.status(compRol.status).json({ message: [compRol.msg] });
    if (course) {
      if (!validateSenaEmail(email))
        return res.status(400).json({ message: ["Invalid Email"] });
      const compCourse = await compObjectId(course, Courses, "Course");
      if (!compCourse.success)
        return res
          .status(compCourse.status)
          .json({ message: [compCourse.msg] });
    }
    await createMethod(data, find, res, Users, "User", "capitalize 2");
  } catch (error) {
    errorResponse(res, error);
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { names, lastnames, documentType, document, rol, email, course } =
    req.body;
  const data = { names, lastnames, documentType, document, rol, email, course };
  const find = { $or: [{ document: document }, { email: email }] };
  try {
    const compRol = await compObjectId(rol, Roles, "Role");
    if (!compRol.success)
      return res.status(compRol.status).json({ message: [compRol.msg] });
    if (course) {
      const compCourse = await compObjectId(course, Courses, "Course");
      if (!compCourse.success)
        return res
          .status(compCourse.status)
          .json({ message: [compCourse.msg] });
    }
    await updateMethod(data, id, find, res, Users, "User", "capitalize 2");
  } catch (error) {
    errorResponse(res, error);
  }
};
