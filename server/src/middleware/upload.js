const multer = require('multer');
const { config } = require('../config');

const ALLOWED_MIMETYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
];

const ALLOWED_EXTENSIONS = ['.pdf', '.docx', '.txt'];

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const ext = '.' + file.originalname.split('.').pop().toLowerCase();
  const mimeOk = ALLOWED_MIMETYPES.includes(file.mimetype);
  const extOk = ALLOWED_EXTENSIONS.includes(ext);

  if (mimeOk && extOk) {
    cb(null, true);
  } else {
    cb(new Error(`Unsupported file type. Please upload a PDF, DOCX, or TXT file.`), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: config.MAX_FILE_SIZE_BYTES,
    files: 1,
  },
});

module.exports = { upload };
