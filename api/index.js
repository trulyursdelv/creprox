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

/*async function startTransaction(method, url, headers, when) {
  const body = !["GET", "OPTIONS"].includes(method) ? 
}*/

module.exports = async (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  
  const url = `https:/${req.url}`;
  // const data = await startTransaction(req.method, url, req.headers, req.on);
  const chunks = [];
  req.on("data", chunk => chunks.push(chunk));
  req.on("end", () => {
    const body = Buffer.concat(chunks).toString();
    res.status(200).end("OK: " + body);
  });
  req.on("error", () => {
    res.status(200).end("oops!");
  })
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