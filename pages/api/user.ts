import { NextApiRequest, NextApiResponse } from "next";
import ErrorResponseModel from "../../models/error_response_model";
import UserModel from "../../models/user_model";
import DatabaseUtils from "../../utils/database_utils";
import BackendUtils from "../../utils/backend_utils";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseModel | UserModel>
): Promise<void> => {
  if (req.method === "POST") {
    const user = new UserModel(req.body);
    if (!user.validateParameters()) {
      return res
        .status(400)
        .json({ error: "Some request parameters are missing." });
    }

    const usersCollection = await DatabaseUtils.getUsersCollection();
    await usersCollection.insertOne(user);
    return res.status(200).json(user);
  }

  return BackendUtils.wronRequestMethodError(res);
};
