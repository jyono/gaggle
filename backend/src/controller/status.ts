import express from "express";

// This is a function that returns another async function that handles our business logic
// This allows us to inject the req/res from out routes
export const getStatus = () => (req : express.Request, res: express.Response) => {
    // Set the response status to 200
    res.status(200);
    // Send a response object
    res.send({ Status: "Okay" });
}