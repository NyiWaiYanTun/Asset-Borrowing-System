//multer for photo storage
const multer = require('multer');
const path = require('path');
const fs= require('fs');
//photo upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/inc/') // Specify the directory to store uploaded files
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});
const upload = multer({ storage: storage });
//photo delete
const deletePhoto=(photoPath)=> {
    if(photoPath!="/public/img/no-photo.jpg"){
        const absolutePath = '/Users/Asus/Desktop/Asset borrowing system'+ photoPath;
    // Check if the file exists
    fs.access(absolutePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('Error accessing file:', err);
        } else {
            fs.unlink(absolutePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                } else {
                    console.log('File deleted successfully');
                }
            });
        }
    });
    }
}

module.exports = {
    upload,
    deletePhoto
  }