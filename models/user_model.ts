import AppointmentModel from "./appointment_model";
import AvailableHoursModel from "./available_hours_model";
import ReviewModel from "./review_model";
import TypeUtils from "../utils/type_utils";

export default class UserModel {
  _id: string;
  name: string;
  email: string;
  cellphone: string;
  isTeacher: boolean;
  courses: string[];
  available_hours: AvailableHoursModel;
  available_locations: string[];
  appointments: AppointmentModel[];
  reviews: ReviewModel[];
  coins: number;

  constructor(body: any) {
    this.name = body.name;
    this.email = body.email;
    this.cellphone = body.cellphone;
    this.isTeacher = body.isTeacher;
    this.courses = body.courses;
    this.available_hours = body.available_hours;
    this.available_locations = body.available_locations;
    this.appointments = [];
    this.reviews = [];
    this.coins = 1;
  }

  validateParameters(): boolean {
    if (!this._baseParametersAreValid()) return false;
    if (this.isTeacher && !this._teacherParametersAreValid()) return false;
    if (!this.isTeacher) {
      this.reviews = null;
      this.available_hours = null;
      this.available_locations = null;
      this.courses = null;
    }
    return true;
  }

  _baseParametersAreValid(): boolean {
    return (
      this.name !== undefined &&
      this.email !== undefined &&
      this.cellphone !== undefined &&
      this.isTeacher !== undefined
    );
  }

  _teacherParametersAreValid(): boolean {
    return (
      this.courses !== undefined &&
      this.available_hours !== undefined &&
      this.available_locations !== undefined &&
      TypeUtils.arrayIsOfType(this.courses, "string")
    );
  }
}
