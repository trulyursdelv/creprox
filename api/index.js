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
  const url = `https:/${req.url}`;
  
  const chunks = [];
  req.on("data", chunk => chunks.push(chunk));
  req.on("end", async () => {
    const buffer = chunks.length > 0 ? Buffer.concat(chunks) : undefined;
    
    const data = await startTransaction(req.method, url, req.headers, buffer);
    data.headers.forEach((v, k) => {
      if(k == "content-type") return;
      res.setHeader(k, v);
    });
    console.info("Status:", data.status, typeof data.status);
    console.info("Body:", data.body, typeof data.body);
    res.statusCode = data.status;
    res.end(data.body);
  });
}