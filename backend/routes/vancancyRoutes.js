const {postVacancy, getVacancy, getUserVacancies, deleteVacancy} = require("../controller/VacencyController");
const {isEmployer} = require("../controller/UserController");
const router = require('express').Router()
const vacancyUpload = require("../middleware/vacancyUpload")

// post the vacancy here
router.post('/post-vacancy', isEmployer, vacancyUpload.single('photo') ,postVacancy)

// get the vacancy 
router.get('/get-vacancy', getVacancy)

// get specific user vacancy to display it on profile page
router.get('/user-vacancies', getUserVacancies)

// delete the vancacy
router.delete('/delete-vacancy', deleteVacancy)












module.exports = router