import { get, post, del } from './rest';

export const getCourses = () => get('courses');

export const getStudents = (course) => get(`students`);

export const getAttendance = async (course, date) => {
  const students = await getStudents(course);
  const attendance = await get(`courses/${course}/assists/?date=${date}`);

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
    if(assist) return del(`assists/${assist}`);
    else throw Error("No se encuentra la asistencia");
  }
  return post(`courses/${course}/assists`, {
    date,
    present_code: value,
    student_id: student,
  });
  
};

/*export const getStudents = async () => [
  {
    id: 1,
    name: 'Matias',
    surname: 'Berrueta',
    attendance: 'full'
  },
  {
    id: 2,
    name: 'Javier',
    surname: 'Castro',
    attendance: 'full'
  },
  {
    id: 3,
    name: 'Erica',
    surname: 'Nuñez',
    attendance: 'none'
  },
  {
    id: 4,
    name: 'Florencia',
    surname: 'Otero',
    attendance: 'none'
  },
  {
    id: 5,
    name: 'Alberto',
    surname: 'Sal',
    attendance: 'full'
  },
];*/