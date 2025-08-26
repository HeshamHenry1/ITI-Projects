CREATE PROCEDURE Generate_Exam
    @Crs_ID INT,
    @MCQ_Count INT,
    @TF_Count INT
AS
BEGIN
    -- منع عرض عدد الصفوف المتأثرة في كل عملية (للنظافة)
    SET NOCOUNT ON;

    -- 1. إنشاء سجل جديد للامتحان في جدول Exams
    -- سنفترض أن رقم الامتحان هو أكبر رقم موجود + 1
    DECLARE @New_Exam_ID INT;
    SELECT @New_Exam_ID = ISNULL(MAX(Exam_ID), 0) + 1 FROM Exams;

    INSERT INTO Exams (Exam_ID, Exam_Date, Exam_Duration, Crs_ID)
    VALUES (@New_Exam_ID, GETDATE(), 60, @Crs_ID); -- نفترض مدة الامتحان 60 دقيقة

    -- 2. إدراج أسئلة الاختيار من متعدد (MCQ) العشوائية
    -- NEWID() تُستخدم لتوليد ترتيب عشوائي
    INSERT INTO Exam_Questions (Exam_ID, Q_ID)
    SELECT TOP (@MCQ_Count) @New_Exam_ID, Q_ID
    FROM Questions
    WHERE Crs_ID = @Crs_ID AND Q_Type = 'MCQ'
    ORDER BY NEWID();

    -- 3. إدراج أسئلة الصح والخطأ (T/F) العشوائية
    INSERT INTO Exam_Questions (Exam_ID, Q_ID)
    SELECT TOP (@TF_Count) @New_Exam_ID, Q_ID
    FROM Questions
    WHERE Crs_ID = @Crs_ID AND Q_Type = 'T/F'
    ORDER BY NEWID();

    -- رسالة تأكيد (اختياري)
    PRINT 'New exam with ID ' + CAST(@New_Exam_ID AS VARCHAR) + ' has been generated successfully.';
END
GO



EXEC Generate_Exam @Crs_ID = 101, @MCQ_Count = 2, @TF_Count = 1;




CREATE PROCEDURE Correct_Exam
    @St_ID INT,
    @Exam_ID INT
AS
BEGIN
    SET NOCOUNT ON;

    -- 1. حساب عدد الإجابات الصحيحة
    DECLARE @Correct_Answers INT;

    SELECT @Correct_Answers = COUNT(*)
    FROM Student_Answers SA
    INNER JOIN Questions Q ON SA.Q_ID = Q.Q_ID
    WHERE SA.St_ID = @St_ID
      AND SA.Exam_ID = @Exam_ID
      AND SA.Student_Answer = Q.Model_Answer;

    -- 2. حساب إجمالي عدد الأسئلة في الامتحان
    DECLARE @Total_Questions INT;
    SELECT @Total_Questions = COUNT(*)
    FROM Exam_Questions
    WHERE Exam_ID = @Exam_ID;

    -- 3. حساب الدرجة كنسبة مئوية (لتجنب القسمة على صفر)
    DECLARE @Final_Grade INT = 0;
    IF @Total_Questions > 0
    BEGIN
        SET @Final_Grade = (@Correct_Answers * 100) / @Total_Questions;
    END

    -- 4. تحديث درجة الطالب في جدول Student_Exams
    UPDATE Student_Exams
    SET Exam_Grade = @Final_Grade
    WHERE St_ID = @St_ID AND Exam_ID = @Exam_ID;

    -- رسالة تأكيد (اختياري)
    PRINT 'Correction complete for Student ID: ' + CAST(@St_ID AS VARCHAR)
        + ' in Exam ID: ' + CAST(@Exam_ID AS VARCHAR)
        + '. Final Grade: ' + CAST(@Final_Grade AS VARCHAR) + '%';
END
GO


EXEC Correct_Exam @St_ID = 1001, @Exam_ID = 500;


CREATE PROCEDURE Get_Students_By_Department
    @Dept_ID INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        St_ID,
        St_Fname,
        St_Lname,
        St_Address,
        St_BirthDate
    FROM
        Students
    WHERE
        Dept_ID = @Dept_ID;
END
GO
EXEC Get_Students_By_Department @Dept_ID = 10;


CREATE PROCEDURE Get_Student_Grades
    @St_ID INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        C.Crs_Name,
        SE.Exam_Grade
    FROM
        Student_Exams SE
    INNER JOIN Exams E ON SE.Exam_ID = E.Exam_ID
    INNER JOIN Courses C ON E.Crs_ID = C.Crs_ID
    WHERE
        SE.St_ID = @St_ID
        AND SE.Exam_Grade IS NOT NULL; -- نعرض فقط الامتحانات التي تم تصحيحها
END
GO


EXEC Get_Student_Grades @St_ID = 1001;



CREATE PROCEDURE Get_Instructor_Courses_Info
    @Ins_ID INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        C.Crs_Name,
        COUNT(S.St_ID) AS Number_of_Students
    FROM
        Instructor_Courses IC
    INNER JOIN Courses C ON IC.Crs_ID = C.Crs_ID
    LEFT JOIN Students S ON C.Dept_ID = S.Dept_ID -- نفترض أن كل طلاب القسم مسجلين في المادة
    WHERE
        IC.Ins_ID = @Ins_ID
    GROUP BY
        C.Crs_Name;
END
GO


EXEC Get_Instructor_Courses_Info @Ins_ID = 1;




CREATE PROCEDURE Get_Course_Topics
    @Crs_ID INT
AS
BEGIN
    SET NOCOUNT ON;

    -- لم نضف بيانات لجدول المواضيع، لذا سنضيف بعضها الآن للاختبار
    -- هذا الجزء للتأكد من أن الإجراء سيعيد بيانات
    IF NOT EXISTS (SELECT 1 FROM Topics WHERE Crs_ID = 101)
    BEGIN
        INSERT INTO Topics (Topic_ID, Topic_Name, Crs_ID) VALUES
        (1, 'Introduction to SQL', 101),
        (2, 'Data Definition Language (DDL)', 101),
        (3, 'Data Manipulation Language (DML)', 101);
    END

    SELECT
        Topic_Name
    FROM
        Topics
    WHERE
        Crs_ID = @Crs_ID;
END
GO


EXEC Get_Course_Topics @Crs_ID = 101;


CREATE PROCEDURE Get_Exam_Questions_And_Choices
    @Exam_ID INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        Q.Q_ID,
        Q.Q_Text AS Question,
        Q.Q_Type,
        C.Choice_Text AS Choice
    FROM
        Exam_Questions EQ
    INNER JOIN Questions Q ON EQ.Q_ID = Q.Q_ID
    LEFT JOIN Choices C ON Q.Q_ID = C.Q_ID -- نستخدم LEFT JOIN لأن أسئلة الصح والخطأ ليس لها اختيارات
    WHERE
        EQ.Exam_ID = @Exam_ID
    ORDER BY
        Q.Q_ID;
END
GO


EXEC Get_Exam_Questions_And_Choices @Exam_ID = 500;


CREATE PROCEDURE Get_Student_Exam_Answers
    @Exam_ID INT,
    @St_ID INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        Q.Q_Text AS Question,
        SA.Student_Answer
    FROM
        Exam_Questions EQ
    INNER JOIN Questions Q ON EQ.Q_ID = Q.Q_ID
    LEFT JOIN Student_Answers SA ON EQ.Q_ID = SA.Q_ID AND SA.Exam_ID = EQ.Exam_ID AND SA.St_ID = @St_ID
    WHERE
        EQ.Exam_ID = @Exam_ID
        AND (SA.St_ID = @St_ID OR SA.St_ID IS NULL); -- للتأكد من عرض السؤال حتى لو لم يجب عليه الطالب
END
GO


EXEC Get_Student_Exam_Answers @Exam_ID = 500, @St_ID = 1001;
