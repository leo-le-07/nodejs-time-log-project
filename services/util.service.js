const { to } = require('await-to-js');
const parseError = require('parse-error');

module.exports = {
  async to(promise) {
    const [error, response] = await to(promise);
    if (error) return [parseError(error)];
    return [null, response];
  },
  responseError(res, error, code) {
    let errorMessage = error;
    if (typeof error === 'object' && typeof error.message !== 'undefined') {
      errorMessage = error.message;
    }

    if (typeof code !== 'undefined') res.statusCode = code;

    return res.json({ success: false, error: errorMessage });
  },
  responseSuccess(res, data, code) {
    let sendData = { success: true };

    if (typeof data === 'object') {
      sendData = Object.assign(data, sendData);
    }

    if (typeof code !== 'undefined') res.statusCode = code;

    return res.json(sendData);
  },
};
