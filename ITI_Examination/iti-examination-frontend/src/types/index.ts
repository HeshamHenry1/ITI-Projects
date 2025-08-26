export type Branch = {
  Branch_ID: number;
  Branch_Name: string;
  Branch_Location?: string;
};

export type Department = {
  Dept_ID: number;
  Dept_Name: string;
  Branch_ID: number;
  Branch_Name?: string;
};

export type Instructor = {
  Ins_ID: number;
  Ins_Name: string;
  Ins_Degree?: string;
  Dept_ID: number;
  Dept_Name?: string;
  Branch_Name?: string;
};

export type Course = {
  Crs_ID: number;
  Crs_Name: string;
  Crs_Duration?: number;
  Dept_ID: number;
  Dept_Name?: string;
  Branch_Name?: string;
};

export type Student = {
  St_ID: number;
  St_Fname: string;
  St_Lname: string;
  St_BirthDate?: string;
  St_Address?: string;
};

export type Question = {
  Q_ID: number;
  Q_Text: string;
  Q_Type?: string;
  Model_Answer?: string;
  choices?: string;
};

