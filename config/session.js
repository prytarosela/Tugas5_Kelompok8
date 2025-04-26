module.exports = {
    driver: 'cookie',
    cookieName: 'adonis-session',
    clearWithBrowser: true,
    age: '2h',
    cookie: {
      httpOnly: true,
      sameSite: false,
      path: '/'
    }
  }