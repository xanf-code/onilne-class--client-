import { timingSafeEqual } from "crypto";

export default class AppointmentModel {
  date: string;
  teacher_name: string;
  teacher_id: string;
  student_name: string;
  student_id: string;
  course: string;
  location: string;
  link: string;

  constructor(body: any) {
    this.date = body.date;
    this.teacher_name = body.teacher_name;
    this.teacher_id = body.teacher_id;
    this.student_name = body.student_name;
    this.student_id = body.student_id;
    this.course = body.course;
    this.location = body.location;
    this.link = body.link || "";
  }

  validateParameters(): boolean {
    return (
      this.date !== undefined &&
      this.teacher_name !== undefined &&
      this.teacher_id !== undefined &&
      this.student_name !== undefined &&
      this.student_id !== undefined &&
      this.course !== undefined &&
      this.location !== undefined
    );
  }
}
