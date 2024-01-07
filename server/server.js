const express = require("express");
const path = require("path");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3000;

// serve static files from the 'client' directory
app.use("/client", express.static(path.join(__dirname, "../client")));

app.get("/download", async (req, res) => {
  const videoUrl = req.query.url;

  try {
    const response = await axios.get(videoUrl, { responseType: "stream" });
    res.set("Content-Type", response.headers["content-type"]);
    res.set(
      "Content-Disposition",
      `attachment; filename=${videoUrl.split("/").pop()}`
    );
    response.data.pipe(res);
  } catch (error) {
    console.error("Error downloading video:", error.message);
    res.status(500).send("Error downloading video");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
