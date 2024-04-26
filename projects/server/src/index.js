import express from 'express';
import cors from 'cors';
import connectDB from './db/index.js';
import {createRagistation,uploadImage,getAllUser,deleteUser} from './controller/index.js';
import {upload} from './middleware/index.js';

const app = express();


connectDB()
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use(cors());
app.use(express.json());
app.post('/submit-registation', createRagistation)
app.post('/upload-image',upload.single('file'), uploadImage)
app.get('/get-all-user',getAllUser)
app.delete('/delete-user/:id',deleteUser)




app.listen(4000, () => {
    console.log('Server is running on port 4000');
});