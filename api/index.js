const module = {};

module.exports = async (req, res) => {
  const path = req.url.slice(1);
  const protocol = path.slice(0, path.indexOf("/"));
  const address = path.slice(path.indexOf("/"));
}

module.exports({
  url: "/https/api.deezer.com/search?q=chihiro"
});