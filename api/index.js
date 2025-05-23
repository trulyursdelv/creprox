const { Readable } = require("stream");

async function startTransaction(method, url, headers, body) {
  return new Promise(async resolve => {
    const req = await fetch(url, {
      method, headers, body
    });
    resolve({
      status: req.status,
      headers: req.headers,
      body: await req.body.blob()
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
    data.headers.forEach((v, k) => {
      res.setHeader(k, v);
    });
    res.status(data.status).end(data.body);
  });
}