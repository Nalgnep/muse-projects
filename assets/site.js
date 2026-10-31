(function () {
  if (document.querySelector(".site-nav")) return;

  var framed = false;
  try { framed = window.self !== window.top; } catch (e) { framed = true; }
  var params = new URLSearchParams(location.search || "");
  var embed = params.get("embed") === "1" || framed;

  /* When opened inside the portal iframe, skip the shared top bar to avoid double chrome. */
  if (embed) {
    document.documentElement.classList.add("embed");
    document.documentElement.style.setProperty("--site-nav-offset", "0px");
    return;
  }

  var subs = [
    "industrial-ai-iot-dashboard",
    "industrial-ai-pitfalls",
    "industrial-ai-projects",
    "industrial-ai-roi-calculator",
    "portal"
  ];
  var path = location.pathname || "";
  var inSub = subs.some(function (s) {
    return path.indexOf("/" + s + "/") >= 0 || path.endsWith("/" + s);
  });
  var pre = inSub ? "../" : "";
  var pages = [
    { id: "portal", href: pre + "portal/", label: "门户" },
    { id: "academy", href: pre + "index.html", label: "算法课程" },
    { id: "projects", href: pre + "industrial-ai-projects/", label: "实战项目" },
    { id: "roi", href: pre + "industrial-ai-roi-calculator/", label: "ROI 测算" },
    { id: "pitfalls", href: pre + "industrial-ai-pitfalls/", label: "避坑手册" },
    { id: "iot", href: pre + "industrial-ai-iot-dashboard/", label: "IoT 看板" }
  ];
  var current = "academy";
  if (path.indexOf("/portal") >= 0) current = "portal";
  else if (path.indexOf("industrial-ai-projects") >= 0) current = "projects";
  else if (path.indexOf("industrial-ai-roi-calculator") >= 0) current = "roi";
  else if (path.indexOf("industrial-ai-pitfalls") >= 0) current = "pitfalls";
  else if (path.indexOf("industrial-ai-iot-dashboard") >= 0) current = "iot";

  var header = document.createElement("header");
  header.className = "site-nav";
  var links = pages.map(function (p) {
    var cur = p.id === current ? ' aria-current="page"' : "";
    return '<a href="' + p.href + '"' + cur + ">" + p.label + "</a>";
  }).join("");
  header.innerHTML =
    '<a class="skip" href="#content">跳到正文</a>' +
    '<div class="site-nav-inner">' +
    '<a class="brand" href="' + pre + 'index.html">制造业算法学院</a>' +
    '<nav aria-label="全站">' + links + "</nav>" +
    "</div>";
  document.body.insertBefore(header, document.body.firstChild);

  if (!document.getElementById("content")) {
    var wrap = document.querySelector(".wrap");
    if (wrap) {
      wrap.id = "content";
      wrap.setAttribute("tabindex", "-1");
    }
  }
})();
