module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  
  const url = `https:/${req.url}`;
  const chunks = [];
  req.on("data", chunk => chunks.push(chunk));
  req.on("end", async () => {
    const body = Buffer.concat(chunks);
    
    const headers = { ...req.headers };
    delete headers["host"];
    delete headers["content-length"];

    const action = await fetch(url, {
      method: req.method,
      headers,
      body: chunks.length > 0 ? body : undefined
    });
    
    action.headers.forEach((value, key) => {
      if(key.startsWith("x-")) res.setHeader(key, value);
    });
    
    res.setHeader("Content-Type", "text/plain");
    const data = await action.text();
    res.status(action.status).end(data);
  });
};