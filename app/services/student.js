import { get, post, del, put } from './rest';
import { getUser } from './common';

export const getSubjects = async () => {
  const user = await getUser();
  return get(`courses/${user.course.id}/subjects`);
}

export const getSubject = (subject) => get(`subjects/${subject}`);

export const getLesson = (lesson) => get(`lessons/${lesson}`);

export const getAttendance = async (date) => {
  const user = await getUser();
  return get(`students/${user.id}/attendances?date=${date}`, { date });
}

export const getExam = async (exam_id) => {
  const user = await getUser();
  return get(`students/${user.id}/student-exams`, { exam_id });
}

export const createExam = async (exam_id) => {
  const user = await getUser();
  return post(`students/${user.id}/student-exams`, { exam_id });
}

export const addExamAnswer = (exam_id, exam_question_id, answer) => 
  post(`student-exams/${exam_id}/student-answers`, { exam_question_id, answer });

export const getStudentExam = (exam_id) => get(`student-exams/${exam_id}`);

export const saveLessonFeedback = async (lesson_id, value, comments) => {
  const user = await getUser();
  return post(`lessons/${lesson_id}/feedback`, { student_id: user.id, value, comments });
}

export const getLessonFeedback = async (lesson_id) => {
  const user = await getUser();
  return get(`lessons/${lesson_id}/feedback`, { student_id: user.id });
}

export const saveExamFeedback = async (exam_id, value, comments) => {
  const user = await getUser();
  return post(`exams/${exam_id}/feedback`, { student_id: user.id, value, comments });
}

export const saveTeacherFeedback = async (teacher_id, value, comments) => {
  const user = await getUser();
  return post(`teachers/${teacher_id}/feedback`, { student_id: user.id, value, comments });
}





export const updateLesson = (lesson, changes) => put(`lessons/${lesson}`, changes);

export const deleteLesson = (lesson) => del(`lessons/${lesson}`);

export const updateTopic = (lesson, topic, title, description) => {
  if(topic) {
    return put(`topics/${topic}`, { title, description });
  } else {
    return post(`lessons/${lesson}/topics`, { title, description });
  }
}

export const deleteTopic = (topic_id) => del(`topics/${topic_id}`);

export const enableExam = (exam, enabled) => put(`exams/${exam}`, { enabled });

export const updateExamQuestion = (exam, question_id, question, options) => {
  if(question_id) {
    return put(`exam-questions/${question_id}`, { question, options });
  } else {
    return post(`exams/${exam}/exam-questions`, { question, options });
  }
}

export const deleteExamQuestion = (question_id) => del(`exam-questions/${question_id}`);
