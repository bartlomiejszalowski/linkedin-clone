import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  acceptConnectionRequest,
  getConnectionRequests,
  getConnectionStatus,
  getUserConnections,
  recjecttConnectionRequest,
  removeConnection,
  sendConnectionRequest,
} from "../controllers/connection.controller.js";

const router = express.Router();

router.post("/request/:userId", protectRoute, sendConnectionRequest);
router.put("/accept/:requestId", protectRoute, acceptConnectionRequest);
router.put("/recject/:requestId", protectRoute, recjecttConnectionRequest);

//Get all connections requests for a user
router.get("/requests", protectRoute, getConnectionRequests);

//Get all connections for a user
router.get("/", protectRoute, getUserConnections);

router.delete("/:userId", protectRoute, removeConnection);

router.get("/status/:userId", protectRoute, getConnectionStatus);

export default router;
