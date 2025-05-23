const { Readable } = require("stream");

async function startTransaction(method, url, headers, body) {
  return new Promise(async resolve => {
    const req = await fetch(url, {
      method, headers, body
    });
    const stream = Readable.fromWeb(req.body);
    const chunks = [];
    stream.on("data", chunk => chunks.push(chunk));
    stream.on("end", () => {
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
  const url = `https:/${req.url}`;
  
  const chunks = [];
  req.on("data", chunk => chunks.push(chunk));
  req.on("end", async () => {
    const buffer = chunks.length > 0 ? Buffer.concat(chunks) : undefined;
    
    const data = await startTransaction(req.method, url, req.headers, buffer);
    for(const header in data.headers) {
      res.setHeader(header.replace(/[^a-z0-9\-]/gi, ""), data.headers[header]);
    }
    res.status(data.status).end(data.body);
  });
}