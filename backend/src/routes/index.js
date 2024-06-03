const router = require('express').Router();
const authRoutes = require('../app/auth/auth.router.js')

const gamePlanRoutes = require('../app/game_plan/game_plan.router.js')
const chatRoutes = require('../app/chat/chat.router.js')
const messagesRoutes = require("../app/messages/messages.router.js");



router.use('/auth',authRoutes);
router.use('/game_plan',gamePlanRoutes);
router.use('/chat',chatRoutes);
router.use('/messages', messagesRoutes)

module.exports = router;