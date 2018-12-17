module.exports = {
  isTest() {
    return process.env.NODE_ENV === 'test';
  }
}