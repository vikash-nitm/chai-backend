import multer from "multer";
//req hai jo user se request aati hai
//file aati hai esliye multer use hota hai
//cb jo hi callback hai
//sari file public folder mai hai tki acess mil jye mujhe
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
     
      cb(null, file.originalname)
    }
  })
  
  export const upload = multer({ storage: storage })
  
