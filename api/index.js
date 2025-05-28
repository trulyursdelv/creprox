module.exports = async (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  
  const url = `https:/${req.url}`;
  const chunks = [];
  req.on("data", chunk => chunks.push(chunk));
  req.on("end", async () => {
    const body = Buffer.concat(chunks).toString();
    
    const action = await fetch(url, {
      method: req.method,
      headers: req.headers,
      body: chunks.length > 0 ? body : undefined
    });
    
    for(const key in action.headers) {
      const header = action.headers[key];
      res.setHeader(key, header);
    }
    
    const data = await action.blob();
    res.status(action.status).end(data);
  });
}
