import { Router } from "express"
import Controller from "../App/Controllers/authController.js"

const router = Router()

router.post('/login', Controller.login)
router.post('/register', Controller.register)
router.get('/token', Controller.verifyToken)

export { router as api }