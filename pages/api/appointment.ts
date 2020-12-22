import { NextApiRequest, NextApiResponse } from "next";
import ErrorResponseModel from "../../models/error_response_model";
import AppointmentModel from "../../models/appointment_model";
import BackendUtils from "../../utils/backend_utils";
import DatabaseUtils from "../../utils/database_utils";
import { ObjectID, Collection, UpdateWriteOpResult } from "mongodb";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseModel | AppointmentModel>
): Promise<void> => {
  if (!(await BackendUtils.requestIsAuthenticated(req))) {
    return BackendUtils.unaunthenticatedError(res);
  }

  if (req.method === "POST") {
    const appointment = new AppointmentModel(req.body);
    if (!appointment.validateParameters()) {
      return res.status(400).json({ error: "Some parameters are missing" });
    }

    if (!DatabaseUtils.idIsValid(appointment.teacher_id)) {
      return res
        .status(400)
        .json({ error: "The passed teacher_id is invalid" });
    }
    if (!DatabaseUtils.idIsValid(appointment.student_id)) {
      return res
        .status(400)
        .json({ error: "The passed student_id is invalid" });
    }

    const teacherObjId = new ObjectID(appointment.teacher_id);
    const studentObjId = new ObjectID(appointment.student_id);

    const usersCollection = await DatabaseUtils.getUsersCollection();
    if (!(await collectionHasId(usersCollection, teacherObjId))) {
      return res.status(400).json({ error: "Teacher id not found" });
    }
    if (!(await collectionHasId(usersCollection, studentObjId))) {
      return res.status(400).json({ error: "Student id not found" });
    }

    await usersCollection.updateOne(
      { _id: teacherObjId },
      { $push: { appointments: appointment }, $inc: { coins: 1 } }
    );
    await usersCollection.updateOne(
      { _id: studentObjId },
      { $push: { appointments: appointment }, $inc: { coins: -1 } }
    );

    return res.status(200).json(appointment);
  }
  return BackendUtils.wronRequestMethodError(res);
};

async function collectionHasId(
  collection: Collection<any>,
  objectId: ObjectID
): Promise<boolean> {
  const response = await collection.findOne({ _id: objectId });
  return response !== null;
}

function updateHasFailed(updateResponse: UpdateWriteOpResult): boolean {
  return updateResponse.result.nModified == 0;
}
