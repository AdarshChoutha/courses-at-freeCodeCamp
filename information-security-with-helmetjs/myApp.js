const express = require('express');
const app = express();
const helmet = require('helmet');

app.use(helmet.hidePoweredBy()); // hides X-Powered-By http header
app.use(helmet.frameguard({ action: 'deny' })); // denys adding the site in an iframe
app.use(helmet.xssFilter()); // sanitize input sent to server
app.use(helmet.noSniff()); // instructs the browser to not bypass the provided Content-Type
app.use(helmet.ieNoOpen()); // prevent IE users from executing downloads in the trusted site's context.
// HTTP Strict Transport Security (HSTS) is a web security policy which helps to protect websites against protocol downgrade attacks and cookie hijacking
app.use(helmet.hsts({ maxAge: 90 * 24 * 60 * 60, force: true })); // asks browsers to access site via HTTPS only
app.use(helmet.dnsPrefetchControl()); // disables DNS prefetching
app.use(helmet.noCache()); // disable caching on client’s browser
// Configuring a Content Security Policy, can prevent the injection of anything unintended into pages.
// This will protect application from XSS vulnerabilities, undesired tracking, malicious frames, and much more.
app.use(helmet.contentSecurityPolicy({ directives: { defaultSrc: ["'self'"], scriptSrc: ["'self'", 'trusted-cdn.com'] } }));

































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
