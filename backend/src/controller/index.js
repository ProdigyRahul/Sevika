import { RequestHandler } from "express"
import UserModel from '../models/users.ts'
import nodemailer from 'nodemailer'

const createNewUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name) return res.status(422).json({ message: "name is missing" });
    if (!email) return res.status(422).json({ message: "email is missing" });
    if (!password) return res.status(422).json({ message: "password is missing" });
}
