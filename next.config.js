module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/shop',
        permanent: false,
      }
    ]
  },
  // Target must be serverless
  target: "serverless",
};
