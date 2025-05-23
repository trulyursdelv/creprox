const module = {};

async function startTransaction(method, url, headers, body) {
  return new Promise(async (req, res) => {
    const req = await fetch(url, {
      method, headers, body
    });
    const chunks = [];
    req.body.on("data", chunk => chunks.push(chunk));
    req.body.on("end", () => {
      const buffer = Buffer.concat(chunks);
      resolve({
        status: req.statusCode,
        headers: req.headers,
        body: buffer
      });
    });
  });
}

module.exports = async (req, res) => {
  const path = req.url.slice(1);
  const protocol = path.slice(0, path.indexOf("/"));
  const address = path.slice(path.indexOf("/") + 1);
  const url = `${protocol}://${address}`;
  
  const chunks = [];
  req.on("data", chunk => chunks.push(chunk));
  req.on("end", async () => {
    const buffer = Buffer.concat(chunks);
    
    const data = await startTransaction(req.method, url, req.headers, buffer);
    for(const header in data.headers) {
      res.setHeader(header, data.headers[header]);
    }
    res.status(data.status).end(data.body);
  });
}

module.exports({
  url: "/https/api.deezer.com/search?q=chihiro"
});