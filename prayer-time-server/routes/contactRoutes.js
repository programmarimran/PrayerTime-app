const express=require("express")
const router=express.Router()

const {addContactMessage,getAllMessages,updateContactMessageRead}=require("../controllers/contactMessagecontroller.js.js")
router.post("/",addContactMessage)
router.get("/",getAllMessages)
router.patch("/:id",updateContactMessageRead)
module.exports=router