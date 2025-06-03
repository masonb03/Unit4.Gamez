import express from "express";
const router = express.Router();
export default router;

import { getPlatforms, getPlatform, createPlatform, updatePlatform, deletePlatform} from "../db/queries/platforms.js";

// GET all platforms
router.route("/").get(async (req, res) => {
  const platforms = await getPlatforms();
  res.send(platforms);
});

// GET platform by ID
router.route("/:id").get(async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).send({ error: "Invalid ID" });
  }

  const platform = await getPlatform(id);
  if (!platform) return res.status(404).send({ error: "Platform not found" });
  res.send(platform);
});

// POST create new platform
router.route("/").post(async (req, res) => {
  const { name, manufacturer } = req.body;
  if (!name || !manufacturer) {
    return res.status(400).send({ error: "Missing required fields" });
  }

  const newPlatform = await createPlatform({ name, manufacturer });
  res.status(201).send(newPlatform);
});

// PUT update platform
router.route("/:id").put(async (req, res) => {
  const id = Number(req.params.id);
  const { name, manufacturer } = req.body;

  if (!name || !manufacturer || !Number.isInteger(id) || id <= 0) {
    return res.status(400).send({ error: "Invalid input" });
  }

  const existing = await getPlatform(id);
  if (!existing) return res.status(404).send({ error: "Platform not found" });

  const updated = await updatePlatform({ id, name, manufacturer });
  res.send(updated);
});

// DELETE platform
router.route("/:id").delete(async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).send({ error: "Invalid ID" });
  }

  const deleted = await deletePlatform(id);
  if (!deleted) return res.status(404).send({ error: "Platform not found" });

  res.sendStatus(204);
});
