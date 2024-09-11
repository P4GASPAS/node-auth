import { Router } from "express"
import Controller from "../App/Controllers/authController.js"

const router = Router()

router.post('/login', Controller.login)
router.post('/register', Controller.register)

export { router as api }