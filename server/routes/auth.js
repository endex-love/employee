import express from 'express'
import {login} from '../controler/authcontroller.js'


const router = express.Router()

router.post('/login',login)

export default router;