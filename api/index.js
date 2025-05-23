function parseHeaders(headers) {
  console.info(typeof headers);
  const options = {};
  headers.forEach((v, k) => options[k] = v);
  return options;
}

async function startTransaction(method, url, headers, body) {
  return new Promise(async resolve => {
    const req = await fetch(url, {
      method, headers, body
    });
    const chunks = [];
    req.body.on("data", chunk => chunks.push(chunk));
    req.body.on("end", () => {
      const buffer = Buffer.concat(chunks);
      resolve({
        status: req.statusCode,
        headers: parseHeaders(req.headers),
        body: buffer
      });
    });
  });
}

module.exports = async (req, res) => {
  const url = `https://${req.url.slice(1)}`;
  
  const chunks = [];
  req.on("data", chunk => chunks.push(chunk));
  req.on("end", async () => {
    const buffer = Buffer.concat(chunks);
    
    const data = await startTransaction(req.method, url, parseHeaders(req.headers), buffer);
    for(const header in data.headers) {
      res.setHeader(header, data.headers[header]);
    }
    res.status(data.status).end(data.body);
  });
}