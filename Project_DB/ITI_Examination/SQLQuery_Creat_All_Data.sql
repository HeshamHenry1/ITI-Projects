CREATE DATABASE Examination_System;

USE Examination_System;


CREATE TABLE Branches (
    Branch_ID INT PRIMARY KEY,
    Branch_Name NVARCHAR(100) NOT NULL,
    Branch_Location NVARCHAR(200)
);

CREATE TABLE Departments (
    Dept_ID INT PRIMARY KEY,
    Dept_Name NVARCHAR(100) NOT NULL,
    Branch_ID INT,
    CONSTRAINT FK_Dept_Branch FOREIGN KEY (Branch_ID) REFERENCES Branches(Branch_ID)
);


CREATE TABLE Courses (
    Crs_ID INT PRIMARY KEY,
    Crs_Name NVARCHAR(100) NOT NULL,
    Crs_Duration INT,
    Dept_ID INT,
    CONSTRAINT FK_Course_Dept FOREIGN KEY (Dept_ID) REFERENCES Departments(Dept_ID)
);


CREATE TABLE Topics (
    Topic_ID INT PRIMARY KEY,
    Topic_Name NVARCHAR(150) NOT NULL,
    Crs_ID INT,
    CONSTRAINT FK_Topic_Course FOREIGN KEY (Crs_ID) REFERENCES Courses(Crs_ID)
);


CREATE TABLE Students (
    St_ID INT PRIMARY KEY,
    St_Fname NVARCHAR(50) NOT NULL,
    St_Lname NVARCHAR(50) NOT NULL,
    St_BirthDate DATE,
    St_Address NVARCHAR(200),
    Dept_ID INT,
    CONSTRAINT FK_Student_Dept FOREIGN KEY (Dept_ID) REFERENCES Departments(Dept_ID)
);


CREATE TABLE Instructors (
    Ins_ID INT PRIMARY KEY,
    Ins_Name NVARCHAR(100) NOT NULL,
    Ins_Degree NVARCHAR(100),
    Dept_ID INT,
    CONSTRAINT FK_Instructor_Dept FOREIGN KEY (Dept_ID) REFERENCES Departments(Dept_ID)
);


CREATE TABLE Questions (
    Q_ID INT PRIMARY KEY IDENTITY(1,1), -- IDENTITY لترقيم تلقائي
    Q_Text NVARCHAR(MAX) NOT NULL,
    Q_Type NVARCHAR(10) NOT NULL, -- 'MCQ' or 'T/F'
    Model_Answer NVARCHAR(255) NOT NULL,
    Crs_ID INT,
    CONSTRAINT FK_Question_Course FOREIGN KEY (Crs_ID) REFERENCES Courses(Crs_ID)
);

CREATE TABLE Choices (
    Choice_ID INT PRIMARY KEY IDENTITY(1,1),
    Choice_Text NVARCHAR(255) NOT NULL,
    Q_ID INT,
    CONSTRAINT FK_Choice_Question FOREIGN KEY (Q_ID) REFERENCES Questions(Q_ID) ON DELETE CASCADE -- لحذف الاختيارات عند حذف السؤال
);


CREATE TABLE Exams (
    Exam_ID INT PRIMARY KEY,
    Exam_Date DATE NOT NULL,
    Exam_Duration INT, -- بالدقائق
    Crs_ID INT,
    CONSTRAINT FK_Exam_Course FOREIGN KEY (Crs_ID) REFERENCES Courses(Crs_ID)
);


CREATE TABLE Instructor_Courses (
    Ins_ID INT,
    Crs_ID INT,
    CONSTRAINT PK_Ins_Crs PRIMARY KEY (Ins_ID, Crs_ID),
    CONSTRAINT FK_InsCrs_Instructor FOREIGN KEY (Ins_ID) REFERENCES Instructors(Ins_ID),
    CONSTRAINT FK_InsCrs_Course FOREIGN KEY (Crs_ID) REFERENCES Courses(Crs_ID)
);


CREATE TABLE Exam_Questions (
    Exam_ID INT,
    Q_ID INT,
    CONSTRAINT PK_Exam_Q PRIMARY KEY (Exam_ID, Q_ID),
    CONSTRAINT FK_ExamQ_Exam FOREIGN KEY (Exam_ID) REFERENCES Exams(Exam_ID),
    CONSTRAINT FK_ExamQ_Question FOREIGN KEY (Q_ID) REFERENCES Questions(Q_ID)
);


CREATE TABLE Student_Exams (
    St_ID INT,
    Exam_ID INT,
    Exam_Grade INT,
    CONSTRAINT PK_St_Exam PRIMARY KEY (St_ID, Exam_ID),
    CONSTRAINT FK_StExam_Student FOREIGN KEY (St_ID) REFERENCES Students(St_ID),
    CONSTRAINT FK_StExam_Exam FOREIGN KEY (Exam_ID) REFERENCES Exams(Exam_ID)
);


CREATE TABLE Student_Answers (
    St_ID INT,
    Exam_ID INT,
    Q_ID INT,
    Student_Answer NVARCHAR(255),
    CONSTRAINT PK_St_Exam_Q PRIMARY KEY (St_ID, Exam_ID, Q_ID),
    CONSTRAINT FK_StAns_StExam FOREIGN KEY (St_ID, Exam_ID) REFERENCES Student_Exams(St_ID, Exam_ID) ON DELETE CASCADE, -- عند حذف أداء الطالب، تُحذف إجاباته
    CONSTRAINT FK_StAns_Question FOREIGN KEY (Q_ID) REFERENCES Questions(Q_ID)
);


INSERT INTO Branches (Branch_ID, Branch_Name, Branch_Location) VALUES
(1, 'ITI Cairo Branch', 'Smart Village, Cairo'),
(2, 'ITI Alexandria Branch', 'Borg El Arab, Alexandria');


INSERT INTO Departments (Dept_ID, Dept_Name, Branch_ID) VALUES
(10, 'Open Source Development', 1),
(20, 'Data Science & AI', 1),
(30, 'Embedded Systems', 2),
(40, 'UI/UX Design', 2);


INSERT INTO Courses (Crs_ID, Crs_Name, Crs_Duration, Dept_ID) VALUES
(101, 'SQL Server Development', 40, 10),
(102, 'Web Development using PHP', 60, 10),
(201, 'Python for Data Science', 50, 20),
(202, 'Machine Learning Fundamentals', 70, 20),
(301, 'C Programming for Embedded', 80, 30);

INSERT INTO Instructors (Ins_ID, Ins_Name, Ins_Degree, Dept_ID) VALUES
(1, 'Ahmed Amr', 'M.Sc. in CS', 10),
(2, 'Fatma Ali', 'Ph.D. in AI', 20),
(3, 'Khaled Youssef', 'M.Sc. in ECE', 30),
(4, 'Mona Saleh', 'Ph.D. in CS', 10),
(5, 'Hassan Mahmoud', 'M.Sc. in DS', 20);


INSERT INTO Instructor_Courses (Ins_ID, Crs_ID) VALUES
(1, 101), -- Ahmed يدرس SQL
(4, 101), -- Mona تدرس SQL أيضاً
(1, 102), -- Ahmed يدرس PHP
(2, 201), -- Fatma تدرس Python
(5, 201), -- Hassan يدرس Python أيضاً
(2, 202), -- Fatma تدرس ML
(3, 301); -- Khaled يدرس C


INSERT INTO Students (St_ID, St_Fname, St_Lname, St_BirthDate, St_Address, Dept_ID) VALUES
(1001, 'Ali', 'Mohamed', '2000-05-10', 'Cairo', 10),
(1002, 'Sara', 'Ibrahim', '2001-01-15', 'Giza', 10),
(2001, 'Nour', 'Adel', '2000-11-20', 'Cairo', 20),
(2002, 'Omar', 'Hesham', '1999-07-30', 'Alexandria', 20),
(3001, 'Yara', 'Tarek', '2002-03-25', 'Alexandria', 30);


INSERT INTO Questions (Q_Text, Q_Type, Model_Answer, Crs_ID) VALUES ('Which command is used to retrieve data from a database?', 'MCQ', 'A', 101);
DECLARE @Q1_ID INT = SCOPE_IDENTITY();
INSERT INTO Choices (Choice_Text, Q_ID) VALUES ('SELECT', @Q1_ID), ('UPDATE', @Q1_ID), ('INSERT', @Q1_ID), ('DELETE', @Q1_ID);


INSERT INTO Questions (Q_Text, Q_Type, Model_Answer, Crs_ID) VALUES ('Is TRUNCATE a DML command?', 'T/F', 'False', 101);
DECLARE @Q2_ID INT = SCOPE_IDENTITY();


INSERT INTO Questions (Q_Text, Q_Type, Model_Answer, Crs_ID) VALUES ('What does DDL stand for?', 'MCQ', 'C', 101);
DECLARE @Q3_ID INT = SCOPE_IDENTITY();
INSERT INTO Choices (Choice_Text, Q_ID) VALUES ('Data Manipulation Language', @Q3_ID), ('Data Management Language', @Q3_ID), ('Data Definition Language', @Q3_ID);





INSERT INTO Exams (Exam_ID, Exam_Date, Exam_Duration, Crs_ID) VALUES
(500, '2025-09-15', 60, 101);


BEGIN
    -- تعريف المتغيرات التي سنستخدمها لتخزين أرقام الأسئلة الجديدة
    DECLARE @Q1_ID INT, @Q2_ID INT, @Q3_ID INT;

    -- === الخطوة 1: إنشاء الأسئلة وتخزين أرقامها ===
    INSERT INTO Questions (Q_Text, Q_Type, Model_Answer, Crs_ID) VALUES ('Which command is used to retrieve data from a database?', 'MCQ', 'A', 101);
    SET @Q1_ID = SCOPE_IDENTITY();
    INSERT INTO Choices (Choice_Text, Q_ID) VALUES ('SELECT', @Q1_ID), ('UPDATE', @Q1_ID), ('INSERT', @Q1_ID), ('DELETE', @Q1_ID);

    INSERT INTO Questions (Q_Text, Q_Type, Model_Answer, Crs_ID) VALUES ('Is TRUNCATE a DML command?', 'T/F', 'False', 101);
    SET @Q2_ID = SCOPE_IDENTITY();

    INSERT INTO Questions (Q_Text, Q_Type, Model_Answer, Crs_ID) VALUES ('What does DDL stand for?', 'MCQ', 'C', 101);
    SET @Q3_ID = SCOPE_IDENTITY();
    INSERT INTO Choices (Choice_Text, Q_ID) VALUES ('Data Manipulation Language', @Q3_ID), ('Data Management Language', @Q3_ID), ('Data Definition Language', @Q3_ID);

    -- === الخطوة 2: إنشاء الامتحان وربطه بالأسئلة ===
    INSERT INTO Exams (Exam_ID, Exam_Date, Exam_Duration, Crs_ID) VALUES (500, '2025-09-15', 60, 101);

    INSERT INTO Exam_Questions (Exam_ID, Q_ID) VALUES
    (500, @Q1_ID),
    (500, @Q2_ID),
    (500, @Q3_ID);

    -- === الخطوة 3: تسجيل أداء الطلاب وإجاباتهم ===
    INSERT INTO Student_Exams (St_ID, Exam_ID, Exam_Grade) VALUES
    (1001, 500, NULL),
    (1002, 500, NULL);

    INSERT INTO Student_Answers (St_ID, Exam_ID, Q_ID, Student_Answer) VALUES
    (1001, 500, @Q1_ID, 'A'),
    (1001, 500, @Q2_ID, 'True'),
    (1001, 500, @Q3_ID, 'C');

    INSERT INTO Student_Answers (St_ID, Exam_ID, Q_ID, Student_Answer) VALUES
    (1002, 500, @Q1_ID, 'A'),
    (1002, 500, @Q2_ID, 'False'),
    (1002, 500, @Q3_ID, 'C');
END
GO



USE master;
GO

-- 2. حذف قاعدة البيانات إذا كانت موجودة
IF DB_ID('Examination_System') IS NOT NULL
BEGIN
    -- إغلاق أي اتصالات مفتوحة على قاعدة البيانات
    ALTER DATABASE Examination_System SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    -- حذف قاعدة البيانات
    DROP DATABASE Examination_System;
    PRINT 'Database Examination_System has been dropped and will be recreated.';
END
GO

-- 3. إعادة إنشاء قاعدة البيانات
CREATE DATABASE Examination_System;
GO

-- 4. استخدام قاعدة البيانات الجديدة
USE Examination_System;
GO


CREATE DATABASE Examination_System;
GO

USE Examination_System;
GO

CREATE TABLE Branches (
    Branch_ID INT PRIMARY KEY,
    Branch_Name NVARCHAR(100) NOT NULL,
    Branch_Location NVARCHAR(200)
);


CREATE TABLE Departments (
    Dept_ID INT PRIMARY KEY,
    Dept_Name NVARCHAR(100) NOT NULL,
    Branch_ID INT,
    CONSTRAINT FK_Dept_Branch FOREIGN KEY (Branch_ID) REFERENCES Branches(Branch_ID)
);


CREATE TABLE Courses (
    Crs_ID INT PRIMARY KEY,
    Crs_Name NVARCHAR(100) NOT NULL,
    Crs_Duration INT,
    Dept_ID INT,
    CONSTRAINT FK_Course_Dept FOREIGN KEY (Dept_ID) REFERENCES Departments(Dept_ID)
);


CREATE TABLE Topics (
    Topic_ID INT PRIMARY KEY,
    Topic_Name NVARCHAR(150) NOT NULL,
    Crs_ID INT,
    CONSTRAINT FK_Topic_Course FOREIGN KEY (Crs_ID) REFERENCES Courses(Crs_ID)
);


CREATE TABLE Students (
    St_ID INT PRIMARY KEY,
    St_Fname NVARCHAR(50) NOT NULL,
    St_Lname NVARCHAR(50) NOT NULL,
    St_BirthDate DATE,
    St_Address NVARCHAR(200),
    Dept_ID INT,
    CONSTRAINT FK_Student_Dept FOREIGN KEY (Dept_ID) REFERENCES Departments(Dept_ID)
);


CREATE TABLE Instructors (
    Ins_ID INT PRIMARY KEY,
    Ins_Name NVARCHAR(100) NOT NULL,
    Ins_Degree NVARCHAR(100),
    Dept_ID INT,
    CONSTRAINT FK_Instructor_Dept FOREIGN KEY (Dept_ID) REFERENCES Departments(Dept_ID)
);


CREATE TABLE Questions (
    Q_ID INT PRIMARY KEY IDENTITY(1,1),
    Q_Text NVARCHAR(MAX) NOT NULL,
    Q_Type NVARCHAR(10) NOT NULL, -- 'MCQ' or 'T/F'
    Model_Answer NVARCHAR(255) NOT NULL,
    Crs_ID INT,
    CONSTRAINT FK_Question_Course FOREIGN KEY (Crs_ID) REFERENCES Courses(Crs_ID)
);


CREATE TABLE Choices (
    Choice_ID INT PRIMARY KEY IDENTITY(1,1),
    Choice_Text NVARCHAR(255) NOT NULL,
    Q_ID INT,
    CONSTRAINT FK_Choice_Question FOREIGN KEY (Q_ID) REFERENCES Questions(Q_ID) ON DELETE CASCADE
);


CREATE TABLE Exams (
    Exam_ID INT PRIMARY KEY,
    Exam_Date DATE NOT NULL,
    Exam_Duration INT,
    Crs_ID INT,
    CONSTRAINT FK_Exam_Course FOREIGN KEY (Crs_ID) REFERENCES Courses(Crs_ID)
);


CREATE TABLE Instructor_Courses (
    Ins_ID INT,
    Crs_ID INT,
    CONSTRAINT PK_Ins_Crs PRIMARY KEY (Ins_ID, Crs_ID),
    CONSTRAINT FK_InsCrs_Instructor FOREIGN KEY (Ins_ID) REFERENCES Instructors(Ins_ID),
    CONSTRAINT FK_InsCrs_Course FOREIGN KEY (Crs_ID) REFERENCES Courses(Crs_ID)
);


CREATE TABLE Exam_Questions (
    Exam_ID INT,
    Q_ID INT,
    CONSTRAINT PK_Exam_Q PRIMARY KEY (Exam_ID, Q_ID),
    CONSTRAINT FK_ExamQ_Exam FOREIGN KEY (Exam_ID) REFERENCES Exams(Exam_ID),
    CONSTRAINT FK_ExamQ_Question FOREIGN KEY (Q_ID) REFERENCES Questions(Q_ID)
);


CREATE TABLE Student_Exams (
    St_ID INT,
    Exam_ID INT,
    Exam_Grade INT,
    CONSTRAINT PK_St_Exam PRIMARY KEY (St_ID, Exam_ID),
    CONSTRAINT FK_StExam_Student FOREIGN KEY (St_ID) REFERENCES Students(St_ID),
    CONSTRAINT FK_StExam_Exam FOREIGN KEY (Exam_ID) REFERENCES Exams(Exam_ID)
);


CREATE TABLE Student_Answers (
    St_ID INT,
    Exam_ID INT,
    Q_ID INT,
    Student_Answer NVARCHAR(255),
    CONSTRAINT PK_St_Exam_Q PRIMARY KEY (St_ID, Exam_ID, Q_ID),
    CONSTRAINT FK_StAns_StExam FOREIGN KEY (St_ID, Exam_ID) REFERENCES Student_Exams(St_ID, Exam_ID) ON DELETE CASCADE,
    CONSTRAINT FK_StAns_Question FOREIGN KEY (Q_ID) REFERENCES Questions(Q_ID)
);


-- إضافة الفروع
INSERT INTO Branches (Branch_ID, Branch_Name, Branch_Location) VALUES
(1, 'ITI Cairo Branch', 'Smart Village, Cairo'),
(2, 'ITI Alexandria Branch', 'Borg El Arab, Alexandria');



-- إضافة الأقسام
INSERT INTO Departments (Dept_ID, Dept_Name, Branch_ID) VALUES
(10, 'Open Source Development', 1),
(20, 'Data Science & AI', 1),
(30, 'Embedded Systems', 2),
(40, 'UI/UX Design', 2);



-- إضافة المواد الدراسية
INSERT INTO Courses (Crs_ID, Crs_Name, Crs_Duration, Dept_ID) VALUES
(101, 'SQL Server Development', 40, 10),
(102, 'Web Development using PHP', 60, 10),
(201, 'Python for Data Science', 50, 20),
(202, 'Machine Learning Fundamentals', 70, 20),
(301, 'C Programming for Embedded', 80, 30);


-- إضافة المدرسين
INSERT INTO Instructors (Ins_ID, Ins_Name, Ins_Degree, Dept_ID) VALUES
(1, 'Ahmed Amr', 'M.Sc. in CS', 10),
(2, 'Fatma Ali', 'Ph.D. in AI', 20),
(3, 'Khaled Youssef', 'M.Sc. in ECE', 30),
(4, 'Mona Saleh', 'Ph.D. in CS', 10),
(5, 'Hassan Mahmoud', 'M.Sc. in DS', 20);


-- ربط المدرسين بالمواد
INSERT INTO Instructor_Courses (Ins_ID, Crs_ID) VALUES
(1, 101), (4, 101), (1, 102), (2, 201), (5, 201), (2, 202), (3, 301);




-- إضافة الطلاب
INSERT INTO Students (St_ID, St_Fname, St_Lname, St_BirthDate, St_Address, Dept_ID) VALUES
(1001, 'Ali', 'Mohamed', '2000-05-10', 'Cairo', 10),
(1002, 'Sara', 'Ibrahim', '2001-01-15', 'Giza', 10),
(2001, 'Nour', 'Adel', '2000-11-20', 'Cairo', 20),
(2002, 'Omar', 'Hesham', '1999-07-30', 'Alexandria', 20),
(3001, 'Yara', 'Tarek', '2002-03-25', 'Alexandria', 30);
GO


-- إضافة الأسئلة والامتحانات والإجابات (في حزمة واحدة لتجنب أخطاء المتغيرات)
BEGIN
    DECLARE @Q1_ID INT, @Q2_ID INT, @Q3_ID INT;

    -- إنشاء أسئلة لمادة SQL Server (Crs_ID = 101)
    INSERT INTO Questions (Q_Text, Q_Type, Model_Answer, Crs_ID) VALUES ('Which command is used to retrieve data from a database?', 'MCQ', 'A', 101);
    SET @Q1_ID = SCOPE_IDENTITY();
    INSERT INTO Choices (Choice_Text, Q_ID) VALUES ('SELECT', @Q1_ID), ('UPDATE', @Q1_ID), ('INSERT', @Q1_ID), ('DELETE', @Q1_ID);

    INSERT INTO Questions (Q_Text, Q_Type, Model_Answer, Crs_ID) VALUES ('Is TRUNCATE a DML command?', 'T/F', 'False', 101);
    SET @Q2_ID = SCOPE_IDENTITY();

    INSERT INTO Questions (Q_Text, Q_Type, Model_Answer, Crs_ID) VALUES ('What does DDL stand for?', 'MCQ', 'C', 101);
    SET @Q3_ID = SCOPE_IDENTITY();
    INSERT INTO Choices (Choice_Text, Q_ID) VALUES ('Data Manipulation Language', @Q3_ID), ('Data Management Language', @Q3_ID), ('Data Definition Language', @Q3_ID);

    -- إنشاء امتحان لمادة SQL
    INSERT INTO Exams (Exam_ID, Exam_Date, Exam_Duration, Crs_ID) VALUES (500, '2025-09-15', 60, 101);

    -- ربط الأسئلة بالامتحان
    INSERT INTO Exam_Questions (Exam_ID, Q_ID) VALUES (500, @Q1_ID), (500, @Q2_ID), (500, @Q3_ID);

    -- تسجيل أداء الطلاب في الامتحان
    INSERT INTO Student_Exams (St_ID, Exam_ID, Exam_Grade) VALUES (1001, 500, NULL), (1002, 500, NULL);

    -- تسجيل إجابات الطلاب
    INSERT INTO Student_Answers (St_ID, Exam_ID, Q_ID, Student_Answer) VALUES
    (1001, 500, @Q1_ID, 'A'), (1001, 500, @Q2_ID, 'True'), (1001, 500, @Q3_ID, 'C');

    INSERT INTO Student_Answers (St_ID, Exam_ID, Q_ID, Student_Answer) VALUES
    (1002, 500, @Q1_ID, 'A'), (1002, 500, @Q2_ID, 'False'), (1002, 500, @Q3_ID, 'C');
END
GO

PRINT 'All data inserted successfully.';
GO



