const vacancy = require('../models/VacencyModel')
const jwt = require('jsonwebtoken')

//  post the vacancy
exports.postVacancy = async (req, res) => {
    const {title, description, company, jobType, skillsRequired, salaryRange, location} = req.body;

    // extract the user id based on token
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1]
    const id = null;
    try {
        const decoded = jwt.verify(token, process.env.SECREAT_KEY)
        const posted = await vacancy.create({
            title,
            description,
            employerId: decoded._id,
            type: jobType,
            company: company,
            skillsRequired,
            salaryRange,
            location
        });
        if (!posted) {
            return res.status(400).json({error: 'Unable to upload your vacancy'})
        }
        return res.status(201).json({success: "vacancy posted successfully!", data: posted})


    } catch (e) {

        return res.status(400).json({error: e.message})
    }


}

// Retrieve the vacancy from the database to display on the home page
exports.getVacancy = async (req, res) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1]

    // get the latest and recent vacancies
    const recentVacancies = await vacancy.find()
        .populate('employerId', 'profile_picture username')
        .sort({createdAt: -1})          // sort by most recent
        .skip((page - 1) * limit)        // skip the previous records 
        .limit(Math.ceil(limit / 2)); // Half sequential

    // get random vacancies
    const randomVacancies = await vacancy.aggregate([
        {$sample: {size: Math.floor(limit / 2)}},
        {
            $lookup: {
                from: 'users',
                localField: 'employerId',
                foreignField: '_id',
                as: 'employerId',
            }
        },
        {
            $unwind: '$employerId',
        },
        {
            $project: {
                title: 1,
                description: 1,
                skillsRequired: 1,
                salaryRange: 1,
                location: 1,
                type: 1,
                company: 1,
                photo: 1,
                createdAt: 1,
                "employerId.profile_picture": 1,
                "employerId.username": 1
            }
        }
    ])
    console.log(randomVacancies)

    //     combine both random and latest vacancies
    const combinedVacancies = [...randomVacancies, ...recentVacancies]
        .sort(() => Math.random() - 0.5)

    return res.status(200).json({success: true, data: combinedVacancies})
}


// get the vacancy of the particular user
exports.getUserVacancies = async (req, res) => {
    const id = req.headers['authorization'].split(' ')[1];
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)


    try {
        const recentVacancies = await vacancy.find()
            .populate('employerId', 'profile_picture username')
            .sort({createdAt: -1})
            .skip((page - 1) * limit)
            .limit(Math.ceil(limit / 2)); // Half sequential


        return res.status(200).json({success: true, data: recentVacancies})
    } catch (e) {
        return res.status(500).json({error: "Internal server error"})
    }
}

// delete the vacancies
exports.deleteVacancy = async (req, res) => {
    console.log(req.query.id)
    
    const deletedUser = await vacancy.deleteOne({_id: req.query.id})
    if (!deletedUser) {
        return res.status(404).json({error: 'User does not exist', success: false})
    }
    return res.status(200).json({success: true, data: deletedUser})
}


// company name
// address 
// registration no || pan
// location
// 

// notification model
// user