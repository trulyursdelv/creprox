async function startTransaction(method, url, headers, body) {
  return new Promise(async resolve => {
    const req = await fetch(url, {
      method, headers, body
    });
    const res = await req.text();
    resolve({
      status: req.status,
      headers: req.headers,
      body: res.toString()
    });
  });
}

module.exports = async (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  
  res.status(200).end("OK");
  //const chunks = [];
  /*req.on("data", chunk => chunks.push(chunk));
  req.on("end", async () => {
    const buffer = chunks.length > 0 ? Buffer.concat(chunks) : undefined;
    
    const data = await startTransaction(req.method, url, req.headers, buffer);
    data.headers.forEach((v, k) => {
      res.setHeader(k, v);
    });
    
  });*/
}