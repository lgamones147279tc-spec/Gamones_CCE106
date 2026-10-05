const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const user = {
  id: 1,
  email: 'student@example.com',
  password: 'student123',
  name: 'Lhindex Khim Gamones',
  role: 'Student',
};

const students = [
  {
    id: 1,
    name: 'Lhindex Khim Gamones',
    email: 'student@example.com',
    course: 'Bachelor of Science in Information Technology',
  },
  {
    id: 2,
    name: 'Jade Olacao',
    email: 'jade@example.com',
    course: 'Bachelor of Science in Information Technology',
  },
  {
    id: 3,
    name: 'Mike Airon Iroy',
    email: 'mike@example.com',
    course: 'Bachelor of Science in Information Technology',
  },
  {
    id: 4,
    name: 'John Denver Descartin',
    email: 'john@example.com',
    course: 'Bachelor of Science in Information Technology',
  },
  {
    id: 5,
    name: 'Edieson Malintad',
    email: 'edieson@example.com',
    course: 'Bachelor of Science in Information Technology',
  },
  {
    id: 6,
    name: 'Dwayne Lee Gonzales',
    email: 'dwayne@example.com',
    course: 'Bachelor of Science in Information Technology',
  },
];

const MOCK_TOKEN = 'mock-student-token-12345';

function authenticateToken(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({
      message: 'Authorization token is required.',
    });
  }

  const parts = authorization.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({
      message: 'Invalid authorization format.',
    });
  }

  if (parts[1] !== MOCK_TOKEN) {
    return res.status(401).json({
      message: 'Invalid or expired token.',
    });
  }

  next();
}

app.get('/', (req, res) => {
  res.json({
    message: 'Student Service Portal Mock API is running.',
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required.',
    });
  }

  if (
    email.toLowerCase() !== user.email.toLowerCase() ||
    password !== user.password
  ) {
    return res.status(401).json({
      message: 'Invalid email or password.',
    });
  }

  res.json({
    access_token: MOCK_TOKEN,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

app.get('/students', authenticateToken, (req, res) => {
  res.json(students);
});

app.get('/students/:id', authenticateToken, (req, res) => {
  const id = Number(req.params.id);

  const student = students.find((item) => item.id === id);

  if (!student) {
    return res.status(404).json({
      message: 'Student record not found.',
    });
  }

  res.json(student);
});

app.get('/profile', authenticateToken, (req, res) => {
  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
});

app.listen(PORT, () => {
  console.log('');
  console.log('======================================');
  console.log(' Student Service Portal Mock API');
  console.log('======================================');
  console.log(`API: http://localhost:${PORT}`);
  console.log('');
  console.log('LOGIN CREDENTIALS');
  console.log('Email:    student@example.com');
  console.log('Password: student123');
  console.log('');
  console.log('API is ready!');
  console.log('======================================');
});