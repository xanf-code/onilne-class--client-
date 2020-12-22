import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import UserModel from "../../models/user_model";
import HttpUtils from "../../utils/http_utils";

export default function Page({ name, email }: UserModel) {
  return (
    <div>
      <h1>Professor: {name}</h1>
      <h1>Email: {email}</h1>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const teacherId = context.query._id as string;
  const response = await HttpUtils.fetchUser(teacherId);
  const teacher = response.data;
  if (!teacher.isTeacher) {
    context.res.statusCode = 404;
    context.res.end();
  }

  return {
    props: teacher,
  };
};
