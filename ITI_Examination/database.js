const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class Database {
  constructor() {
    this.db = null;
    this.config = require('./config');
  }

  async connect() {
    return new Promise((resolve, reject) => {
      const dbPath = path.resolve(this.config.database.filename);
      
      this.db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
          console.error('❌ Error connecting to SQLite database:', err.message);
          reject(err);
        } else {
          console.log('✅ Successfully connected to SQLite database!');
          console.log(`📁 Database path: ${dbPath}`);
          resolve(this.db);
        }
      });
    });
  }

  async disconnect() {
    if (this.db) {
      return new Promise((resolve) => {
        this.db.close((err) => {
          if (err) {
            console.error('❌ Error closing database:', err.message);
          } else {
            console.log('✅ SQLite database closed successfully');
          }
          resolve();
        });
      });
    }
  }

  async query(sqlQuery, params = []) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not connected'));
        return;
      }

      this.db.all(sqlQuery, params, (err, rows) => {
        if (err) {
          console.error('❌ Error executing query:', err.message);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async run(sqlQuery, params = []) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not connected'));
        return;
      }

      this.db.run(sqlQuery, params, function(err) {
        if (err) {
          console.error('❌ Error executing query:', err.message);
          reject(err);
        } else {
          resolve({
            lastID: this.lastID,
            changes: this.changes
          });
        }
      });
    });
  }

  async createTables() {
    try {
      console.log('🚀 Starting table creation in SQLite...');
      
      // Create Branches table
      await this.run(`
        CREATE TABLE IF NOT EXISTS Branches (
          Branch_ID INTEGER PRIMARY KEY AUTOINCREMENT,
          Branch_Name TEXT NOT NULL,
          Branch_Location TEXT
        )
      `);
      console.log('✅ Branches table created successfully');

      // Create Departments table
      await this.run(`
        CREATE TABLE IF NOT EXISTS Departments (
          Dept_ID INTEGER PRIMARY KEY AUTOINCREMENT,
          Dept_Name TEXT NOT NULL,
          Branch_ID INTEGER,
          FOREIGN KEY (Branch_ID) REFERENCES Branches(Branch_ID)
        )
      `);
      console.log('✅ Departments table created successfully');

      // Create Instructors table
      await this.run(`
        CREATE TABLE IF NOT EXISTS Instructors (
          Ins_ID INTEGER PRIMARY KEY AUTOINCREMENT,
          Ins_Name TEXT NOT NULL,
          Ins_Degree TEXT,
          Dept_ID INTEGER,
          FOREIGN KEY (Dept_ID) REFERENCES Departments(Dept_ID)
        )
      `);
      console.log('✅ Instructors table created successfully');

      // Create Courses table
      await this.run(`
        CREATE TABLE IF NOT EXISTS Courses (
          Crs_ID INTEGER PRIMARY KEY AUTOINCREMENT,
          Crs_Name TEXT NOT NULL,
          Crs_Duration INTEGER,
          Dept_ID INTEGER,
          FOREIGN KEY (Dept_ID) REFERENCES Departments(Dept_ID)
        )
      `);
      console.log('✅ Courses table created successfully');

      // Create Instructor_Courses table
      await this.run(`
        CREATE TABLE IF NOT EXISTS Instructor_Courses (
          Ins_ID INTEGER,
          Crs_ID INTEGER,
          PRIMARY KEY (Ins_ID, Crs_ID),
          FOREIGN KEY (Ins_ID) REFERENCES Instructors(Ins_ID),
          FOREIGN KEY (Crs_ID) REFERENCES Courses(Crs_ID)
        )
      `);
      console.log('✅ Instructor_Courses table created successfully');

      // Create Topics table
      await this.run(`
        CREATE TABLE IF NOT EXISTS Topics (
          Topic_ID INTEGER PRIMARY KEY AUTOINCREMENT,
          Topic_Name TEXT NOT NULL,
          Crs_ID INTEGER,
          FOREIGN KEY (Crs_ID) REFERENCES Courses(Crs_ID)
        )
      `);
      console.log('✅ Topics table created successfully');

      // Create Exams table
      await this.run(`
        CREATE TABLE IF NOT EXISTS Exams (
          Exam_ID INTEGER PRIMARY KEY AUTOINCREMENT,
          Exam_Date TEXT,
          Exam_Duration INTEGER,
          Crs_ID INTEGER,
          FOREIGN KEY (Crs_ID) REFERENCES Courses(Crs_ID)
        )
      `);
      console.log('✅ Exams table created successfully');

      // Create Questions table
      await this.run(`
        CREATE TABLE IF NOT EXISTS Questions (
          Q_ID INTEGER PRIMARY KEY AUTOINCREMENT,
          Q_Text TEXT NOT NULL,
          Q_Type TEXT,
          Model_Answer TEXT
        )
      `);
      console.log('✅ Questions table created successfully');

      // Create Exam_Questions table
      await this.run(`
        CREATE TABLE IF NOT EXISTS Exam_Questions (
          Exam_ID INTEGER,
          Q_ID INTEGER,
          PRIMARY KEY (Exam_ID, Q_ID),
          FOREIGN KEY (Exam_ID) REFERENCES Exams(Exam_ID),
          FOREIGN KEY (Q_ID) REFERENCES Questions(Q_ID)
        )
      `);
      console.log('✅ Exam_Questions table created successfully');

      // Create Choices table
      await this.run(`
        CREATE TABLE IF NOT EXISTS Choices (
          Choice_ID INTEGER PRIMARY KEY AUTOINCREMENT,
          Choice_Text TEXT NOT NULL,
          Q_ID INTEGER,
          FOREIGN KEY (Q_ID) REFERENCES Questions(Q_ID)
        )
      `);
      console.log('✅ Choices table created successfully');

      // Create Students table
      await this.run(`
        CREATE TABLE IF NOT EXISTS Students (
          St_ID INTEGER PRIMARY KEY AUTOINCREMENT,
          St_Fname TEXT NOT NULL,
          St_Lname TEXT NOT NULL,
          St_BirthDate TEXT,
          St_Address TEXT
        )
      `);
      console.log('✅ Students table created successfully');

      // Create Student_Exams table
      await this.run(`
        CREATE TABLE IF NOT EXISTS Student_Exams (
          St_ID INTEGER,
          Exam_ID INTEGER,
          Exam_Grade REAL,
          PRIMARY KEY (St_ID, Exam_ID),
          FOREIGN KEY (St_ID) REFERENCES Students(St_ID),
          FOREIGN KEY (Exam_ID) REFERENCES Exams(Exam_ID)
        )
      `);
      console.log('✅ Student_Exams table created successfully');

      // Create Student_Answers table
      await this.run(`
        CREATE TABLE IF NOT EXISTS Student_Answers (
          St_ID INTEGER,
          Exam_ID INTEGER,
          Q_ID INTEGER,
          Student_Answer TEXT,
          PRIMARY KEY (St_ID, Exam_ID, Q_ID),
          FOREIGN KEY (St_ID) REFERENCES Students(St_ID),
          FOREIGN KEY (Exam_ID) REFERENCES Exams(Exam_ID),
          FOREIGN KEY (Q_ID) REFERENCES Questions(Q_ID)
        )
      `);
      console.log('✅ Student_Answers table created successfully');

      console.log('🎉 All tables created successfully in SQLite!');
      
    } catch (error) {
      console.error('❌ Error creating tables:', error.message);
      throw error;
    }
  }

  // Helper functions for common queries
  async getStudentsWithExams() {
    return await this.query(`
      SELECT s.*, se.Exam_Grade, e.Exam_Date, c.Crs_Name
      FROM Students s
      LEFT JOIN Student_Exams se ON s.St_ID = se.St_ID
      LEFT JOIN Exams e ON se.Exam_ID = e.Exam_ID
      LEFT JOIN Courses c ON e.Crs_ID = c.Crs_ID
      ORDER BY s.St_ID, e.Exam_Date
    `);
  }

  async getExamQuestions(examId) {
    return await this.query(`
      SELECT q.*, c.Choice_Text, c.Choice_ID
      FROM Questions q
      JOIN Exam_Questions eq ON q.Q_ID = eq.Q_ID
      LEFT JOIN Choices c ON q.Q_ID = c.Q_ID
      WHERE eq.Exam_ID = ?
      ORDER BY q.Q_ID, c.Choice_ID
    `, [examId]);
  }

  async getInstructorCourses(instructorId) {
    return await this.query(`
      SELECT c.*, d.Dept_Name
      FROM Courses c
      JOIN Instructor_Courses ic ON c.Crs_ID = ic.Crs_ID
      JOIN Departments d ON c.Dept_ID = d.Dept_ID
      WHERE ic.Ins_ID = ?
    `, [instructorId]);
  }
}

module.exports = Database;
