const axios = require("axios");

export default async function (req, res) {
  const {
    query: { url },
  } = req;

  if (!url) {
    res.statusCode = 400;
    res.json({ error: "Missing video URL parameter" });
    return;
  }

  try {
    const response = await axios.get(url, { responseType: "stream" });

    res.setHeader("Content-Type", response.headers["content-type"]);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${url.split("/").pop()}`
    );

    response.data.pipe(res);
  } catch (error) {
    console.error("Error downloading video:", error.message);
    res.statusCode = 500;
    res.json({ error: "Error downloading video" });
  }
}
