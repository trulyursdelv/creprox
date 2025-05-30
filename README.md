## creprox :telescope:

[![Try it online](https://badgers.space/badge/Try%20on/example.com?icon=feather-radio&color=teal&scale=1.2&corner_radius=3)](https://creprox.vercel.app/example.com)

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

### Features

**creprox** supports the following:

1. **Request methods** &mdash; The request method depends on what method you use on creprox.
2. **Request body** &mdash; If a body is provided, it is passed on to the request URL.
3. **Request headers** &mdash; The request headers depends on the headers you've sent to creprox.

However, the following are the disadvantages:

1. **Response status** &mdash; creprox will always return `200`, to prevent browser-defined error page.
2. **Response body** &mdash; creprox only supports text-based responses. Responses like images are not recommended.

## Disclaimer :rotating_light:

Please use **creprox** with responsibility and accountability. I do not encourage using **creprox** to web servers that legally prohibits crawlers.
