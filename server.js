const express = require("express");
const app = express();
const path = require("path");

const providers = {
  Marvel: {
    videos: [
      { id: 1, title: "Iron Man", filename: "ironman.mp4" },
      { id: 2, title: "Captain America", filename: "captainamerica.mp4" },
      { id: 3, title: "Avengers", filename: "avengers.mp4" },
    ],
    thumbnails: [
      { id: 1, filename: "ironman.jpg" },
      { id: 2, filename: "captainamerica.jpg" },
      { id: 3, filename: "avengers.jpg" },
    ],
  },
  DC: {
    videos: [
      { id: 1, title: "Dark Knight Rises", filename: "darkknightrises.mp4" },
      { id: 2, title: "Man of Steel", filename: "manofsteel.mp4" },
      { id: 3, title: "Justice League", filename: "justiceleague.mp4" },
    ],
    thumbnails: [
      { id: 1, filename: "darkknightrises.jpg" },
      { id: 2, filename: "manofsteel.jpg" },
      { id: 3, filename: "justiceleague.jpg" },
    ],
  },
  NBC: {
    videos: [
      { id: 1, title: "Key and Peele", filename: "keyandpeele.mp4" },
      { id: 2, title: "The Office", filename: "office.mp4" },
      { id: 3, title: "Brooklyn Nine-Nine", filename: "b99.mp4" },
    ],
    thumbnails: [
      { id: 1, filename: "keyandpeele.jpg" },
      { id: 2, filename: "office.jpg" },
      { id: 3, filename: "b99.jpg" },
    ],
  },
};

// Serve the homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Serve the OTT provider pages
app.get("/:provider", (req, res) => {
  const provider = providers[req.params.provider];
  if (!provider) {
    return res.status(404).send("Provider not found");
  }

  res.sendFile(path.join(__dirname, req.params.provider, "provider.html"));
});

// Serve the video files
app.get("/:provider/videos/:filename", (req, res) => {
  const provider = providers[req.params.provider];
  if (!provider) {
    return res.status(404).send("Provider not found");
  }

  const video = provider.videos.find((v) => v.filename === req.params.filename);
  if (!video) {
    return res.status(404).send("Video not found");
  }

  res.sendFile(
    path.join(__dirname, req.params.provider, "videos", req.params.filename)
  );
});

// Serve the thumbnail files
app.get("/:provider/thumb/:filename", (req, res) => {
  const provider = providers[req.params.provider];
  if (!provider) {
    return res.status(404).send("Provider not found");
  }

  const thumbnail = provider.thumbnails.find(
    (t) => t.filename === req.params.filename
  );
  if (!thumbnail) {
    return res.status(404).send("Thumbnail not found");
  }

  res.sendFile(
    path.join(__dirname, req.params.provider, "thumb", req.params.filename)
  );
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
