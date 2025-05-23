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
    const body = Buffer.concat(chunks).toString();
    
    const action = await fetch(url, {
      method: req.method,
      headers: req.headers,
      body: chunks.length > 0 ? body : undefined
    });
    const data = await action.text();
    res.status(200).end(data.toString());
  });
}