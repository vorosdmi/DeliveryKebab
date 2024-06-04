require("@babel/register");
const React = require("react");
const ReactDomServer = require("react-dom/server");

module.exports = function renderTemplate(component, props, res) {
  const element = React.createElement(component, props);
  const html = ReactDomServer.renderToStaticMarkup(element);
  res.write("<!DOCTYPE html>");
  res.end(html);
};