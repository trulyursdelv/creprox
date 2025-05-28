## creprox :telescope:

Fast, open-source, and on-the-go rest API for performing HTTP requests with CORS enabled.

```http
GET https://creprox.vercel.app/example.com
```

### What is CORS?

CORS stands for Cross-Origin Resource Sharing.

It is a security feature implemented by web browsers to control how web pages can request resources from a different origin.

This is the reason you often cannot make HTTP requests to other domains successfully.

### Why creprox?

**creprox** allows you to easily bypass this security feature.

There's no any setup, just replace the URL you're requesting, and you'll bypass it in no time.

## Usage :books:

Use the following endpoint and replace the `<URL>` with your URL without the protocol.

```
https://creprox.vercel.app/<URL>
```

For security reason and legacy version support, creprox only allows URL with `https` as the protocol.

## Disclaimer :rotating_light:

Please use **creprox** with responsibility and accountability. I do not encourage using **creprox** to web servers that legally prohibits crawlers.
