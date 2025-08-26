const express = require('express')

const router = express.Router()

const USER = {
  id: "user-123",
  name: "Test User",
  email: "test@example.com",
  password: "password123",
}

router.post("/login", (req, res) => {
  const { email, password } = req.body
  console.log("🚀 ~ password:", password)
  console.log("🚀 ~ email:", email)

  if (!email || !password) {
    return res.status(400).json({ success: false, error: "Email and password are required" })
  }

  if (email === USER.email && password === USER.password) {
    console.log("🚀 ~ USER:", USER)
    return res.json({
      success: true,
      user: {
        id: USER.id,
        name: USER.name,
        email: USER.email,
      },
    })
  } else {
    return res.status(401).json({ success: false, error: "Invalid credentials" })
  }
})

module.exports = router
