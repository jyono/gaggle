// This is object destructing when we import. By saying { Router } from the express module,
// we really mean 'Lets only import the Router class, not the whole express module'

import { Router } from "express";
import { getStatus } from "../controller/status";

// Declare our router object and export it
export const statusRouter : Router = Router();

// Tell our router that we want to listen for this specific endpoint and register this function to it.
statusRouter.get('/api/status', getStatus());

