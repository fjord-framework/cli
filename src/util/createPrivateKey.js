module.exports = function createPrivateKey() {
  //generate a private key to use for checking JWT tokens

  // 40 characters long, base36 encoded (a-z + 0-9)
  const privateKey = [...Array(40)].map(() => (Math.floor(Math.random() * 36)).toString(36)).join('');

  // once get this private key, place it in your .env file for the server, and the .env file for the client (and keep it secure!)

  // you only have to do this once (and whenever you want to reset all of your tokens)
  return privateKey;
}