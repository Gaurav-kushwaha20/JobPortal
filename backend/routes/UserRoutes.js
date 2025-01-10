const { UserSighUp, UserLogin, verifyUser, resendVerification, verifyTokenForPasswordChange, changePassword, sendTokenToResetPassword, deleteToken,
    getProfile,
    profileInfo
} = require('../controller/UserController')

const router = require('express').Router()

router.post('/register', UserSighUp)
router.post('/login', UserLogin)
router.get('/verify-email/:verificationToken', verifyUser)
router.get('/resend-verification/:email', resendVerification)
router.get("/verify-password-reset-token/:token", verifyTokenForPasswordChange)
router.post("/change-password/:token", changePassword)
router.post("/find-your-account", sendTokenToResetPassword)
router.post("/get-profile", getProfile)

// profile information
router.get('/profile-info', profileInfo)

// delete the token from the database
router.post("/delete-token", deleteToken)

module.exports = router