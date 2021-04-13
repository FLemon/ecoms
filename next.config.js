module.exports = {
  async redirects() {
    return [
      {
        source: '/shop',
        destination: '/',
        permanent: false,
      }
    ]
  },
  // Target must be serverless
  target: "serverless",
};
