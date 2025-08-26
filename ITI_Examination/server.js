const express = require('express');
const cors = require('cors');
const Database = require('./database');
const config = require('./config');

const app = express();
const db = new Database();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/ui', express.static('public-lite'));

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to ITI Examination System - SQLite',
    status: 'running',
    database: 'SQLite Local Database',
    endpoints: {
      branches: '/api/branches',
      departments: '/api/departments',
      instructors: '/api/instructors',
      courses: '/api/courses',
      topics: '/api/topics',
      exams: '/api/exams',
      questions: '/api/questions',
      students: '/api/students',
      choices: '/api/choices'
    }
  });
});

// ==================== Branches ====================
app.get('/api/branches', async (req, res) => {
  try {
    const branches = await db.query('SELECT * FROM Branches ORDER BY Branch_ID');
    res.json({ success: true, data: branches });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/branches', async (req, res) => {
  try {
    const { Branch_Name, Branch_Location } = req.body;
    
    if (!Branch_Name) {
      return res.status(400).json({ 
        success: false, 
        error: 'Branch name is required' 
      });
    }
    
    const result = await db.run(
      'INSERT INTO Branches (Branch_Name, Branch_Location) VALUES (?, ?)',
      [Branch_Name, Branch_Location]
    );
    
    const newBranch = await db.query('SELECT * FROM Branches WHERE Branch_ID = ?', [result.lastID]);
    
    res.status(201).json({ 
      success: true, 
      message: 'Branch created successfully',
      data: newBranch[0]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== Departments ====================
app.get('/api/departments', async (req, res) => {
  try {
    const departments = await db.query(`
      SELECT d.*, b.Branch_Name 
      FROM Departments d 
      JOIN Branches b ON d.Branch_ID = b.Branch_ID 
      ORDER BY d.Dept_ID
    `);
    res.json({ success: true, data: departments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/departments', async (req, res) => {
  try {
    const { Dept_Name, Branch_ID } = req.body;
    
    if (!Dept_Name || !Branch_ID) {
      return res.status(400).json({ 
        success: false, 
        error: 'Department name and Branch ID are required' 
      });
    }
    
    const result = await db.run(
      'INSERT INTO Departments (Dept_Name, Branch_ID) VALUES (?, ?)',
      [Dept_Name, Branch_ID]
    );
    
    const newDept = await db.query('SELECT * FROM Departments WHERE Dept_ID = ?', [result.lastID]);
    
    res.status(201).json({ 
      success: true, 
      message: 'Department created successfully',
      data: newDept[0]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== Instructors ====================
app.get('/api/instructors', async (req, res) => {
  try {
    const instructors = await db.query(`
      SELECT i.*, d.Dept_Name, b.Branch_Name
      FROM Instructors i 
      JOIN Departments d ON i.Dept_ID = d.Dept_ID
      JOIN Branches b ON d.Branch_ID = b.Branch_ID
      ORDER BY i.Ins_ID
    `);
    res.json({ success: true, data: instructors });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/instructors', async (req, res) => {
  try {
    const { Ins_Name, Ins_Degree, Dept_ID } = req.body;
    
    if (!Ins_Name || !Dept_ID) {
      return res.status(400).json({ 
        success: false, 
        error: 'Instructor name and Department ID are required' 
      });
    }
    
    const result = await db.run(
      'INSERT INTO Instructors (Ins_Name, Ins_Degree, Dept_ID) VALUES (?, ?, ?)',
      [Ins_Name, Ins_Degree, Dept_ID]
    );
    
    const newInstructor = await db.query('SELECT * FROM Instructors WHERE Ins_ID = ?', [result.lastID]);
    
    res.status(201).json({ 
      success: true, 
      message: 'Instructor created successfully',
      data: newInstructor[0]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== Courses ====================
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await db.query(`
      SELECT c.*, d.Dept_Name, b.Branch_Name
      FROM Courses c 
      JOIN Departments d ON c.Dept_ID = d.Dept_ID
      JOIN Branches b ON d.Branch_ID = b.Branch_ID
      ORDER BY c.Crs_ID
    `);
    res.json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/courses', async (req, res) => {
  try {
    const { Crs_Name, Crs_Duration, Dept_ID } = req.body;
    
    if (!Crs_Name || !Dept_ID) {
      return res.status(400).json({ 
        success: false, 
        error: 'Course name and Department ID are required' 
      });
    }
    
    const result = await db.run(
      'INSERT INTO Courses (Crs_Name, Crs_Duration, Dept_ID) VALUES (?, ?, ?)',
      [Crs_Name, Crs_Duration, Dept_ID]
    );
    
    const newCourse = await db.query('SELECT * FROM Courses WHERE Crs_ID = ?', [result.lastID]);
    
    res.status(201).json({ 
      success: true, 
      message: 'Course created successfully',
      data: newCourse[0]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== Students ====================
app.get('/api/students', async (req, res) => {
  try {
    const students = await db.getStudentsWithExams();
    res.json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/students', async (req, res) => {
  try {
    const { St_Fname, St_Lname, St_BirthDate, St_Address } = req.body;
    
    if (!St_Fname || !St_Lname) {
      return res.status(400).json({ 
        success: false, 
        error: 'First name and last name are required' 
      });
    }
    
    const result = await db.run(
      'INSERT INTO Students (St_Fname, St_Lname, St_BirthDate, St_Address) VALUES (?, ?, ?, ?)',
      [St_Fname, St_Lname, St_BirthDate, St_Address]
    );
    
    const newStudent = await db.query('SELECT * FROM Students WHERE St_ID = ?', [result.lastID]);
    
    res.status(201).json({ 
      success: true, 
      message: 'Student created successfully',
      data: newStudent[0]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== Questions ====================
app.get('/api/questions', async (req, res) => {
  try {
    const questions = await db.query(`
      SELECT q.*, GROUP_CONCAT(c.Choice_Text, '|') as choices
      FROM Questions q 
      LEFT JOIN Choices c ON q.Q_ID = c.Q_ID
      GROUP BY q.Q_ID, q.Q_Text, q.Q_Type, q.Model_Answer
      ORDER BY q.Q_ID
    `);
    res.json({ success: true, data: questions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/questions', async (req, res) => {
  try {
    const { Q_Text, Q_Type, Model_Answer, choices } = req.body;
    
    if (!Q_Text) {
      return res.status(400).json({ 
        success: false, 
        error: 'Question text is required' 
      });
    }
    
    const result = await db.run(
      'INSERT INTO Questions (Q_Text, Q_Type, Model_Answer) VALUES (?, ?, ?)',
      [Q_Text, Q_Type, Model_Answer]
    );
    
    // Add choices if they exist
    if (choices && Array.isArray(choices)) {
      for (const choice of choices) {
        await db.run(
          'INSERT INTO Choices (Choice_Text, Q_ID) VALUES (?, ?)',
          [choice, result.lastID]
        );
      }
    }
    
    const newQuestion = await db.query('SELECT * FROM Questions WHERE Q_ID = ?', [result.lastID]);
    
    res.status(201).json({ 
      success: true, 
      message: 'Question created successfully',
      data: newQuestion[0]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Initialize database and start server
async function startServer() {
  try {
    await db.connect();
    await db.createTables();
    
    app.listen(config.server.port, () => {
      console.log(`🚀 Server running on port ${config.server.port}`);
      console.log(`🌐 Application URL: http://localhost:${config.server.port}`);
      console.log(`💾 Database: SQLite`);
      console.log('✅ Tables created successfully!');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...');
  await db.disconnect();
  process.exit(0);
});

startServer();
