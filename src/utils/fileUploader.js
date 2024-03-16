const multer = require('multer');
const path = require('path');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
     
        const allowedImageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        const allowedVideoExtensions = ['.mp4', '.avi', '.mov', '.wmv','.webm'];

        const extname = path.extname(file.originalname).toLowerCase();
        let destinationFolder;

        if (allowedImageExtensions.includes(extname)) {
            destinationFolder = path.join(__dirname, '../public/uploads/images');
        } else if (allowedVideoExtensions.includes(extname)) {
            destinationFolder = path.join(__dirname, '../public/uploads/videos');
        } else {
            return cb({ message: "Invalid file type" });
        }

        if (!fs.existsSync(destinationFolder)) {
            try {
                fs.mkdirSync(destinationFolder, { recursive: true });
                console.log(`Folder created successfully: ${destinationFolder}`);
            } catch (err) {
                console.error(`Error creating folder: ${destinationFolder}`, err);
                return cb({ message: "Failed to create folder" });
            }
        }

        cb(null, destinationFolder);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


const handleFileUpload = (fileFieldName) => {
    return upload.single(fileFieldName);
};

module.exports = { handleFileUpload };
