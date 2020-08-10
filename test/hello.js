const assert = require('assert');
const sayHello = () => 'hello'

describe('Hello', function () {
  describe('#sayHello()', function () {
    it('should return hello  when no args given', function () {
      assert.equal('hello', sayHello());
    });
  });
});
