import { NextApiRequest, NextApiResponse } from "next";
import ErrorResponseModel from "../../../models/error_response_model";
import BackendUtils from "../../../utils/backend_utils";
import UserModel from "../../../models/user_model";
import DatabaseUtils from "../../../utils/database_utils";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseModel | UserModel[]>
): Promise<void> => {
  if (req.method === "GET") {
    const course = req.query.course as string;
    if (!course) {
      return res.status(400).json({ error: "Parameter course is missing" });
    }

    const usersCollection = await DatabaseUtils.getUsersCollection();
    const response = await usersCollection
      .find({ courses: { $in: [new RegExp(`^${course}`, "i")] } })
      .toArray();

    return res.status(200).json(response);
  }
  return BackendUtils.wronRequestMethodError(res);
};
