const { UserSighUp, UserLogin, verifyUser, resendVerification, verifyTokenForPasswordChange, changePassword, sendTokenToResetPassword, deleteToken,
    getProfile,
    profileInfo,
    getUserRole,
    uploadProfilePicture
} = require('../controller/UserController')
const profileUpload = require('../middleware/profileUpload')

const router = require('express').Router()

router.post('/register', UserSighUp)
router.post('/login', UserLogin)
router.get('/verify-email/:verificationToken', verifyUser)
router.get('/resend-verification/:email', resendVerification)
router.get("/verify-password-reset-token/:token", verifyTokenForPasswordChange)
router.post("/change-password/:token", changePassword)
router.post("/find-your-account", sendTokenToResetPassword)
router.get("/get-profile", getProfile)


// delete the token from the database
router.post("/delete-token", deleteToken)

// upload the profile picture
router.post('/change-profile-picture', profileUpload.single('file') ,uploadProfilePicture)

// get user role
// router.get('/get-user-role', getUserRole)

module.exports = router

//  company name, address, phone, email, registration number, location, 