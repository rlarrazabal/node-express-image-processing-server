const {Router} = require('express');
const router = Router();
const multer = require('multer');
const storage = multer.diskStorage(
    {destination: 'api/uploads/', filename});
const upload = multer({fileFilter, storage});
const path = require('path');
const photoPath = path.resolve(__dirname,'../../client/photo-viewer.html');
function filename(req, file, callback) {
    callback(null, file.originalname)
}
function fileFilter(req, file, callback) {
    if(file.mimetype ==='image/png') {
        callback(null, true);
    } else {
        req.fileValidationError = 'Wrong file type';
    callback(null, false, new Error('Wrong file type'));
  }
}
router.post('/upload', upload.single('photo'), (req, res) => {
    if(!req.fileValidationError) {
        res.status(201).json({success: true})
    } else {
        res.status(400).json({error: req.fileValidationError});
    } 
});
router.get('/photo-viewer', (req, res) => { 
    res.sendFile(photoPath);
})
module.exports = router;