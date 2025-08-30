// Frontend-only dataset reflecting the provided SQL inserts
export const branches = [
  { Branch_ID: 1, Branch_Name: 'ITI Cairo Branch', Branch_Location: 'Smart Village, Cairo' },
  { Branch_ID: 2, Branch_Name: 'ITI Alexandria Branch', Branch_Location: 'Borg El Arab, Alexandria' }
];

export const departments = [
  { Dept_ID: 10, Dept_Name: 'Open Source Development', Branch_ID: 1 },
  { Dept_ID: 20, Dept_Name: 'Data Science & AI', Branch_ID: 1 },
  { Dept_ID: 30, Dept_Name: 'Embedded Systems', Branch_ID: 2 },
  { Dept_ID: 40, Dept_Name: 'UI/UX Design', Branch_ID: 2 }
];

export const courses = [
  { Crs_ID: 101, Crs_Name: 'SQL Server Development', Crs_Duration: 40, Dept_ID: 10 },
  { Crs_ID: 102, Crs_Name: 'Web Development using PHP', Crs_Duration: 60, Dept_ID: 10 },
  { Crs_ID: 201, Crs_Name: 'Python for Data Science', Crs_Duration: 50, Dept_ID: 20 },
  { Crs_ID: 202, Crs_Name: 'Machine Learning Fundamentals', Crs_Duration: 70, Dept_ID: 20 },
  { Crs_ID: 301, Crs_Name: 'C Programming for Embedded', Crs_Duration: 80, Dept_ID: 30 }
];

export const instructors = [
  { Ins_ID: 1, Ins_Name: 'Ahmed Amr', Ins_Degree: 'M.Sc. in CS', Dept_ID: 10 },
  { Ins_ID: 2, Ins_Name: 'Fatma Ali', Ins_Degree: 'Ph.D. in AI', Dept_ID: 20 },
  { Ins_ID: 3, Ins_Name: 'Khaled Youssef', Ins_Degree: 'M.Sc. in ECE', Dept_ID: 30 },
  { Ins_ID: 4, Ins_Name: 'Mona Saleh', Ins_Degree: 'Ph.D. in CS', Dept_ID: 10 },
  { Ins_ID: 5, Ins_Name: 'Hassan Mahmoud', Ins_Degree: 'M.Sc. in DS', Dept_ID: 20 }
];

export const instructorCourses = [
  { Ins_ID: 1, Crs_ID: 101 }, { Ins_ID: 4, Crs_ID: 101 }, { Ins_ID: 1, Crs_ID: 102 },
  { Ins_ID: 2, Crs_ID: 201 }, { Ins_ID: 5, Crs_ID: 201 }, { Ins_ID: 2, Crs_ID: 202 }, { Ins_ID: 3, Crs_ID: 301 }
];

export const students = [
  { St_ID: 1001, St_Fname: 'Ali', St_Lname: 'Mohamed', St_BirthDate: '2000-05-10', St_Address: 'Cairo', Dept_ID: 10 },
  { St_ID: 1002, St_Fname: 'Sara', St_Lname: 'Ibrahim', St_BirthDate: '2001-01-15', St_Address: 'Giza', Dept_ID: 10 },
  { St_ID: 2001, St_Fname: 'Nour', St_Lname: 'Adel', St_BirthDate: '2000-11-20', St_Address: 'Cairo', Dept_ID: 20 },
  { St_ID: 2002, St_Fname: 'Omar', St_Lname: 'Hesham', St_BirthDate: '1999-07-30', St_Address: 'Alexandria', Dept_ID: 20 },
  { St_ID: 3001, St_Fname: 'Yara', St_Lname: 'Tarek', St_BirthDate: '2002-03-25', St_Address: 'Alexandria', Dept_ID: 30 }
];

export const questions = [];
export const choices = [];

// Seed questions and choices while capturing generated IDs (simulate identity)
let Q_ID = 0;
function addQuestion(q) { Q_ID += 1; questions.push({ Q_ID, ...q }); return Q_ID; }
function addChoices(qId, texts) { texts.forEach(text => choices.push({ Choice_ID: choices.length + 1, Choice_Text: text, Q_ID: qId })); }

const Q1_ID = addQuestion({ Q_Text: 'Which command is used to retrieve data from a database?', Q_Type: 'MCQ', Model_Answer: 'A', Crs_ID: 101 });
addChoices(Q1_ID, ['SELECT', 'UPDATE', 'INSERT', 'DELETE']);
const Q2_ID = addQuestion({ Q_Text: 'Is TRUNCATE a DML command?', Q_Type: 'T/F', Model_Answer: 'False', Crs_ID: 101 });
const Q3_ID = addQuestion({ Q_Text: 'What does DDL stand for?', Q_Type: 'MCQ', Model_Answer: 'C', Crs_ID: 101 });
addChoices(Q3_ID, ['Data Manipulation Language', 'Data Management Language', 'Data Definition Language']);

export const exams = [ { Exam_ID: 500, Exam_Date: '2025-09-15', Exam_Duration: 60, Crs_ID: 101 } ];
export const examQuestions = [ { Exam_ID: 500, Q_ID: Q1_ID }, { Exam_ID: 500, Q_ID: Q2_ID }, { Exam_ID: 500, Q_ID: Q3_ID } ];
export const studentExams = [ { St_ID: 1001, Exam_ID: 500, Exam_Grade: null }, { St_ID: 1002, Exam_ID: 500, Exam_Grade: null } ];
export const studentAnswers = [
  { St_ID: 1001, Exam_ID: 500, Q_ID: Q1_ID, Student_Answer: 'A' },
  { St_ID: 1001, Exam_ID: 500, Q_ID: Q2_ID, Student_Answer: 'True' },
  { St_ID: 1001, Exam_ID: 500, Q_ID: Q3_ID, Student_Answer: 'C' },
  { St_ID: 1002, Exam_ID: 500, Q_ID: Q1_ID, Student_Answer: 'A' },
  { St_ID: 1002, Exam_ID: 500, Q_ID: Q2_ID, Student_Answer: 'False' },
  { St_ID: 1002, Exam_ID: 500, Q_ID: Q3_ID, Student_Answer: 'C' }
];

// Utility helpers for reports
export const db = {
  branches, departments, courses, instructors, instructorCourses,
  students, questions, choices, exams, examQuestions, studentExams, studentAnswers
};


