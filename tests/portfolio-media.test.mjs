import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import {
  listPortfolioMediaFiles,
  portfolioMediaKind,
} from "../lib/portfolio-media-files.mjs";

test("recognises image and video extensions without case sensitivity", () => {
  for (const name of ["photo.PNG", "photo.JPG", "photo.avif"])
    assert.equal(portfolioMediaKind(name), "image");
  for (const name of [
    "film.mov",
    "film.MOV",
    "film.MP4",
    "film.webm",
    "film.m4v",
  ])
    assert.equal(portfolioMediaKind(name), "video");
  for (const name of [".DS_Store", "._photo.PNG", "notes.txt"])
    assert.equal(portfolioMediaKind(name), null);
});
test("includes every supported regular file, preserving names and separate copies", async () => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), "epitome-media-"));
  try {
    const expected = ["1.PNG", "2 copy.PNG", "10.jpg", "clip.MOV", "clip.mp4"];
    for (const filename of [...expected, ".DS_Store", "._1.PNG", "notes.txt"])
      await fs.writeFile(path.join(directory, filename), "fixture");
    await fs.mkdir(path.join(directory, "folder.jpg"));
    assert.deepEqual(await listPortfolioMediaFiles(directory), expected);
    assert.deepEqual(
      await listPortfolioMediaFiles(path.join(directory, "missing")),
      [],
    );
  } finally {
    await fs.rm(directory, { recursive: true });
  }
});
