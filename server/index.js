import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import * as Controller from './controllers/Controller.js'

dotenv.config()
mongoose.connect(process.env.DB_CONN)
.catch(error => console.log(`Database connection error\n${error}`))

const app = express()
app.use(express.json())
app.use(cors())


app.get('/top3', Controller.getTop3)
app.get('/profiles', Controller.getProfiles)
app.get('/profiles/filter', Controller.getProfilesFiltered)
app.get('/profiles/hIndex', Controller.getProfilesHIndex)
app.get('/faculties', Controller.getFaculties)
app.get('/departments', Controller.getDepartments)
app.get('/titles', Controller.getTitles)

app.get('/faculties/pies', Controller.getFacultiesPies)
app.get('/departments/pies', Controller.getDepartmentsPies)
app.get('/titles/pies', Controller.getTitlesPies)

app.get('/faculties/lines', Controller.getFacultiesLines)
app.get('/departments/lines', Controller.getDepartmentsLines)
app.get('/titles/lines', Controller.getTitlesLines)

app.listen(process.env.PORT || 4444, (err) => {
    if (err) return console.log(err)
    console.log('Server started!')
})