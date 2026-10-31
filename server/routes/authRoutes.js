
import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Student from '../models/Student.js'

const router = express.Router()

// Student Registration
router.post('/register', async (req, res) => {
  try {
    const {
      name, registrationNo, email, mobile, college,
      course, branch, semester, password
    } = req.body

    if (
      !name || !registrationNo || !email || !mobile ||
      !college || !course || !branch || !semester || !password
    ) {
      return res.status(400).json({
        message: 'Please fill all required fields'
      })
    }

    const existingStudent = await Student.findOne({
      $or: [
        { email: email.toLowerCase() },
        { registrationNo }
      ]
    })

    if (existingStudent) {
      return res.status(409).json({
        message: 'Email or Registration Number already exists'
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const student = await Student.create({
      name, registrationNo, email, mobile, college,
      course, branch, semester, password: hashedPassword
    })

    res.status(201).json({
      message: 'Student registered successfully',
      studentId: student._id
    })
  } catch (error) {
    res.status(500).json({
      message: 'Registration failed',
      error: error.message
    })
  }
})

// Student Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: 'Please enter email and password'
      })
    }

    const student = await Student.findOne({
      email: email.toLowerCase()
    })

    if (!student) {
      return res.status(401).json({
        message: 'Invalid email or password'
      })
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      student.password
    )

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid email or password'
      })
    }

    const token = jwt.sign(
      {
        id: student._id,
        role: student.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: student._id,
        name: student.name,
        email: student.email,
        role: student.role
      }
    })

  } catch (error) {
    res.status(500).json({
      message: 'Login failed',
      error: error.message
    })
  }
})

export default router

