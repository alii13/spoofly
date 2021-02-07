function clearAllCookies(domain) {
  chrome.cookies.getAll({domain}, function (cookies) {
    for (var i in cookies) {
      removeCookie(cookies[i]);
    }
  });
}

function removeCookie(cookie) {
  var url =
    'http' + (cookie.secure ? 's' : '') + '://' + cookie.domain + cookie.path;
  chrome.cookies.remove({url: url, name: cookie.name});
}
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.url) {
    const Url = changeInfo.url;
    const mediumRegex = /^http[s]?:\/\/.*[.]?medium.com\/.*/;
    var currentURL = new URL(tab.url);
    var domain = currentURL.hostname;

    if (mediumRegex.test(Url)) {
      clearAllCookies(domain);
    }
  }
});
window.onload = function () {
  var clear_Cookies = document.getElementById('clear_cookies');

  clearAllCookies();

  if (clear_Cookies) {
    clear_Cookies.addEventListener('click', function () {
      clearAllCookies();
    });
  }
};
