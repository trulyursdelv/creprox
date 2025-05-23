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
    const body = chunks.length > 0 ? Buffer.concat(chunks).toString() : undefined;
    
    const action = await fetch(url, {
      method: req.method,
      headers: req.headers,
      body
    });
    action.headers.forEach((v, k) => {
      if(k == "content-type") return;
      res.setHeader(k, v);
    });
    const data = await action.text();
    res.status(200).end(data.toString());
  });
}