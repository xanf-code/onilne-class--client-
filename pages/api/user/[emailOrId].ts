import { ObjectID } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import ErrorResponseModel from "../../../models/error_response_model";
import UserModel from "../../../models/user_model";
import BackendUtils from "../../../utils/backend_utils";
import DatabaseUtils from "../../../utils/database_utils";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseModel | UserModel>
): Promise<void> => {
  if (req.method == "GET") {
    const emailOrId = req.query.emailOrId as string;
    const parameterIsId = DatabaseUtils.idIsValid(emailOrId);
    const query = parameterIsId
      ? { _id: new ObjectID(emailOrId) }
      : { email: emailOrId };
    const usersCollection = await DatabaseUtils.getUsersCollection();
    const response = await usersCollection.findOne(query);

    if (!response) {
      return res.status(400).json({ error: "User not found in database" });
    }

    return res.status(200).json(response);
  }

  return BackendUtils.wronRequestMethodError(res);
};
