import label from './label';

export const subjects = { 
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [], 
  saturday: [], 
  sunday: [],
};

export const createSubjects = () => Object.assign({}, subjects);

const weekdays = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday","sunday","monday","tuesday","wednesday","thursday","friday","saturday"]

export const formatDayName = (dayName) => {
  const d = new Date();
  let day = dayName;
  if(dayName == weekdays[d.getDay()]) day = "today";
  if(dayName == weekdays[d.getDay() + 1]) day = "tomorrow";
  return label[day]
};

export const getSortedDays = () => {
  const d = new Date();
  const dayNum = d.getDay();
  const dayList = weekdays.slice(dayNum, 7 + dayNum);
  return weekdays.slice(dayNum, 7 + dayNum);
}
