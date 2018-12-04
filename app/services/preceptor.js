import { get, post, del } from './rest';

export const getCourses = () => get('courses');

export const getStudents = (course) => get(`students`);

export const getAttendance = async (course, date) => {
  const students = await getStudents(course);
  const attendance = await get(`courses/${course}/attendances/?date=${date}`);

  const response = students.map(student => {
    const att = attendance.filter(att => att.student.id === student.id);

    return {
      id: student.id,
      first_name: student.first_name,
      last_name: student.last_name,
      attendance: att.length === 0 ? 'none' : att[0].present_code,
      attendance_id: att.length === 0 ? null : att[0].id,
    };
  });

  console.log(response);

  return response;
};

export const saveAttendance = (course, date, student, value, assist) => {
  if(value === "none"){
    if(assist) return del(`attendances/${assist}`);
    else throw Error("No se encuentra la asistencia");
  }
  return post(`courses/${course}/attendances`, {
    date,
    present_code: value,
    student_id: student,
  });
  
};
