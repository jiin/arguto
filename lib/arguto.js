var Arguto = function() {
  this.args  = {},
  this.types = {'i': 'number', 's': 'string', 'b': 'boolean'};

  process.argv.splice(2).forEach(function(a) {
    var token = a.substr(2).split('=');
    this.args[token.shift()] = token.pop();
  }, this);
}

Arguto.prototype.init = function(config) {
  var type = typeof config;

  (type === 'string') ? this._strProcess(config) :
  (type === 'object') ? this._objProcess(config) : this._error('wattafack');
}

Arguto.prototype._strProcess = function(str) {
  var self = this,
      argvs = str.split(';');

  Object(argvs).forEach(function(index) {
    var token = index.split('='), 
        name  = token[0], val = token[1],
        opt   = (val[0] === '[' && val[2] === ']');

    var type = (opt) ? self.types[val[1]] : self.types[val];

    if (self._valid(name, self.args[name]) && self.checkType(type, self.args[name]))
      self[name] = self.args[name];

    if (!opt && !self._exists(self[name]))
      throw new Error('Required parameter <' + name  + '#' + type + '> not given')
  });
}

Arguto.prototype._objProcess = function(obj) {
  var argvs = obj,
      self  = this;

  Object(argvs).forEach(function(token) {
    var obj = token;

    self[obj.name] = (self._valid(obj.name, self.args[obj.name]) && self.checkType(obj.type, self.args[obj.name])) ? self.args[obj.name]  :
                     (self._valid(obj.short, obj.short))                                                           ? self.args[obj.short] :
                     (self._exists(obj.waited) && !~obj.waited.indexOf(self[obj.name]))                            ? null                 : null;

    if (obj.required && !self[obj.name])
      throw new Error('Required parameter <' + obj.name  + '#' + obj.type + '> not given')

    if (self._exists(self[obj.name]) && typeof obj.callback === 'function')
      obj.callback.call(self, self[obj.name]);
  });
}

Arguto.prototype.checkType = function(from, val) {
  var type;

  if (typeof val !== 'string')
    throw new Error('UATTAFAC.');

  try {
    type = typeof JSON.parse(val);
  } catch(err) {
    type = this.types.s;
  }

  return type === from;
}

Arguto.prototype._has = function(name) {
  return this.args.hasOwnProperty(name);
}

Arguto.prototype._exists = function(value) {
  return typeof value !== 'undefined';
}

Arguto.prototype._valid = function(name, value) {
  return this._has(name) && this._exists(value);
}

Arguto.prototype._error = function(msg) {
  throw new Error(msg);
}

module.exports = new Arguto();