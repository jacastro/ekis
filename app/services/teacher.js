import { get, post, del, put } from './rest';
import { getUser } from './common';

export const getSubjects = async () => {
  const user = await getUser();
  return get(`teachers/${user.id}/subjects`);
}

export const getSubject = (subject) => get(`subjects/${subject}`);

export const createLesson = (subject, title) => {
  const chosenDate = new Date().toJSON();
  const date = chosenDate.substring(0,chosenDate.indexOf("T"))

  return post(`subjects/${subject}/lessons`, { 
    title,
    description: "",
    date,
    picture_url: "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
  });
}

export const getLesson = (lesson) => get(`lessons/${lesson}`);

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

export const getExam = async (exam) => {
  const exam_data = await get(`exams/${exam}`);
  const questions = await get(`exams/${exam}/exam-questions`);
  return {
    enabled: exam_data.enabled,
    id: exam_data.id,
    questions
  };
};

export const enableExam = (exam, enabled) => put(`exams/${exam}`, { enabled });

export const updateExamQuestion = (exam, question_id, question, options) => {
  if(question_id) {
    return put(`exam-questions/${question_id}`, { question, options });
  } else {
    return post(`exams/${exam}/exam-questions`, { question, options });
  }
}

export const deleteExamQuestion = (question_id) => del(`exam-questions/${question_id}`);

export const getStudentExams = (exam_id) => get(`student-exams`, { exam_id });

export const getExamFeedback = async (exam_id) => get(`exams/${exam_id}/feedback`);

export const getLessonFeedback = async (lesson_id) => get(`lessons/${lesson_id}/feedback`);

export const getTeacherFeedback = async (grouped_lesson_id) => {
  const user = await getUser();
  return get(`teachers/${user.id}/feedback`, { grouped_lesson_id });
}