// This is an example endpoint of what one of our application endpoints will look like
import express from "express";

const router = express.Router();

router.get('/api/example', () =>{
    console.log('Do nothing');
})
