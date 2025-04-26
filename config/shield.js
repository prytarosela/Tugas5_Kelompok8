module.exports = {
  csrf: {
    enable: true,
    methods: ['POST', 'PUT', 'DELETE'],
    filterUris: [/^\/api\/v1\/.*/], 
    cookieOptions: {
      httpOnly: false,
      sameSite: true,
      path: '/',
      maxAge: 7200
    }
  }
}
