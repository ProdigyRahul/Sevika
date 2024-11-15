import { Request, RequestHandler } from "express";
import formidable, { File } from "formidable";

export interface RequestWithFiles extends Request {
  files?: { [key: string]: File[] };
}

const fileParser: RequestHandler = async (req: RequestWithFiles, res, next) => {
  if (!req.headers["content-type"]?.startsWith("multipart/form-data")) {
    return res.status(400).json({ error: "Invalid request" });
  }

  const form = formidable({ multiples: true });

  try {
    const [fields, files] = await form.parse(req);

    for (let key in fields) {
      const field = fields[key];
      if (field) {
        req.body[key] = field[0];
      }
    }

    req.files = {};
    for (let key in files) {
      const file = files[key];
      if (file) {
        req.files[key] = file; // This is now an array of files
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default fileParser;
