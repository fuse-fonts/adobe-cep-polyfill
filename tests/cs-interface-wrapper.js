const csModule = rewire("./CSInterface.js");

const CSInterface = csModule.__get__("CSInterface");

module.exports = CSInterface;