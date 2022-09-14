(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],2:[function(require,module,exports){
(function (Buffer){(function (){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

}).call(this)}).call(this,require("buffer").Buffer)
},{"base64-js":1,"buffer":2,"ieee754":3}],3:[function(require,module,exports){
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],4:[function(require,module,exports){
const ABAP = require('@abaplint/runtime');

function myABAP() {
    try {
        const abap = new ABAP();

        abap.console.clear();
        abap.statements.write(new abap.types.Character({ length: 5 }).set('hello'));
        try {
            abap();
        } catch (e) {
            console.log("An error was thrown: " + e.toString());
        }
        const output = abap.console.get();
        console.log(output);
        return output.toString();
    } catch (error) {
        console.log(error.message);
    }
}

function runABAP() {
    document.getElementById("console").innerHTML = myABAP();
}
},{"@abaplint/runtime":69}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ABAPRegExp = void 0;
class ABAPRegExp {
    // converts from ABAP specific regex to javascript regex
    static convert(input) {
        let ret = input;
        ret = input.replace(/\[\[:punct:\]\]/g, "[\\.\\,\\-\\{\\}\\[\\]\\:\\!\\?\\(\\)\\;\\']");
        return ret;
    }
}
exports.ABAPRegExp = ABAPRegExp;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.abs = void 0;
function abs(input) {
    let num_in = undefined;
    if (typeof input.val === "number") {
        num_in = input.val;
    }
    else if (typeof input.val === "string") {
        num_in = parseFloat(input.val);
    }
    else {
        num_in = parseFloat(input.val.get().toString());
    }
    return Math.abs(num_in);
}
exports.abs = abs;

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boolc = void 0;
const types_1 = require("../types");
function boolc(input) {
    if (input === true) {
        return new types_1.String().set("X");
    }
    else if (input === false || input === undefined) {
        return new types_1.String().set(" ");
    }
    else if (input.val instanceof types_1.Character && input.val.get().trim() === "") {
        return new types_1.String().set(" ");
    }
    else {
        return new types_1.String().set("X");
    }
}
exports.boolc = boolc;

},{"../types":136}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ceil = void 0;
function ceil(input) {
    let num_in = undefined;
    if (typeof input.val === "number") {
        num_in = input.val;
    }
    else if (typeof input.val === "string") {
        num_in = parseFloat(input.val);
    }
    else {
        num_in = parseFloat(input.val.get().toString());
    }
    return Math.ceil(num_in);
}
exports.ceil = ceil;

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concat_lines_of = void 0;
const string_1 = require("../types/string");
function concat_lines_of(input) {
    let s = input.sep;
    if (s === undefined) {
        s = "";
    }
    else if (typeof s !== "string") {
        s = s.get();
    }
    return new string_1.String().set(input.table.array().map(e => e.get()).join(s));
}
exports.concat_lines_of = concat_lines_of;

},{"../types/string":140}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.condense = void 0;
const types_1 = require("../types");
function condense(input) {
    let str = typeof input.val === "string" ? input.val : input.val.get().toString();
    let from = " ";
    if (input.from) {
        from = typeof input.from === "string" ? input.from : input.from.get().toString();
    }
    let to = " ";
    if (input.to) {
        to = typeof input.to === "string" ? input.to : input.to.get().toString();
    }
    /*
    let del = " ";
    if (input.del) {
      del = typeof input.del === "string" ? input.del : input.del.get().toString();
    }
    */
    str = str.replace(/ +$/, "");
    str = str.replace(/^ +/, "");
    for (const f of from.split("")) {
        str = str.replace(new RegExp(f.replace(".", "\\."), "g"), to);
    }
    return new types_1.String().set(str.replace(/ {2,}/g, " "));
}
exports.condense = condense;

},{"../types":136}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cos = void 0;
/* eslint-disable radix */
const types_1 = require("../types");
function cos(input) {
    let num_in = undefined;
    if (typeof input.val === "number") {
        num_in = input.val;
    }
    else if (typeof input.val === "string") {
        num_in = parseFloat(input.val);
    }
    else if (input.val instanceof types_1.Float) {
        num_in = input.val.getRaw();
    }
    else {
        num_in = parseFloat(input.val.get().toString());
    }
    return Math.cos(num_in);
}
exports.cos = cos;

},{"../types":136}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.count = void 0;
const compare_1 = require("../compare");
const types_1 = require("../types");
function count(input) {
    let found = 0;
    const val = input.val.get();
    let reg = "";
    if (input.sub) {
        reg = input.sub.get();
        reg = reg.replace(/\*/g, "\\*");
    }
    else if (input.regex) {
        reg = input.regex.get();
    }
    let options = "g";
    if (input.case && (0, compare_1.initial)(input.case)) {
        options += "i";
    }
    if (val !== "") {
        const res = val.match(new RegExp(reg, options));
        if (res) {
            found = res.length;
        }
    }
    return new types_1.Integer().set(found);
}
exports.count = count;

},{"../compare":57,"../types":136}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escape = void 0;
/* eslint-disable @typescript-eslint/ban-types */
const types_1 = require("../types");
function escape(input) {
    let val = typeof input.val === "string" ? input.val : input.val.get();
    const format = typeof input.format === "number" ? input.format : input.format.get();
    switch (format) {
        case 4: // e_html_text
            val = val.replace(/&/g, "&amp;");
            val = val.replace(/</g, "&lt;");
            val = val.replace(/>/g, "&gt;");
            break;
        case 5: // e_html_attr
            val = val.replace(/&/g, "&amp;");
            val = val.replace(/</g, "&lt;");
            val = val.replace(/>/g, "&gt;");
            val = val.replace(/"/g, "&quot;");
            val = val.replace(/'/g, "&#39;");
            break;
        case 12: // e_url
            val = encodeURI(val);
            break;
        default:
        // todo, runtime error
    }
    return new types_1.String().set(val);
}
exports.escape = escape;

},{"../types":136}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.find = void 0;
const types_1 = require("../types");
function find(input) {
    var _a, _b, _c, _d;
    const val = typeof input.val === "string" ? input.val : input.val.get();
    if (input.regex) {
        const caseInput = typeof input.case === "string" ? input.case : (_a = input.case) === null || _a === void 0 ? void 0 : _a.get();
        const regex = typeof input.regex === "string" ? input.regex : input.regex.get();
        const flags = caseInput !== "X" ? "i" : "";
        const reg = new RegExp(regex, flags);
        const ret = (_b = val.match(reg)) === null || _b === void 0 ? void 0 : _b.index;
        if (ret !== undefined) {
            return new types_1.Integer().set(ret);
        }
        else {
            return new types_1.Integer().set(-1);
        }
    }
    else {
        const sub = typeof input.sub === "string" ? input.sub : (_c = input.sub) === null || _c === void 0 ? void 0 : _c.get();
        const off = typeof input.off === "number" ? input.off : (_d = input.off) === null || _d === void 0 ? void 0 : _d.get();
        const found = val.indexOf(sub || "", off);
        return new types_1.Integer().set(found);
    }
}
exports.find = find;

},{"../types":136}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.floor = void 0;
function floor(input) {
    let num_in = undefined;
    if (typeof input.val === "number") {
        num_in = input.val;
    }
    else if (typeof input.val === "string") {
        num_in = parseFloat(input.val);
    }
    else {
        num_in = parseFloat(input.val.get().toString());
    }
    return Math.floor(num_in);
}
exports.floor = floor;

},{}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.frac = void 0;
/* eslint-disable radix */
const types_1 = require("../types");
function frac(input) {
    let num_in = undefined;
    let ret = 0;
    let pre = "0.";
    if (typeof input.val === "number") {
        num_in = input.val;
    }
    else if (typeof input.val === "string") {
        num_in = parseFloat(input.val);
    }
    else if (input.val instanceof types_1.DecFloat34
        || input.val instanceof types_1.Float) {
        num_in = input.val.getRaw();
    }
    else {
        num_in = parseFloat(input.val.get().toString());
    }
    const numSplit = num_in.toString().split(".");
    if (numSplit.length === 2) {
        if (num_in < 0) {
            pre = "-0.";
        }
        ret = parseFloat(pre + numSplit[1]);
    }
    if (input.val instanceof types_1.DecFloat34) {
        return new types_1.DecFloat34().set(ret);
    }
    else if (input.val instanceof types_1.Float) {
        return new types_1.Float().set(ret);
    }
    else {
        return ret;
    }
}
exports.frac = frac;

},{"../types":136}],17:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.space = exports.abap_undefined = exports.abap_false = exports.abap_true = void 0;
const types_1 = require("../types");
__exportStar(require("./abs"), exports);
__exportStar(require("./boolc"), exports);
__exportStar(require("./ceil"), exports);
__exportStar(require("./concat_lines_of"), exports);
__exportStar(require("./condense"), exports);
__exportStar(require("./cos"), exports);
__exportStar(require("./count"), exports);
__exportStar(require("./escape"), exports);
__exportStar(require("./find"), exports);
__exportStar(require("./floor"), exports);
__exportStar(require("./frac"), exports);
__exportStar(require("./insert"), exports);
__exportStar(require("./lines"), exports);
__exportStar(require("./match"), exports);
__exportStar(require("./matches"), exports);
__exportStar(require("./nmax"), exports);
__exportStar(require("./nmin"), exports);
__exportStar(require("./repeat"), exports);
__exportStar(require("./replace"), exports);
__exportStar(require("./reverse"), exports);
__exportStar(require("./round"), exports);
__exportStar(require("./shift_left"), exports);
__exportStar(require("./sign"), exports);
__exportStar(require("./sin"), exports);
__exportStar(require("./sqrt"), exports);
__exportStar(require("./strlen"), exports);
__exportStar(require("./substring_after"), exports);
__exportStar(require("./substring_before"), exports);
__exportStar(require("./substring"), exports);
__exportStar(require("./sy"), exports);
__exportStar(require("./tan"), exports);
__exportStar(require("./to_lower"), exports);
__exportStar(require("./to_mixed"), exports);
__exportStar(require("./to_upper"), exports);
__exportStar(require("./translate"), exports);
__exportStar(require("./trunc"), exports);
__exportStar(require("./xstrlen"), exports);
exports.abap_true = new types_1.Character({ length: 1, qualifiedName: "ABAP_BOOL" }).set("X");
exports.abap_false = new types_1.Character({ length: 1, qualifiedName: "ABAP_BOOL" }).set("");
exports.abap_undefined = new types_1.Character({ length: 1, qualifiedName: "ABAP_BOOL" }).set("-");
exports.space = new types_1.Character({ length: 1, qualifiedName: "ABAP_BOOL" }).set(" ");

},{"../types":136,"./abs":6,"./boolc":7,"./ceil":8,"./concat_lines_of":9,"./condense":10,"./cos":11,"./count":12,"./escape":13,"./find":14,"./floor":15,"./frac":16,"./insert":18,"./lines":19,"./match":20,"./matches":21,"./nmax":22,"./nmin":23,"./repeat":24,"./replace":25,"./reverse":26,"./round":27,"./shift_left":28,"./sign":29,"./sin":30,"./sqrt":31,"./strlen":32,"./substring":33,"./substring_after":34,"./substring_before":35,"./sy":36,"./tan":37,"./to_lower":38,"./to_mixed":39,"./to_upper":40,"./translate":41,"./trunc":42,"./xstrlen":43}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insert = void 0;
const types_1 = require("../types");
function insert(input) {
    let offset = 0;
    if (input.off) {
        offset = input.off.get();
    }
    const value = input.val.getOffset({ offset: 0, length: offset }).get() +
        input.sub.get() +
        input.val.getOffset({ offset: offset }).get();
    return new types_1.String().set(value);
}
exports.insert = insert;

},{"../types":136}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lines = void 0;
const types_1 = require("../types");
function lines(input) {
    return new types_1.Integer().set(input.val.array().length);
}
exports.lines = lines;

},{"../types":136}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.match = void 0;
const string_1 = require("../types/string");
function match(input) {
    const val = typeof input.val === "string" ? input.val : input.val.get();
    let reg = "";
    if (typeof input.regex === "string") {
        reg = input.regex;
    }
    else {
        reg = input.regex.get();
    }
    const r = new RegExp(reg);
    const res = val.match(r);
    let ret = "";
    if (res && res[0]) {
        ret = res[0];
    }
    return new string_1.String().set(ret);
}
exports.match = match;

},{"../types/string":140}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matches = void 0;
const types_1 = require("../types");
function matches(input) {
    const val = typeof input.val === "string" ? input.val : input.val.get();
    let reg = "";
    if (typeof input.regex === "string") {
        reg = input.regex;
    }
    else {
        reg = input.regex.get();
    }
    const r = new RegExp("^" + reg + "$");
    const res = val.match(r);
    if (res !== null) {
        return new types_1.Character().set("X");
    }
    else {
        return new types_1.Character().set(" ");
    }
}
exports.matches = matches;

},{"../types":136}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nmax = void 0;
const integer_1 = require("../types/integer");
function nmax(input) {
    const values = [];
    values.push(get_nmax_val_input(input.val1));
    values.push(get_nmax_val_input(input.val2));
    if (input.val3) {
        values.push(get_nmax_val_input(input.val3));
    }
    if (input.val4) {
        values.push(get_nmax_val_input(input.val4));
    }
    if (input.val5) {
        values.push(get_nmax_val_input(input.val5));
    }
    if (input.val6) {
        values.push(get_nmax_val_input(input.val6));
    }
    if (input.val7) {
        values.push(get_nmax_val_input(input.val7));
    }
    if (input.val8) {
        values.push(get_nmax_val_input(input.val8));
    }
    if (input.val9) {
        values.push(get_nmax_val_input(input.val9));
    }
    values.sort((a, b) => (b - a));
    return new integer_1.Integer().set(values[0]);
}
exports.nmax = nmax;
function get_nmax_val_input(val) {
    if (typeof val === "number") {
        return val;
    }
    else {
        return val.get();
    }
}

},{"../types/integer":137}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nmin = void 0;
const integer_1 = require("../types/integer");
function nmin(input) {
    const values = [];
    values.push(get_nmin_val_input(input.val1));
    values.push(get_nmin_val_input(input.val2));
    if (input.val3) {
        values.push(get_nmin_val_input(input.val3));
    }
    if (input.val4) {
        values.push(get_nmin_val_input(input.val4));
    }
    if (input.val5) {
        values.push(get_nmin_val_input(input.val5));
    }
    if (input.val6) {
        values.push(get_nmin_val_input(input.val6));
    }
    if (input.val7) {
        values.push(get_nmin_val_input(input.val7));
    }
    if (input.val8) {
        values.push(get_nmin_val_input(input.val8));
    }
    if (input.val9) {
        values.push(get_nmin_val_input(input.val9));
    }
    values.sort((a, b) => (a - b));
    return new integer_1.Integer().set(values[0]);
}
exports.nmin = nmin;
function get_nmin_val_input(val) {
    if (typeof val === "number") {
        return val;
    }
    else {
        return val.get();
    }
}

},{"../types/integer":137}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repeat = void 0;
const string_1 = require("../types/string");
function repeat(input) {
    const val = typeof input.val === "string" ? input.val : input.val.get();
    return new string_1.String().set(val.repeat(input.occ.get()));
}
exports.repeat = repeat;

},{"../types/string":140}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replace = void 0;
const string_1 = require("../types/string");
const abap_regex_1 = require("../abap_regex");
const types_1 = require("../types");
function replace(input) {
    let val = undefined;
    if (typeof input.val === "string") {
        val = input.val;
    }
    else {
        val = input.val.get();
    }
    let wi = undefined;
    if (typeof input.with === "string") {
        wi = input.with;
    }
    else if (input.with instanceof types_1.Character) {
        wi = input.with.getTrimEnd();
    }
    else if (input.with) {
        wi = input.with.get();
    }
    let sub = undefined;
    if (typeof input.sub === "string") {
        sub = input.sub;
    }
    else if (input.sub) {
        sub = input.sub.get();
    }
    if (sub !== undefined) {
        sub = sub.replace(/\\/g, "\\\\");
        sub = sub.replace(/\[/g, "\\[");
    }
    if (typeof input.regex === "string") {
        sub = new RegExp(abap_regex_1.ABAPRegExp.convert(input.regex), "g");
    }
    else if (input.regex) {
        sub = new RegExp(abap_regex_1.ABAPRegExp.convert(input.regex.get()), "g");
    }
    if (input.off && input.len && typeof input.val === "string") {
        const offset = input.off.get();
        const length = input.len.get();
        val = val.substring(0, offset) + wi + val.substring(offset + length);
    }
    else if (input.off && input.len && !(typeof input.val === "string")) {
        const offset = input.off.get();
        const length = input.len.get();
        val = input.val.getOffset({ offset: 0, length: offset }).get() +
            wi +
            input.val.getOffset({ offset: offset + length }).get();
    }
    else if (input.occ === undefined && sub && wi) {
        val = val.replace(sub, wi);
    }
    else if (input.occ && input.occ.get() === 0 && sub && wi !== undefined) {
        if (typeof sub === "string") {
            sub = new RegExp(sub, "g");
        }
        val = val.replace(sub, wi);
    }
    return new string_1.String().set(val);
}
exports.replace = replace;

},{"../abap_regex":5,"../types":136,"../types/string":140}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reverse = void 0;
const types_1 = require("../types");
function reverse(input) {
    let val = "";
    if (typeof input.val === "string") {
        val = input.val;
    }
    else {
        val = input.val.get();
    }
    val = val.split("").reverse().join("");
    return new types_1.String().set(val);
}
exports.reverse = reverse;

},{"../types":136}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.round = void 0;
const _parse_1 = require("../operators/_parse");
const types_1 = require("../types");
function round(input) {
    let mode = input.mode;
    if (mode === undefined) {
        mode = 1;
    }
    else if (typeof mode !== "number") {
        mode = mode === null || mode === void 0 ? void 0 : mode.get();
    }
    const val = (0, _parse_1.parse)(input.val);
    //  let dec = parse(input.dec);
    const ret = new types_1.Float();
    switch (mode) {
        case 1:
            ret.set(Math.ceil(val));
            break;
        case 4:
            ret.set(-Math.round(-val));
            break;
        default:
            throw "round(), unknown mode";
    }
    return ret;
}
exports.round = round;

},{"../operators/_parse":72,"../types":136}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shift_left = void 0;
const string_1 = require("../types/string");
function shift_left(input) {
    let val = typeof input.val === "string" ? input.val : input.val.get();
    const sub = typeof input.sub === "string" ? input.sub : input.sub.get();
    while (val.startsWith(sub)) {
        val = val.substr(sub.length);
    }
    return new string_1.String().set(val);
}
exports.shift_left = shift_left;

},{"../types/string":140}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sign = void 0;
function sign(input) {
    let num_in = undefined;
    if (typeof input.val === "number") {
        num_in = input.val;
    }
    else if (typeof input.val === "string") {
        num_in = parseFloat(input.val);
    }
    else {
        num_in = parseFloat(input.val.get().toString());
    }
    return Math.sign(num_in);
}
exports.sign = sign;

},{}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sin = void 0;
/* eslint-disable radix */
const types_1 = require("../types");
function sin(input) {
    let num_in = undefined;
    if (typeof input.val === "number") {
        num_in = input.val;
    }
    else if (typeof input.val === "string") {
        num_in = parseFloat(input.val);
    }
    else if (input.val instanceof types_1.Float) {
        num_in = input.val.getRaw();
    }
    else {
        num_in = parseFloat(input.val.get().toString());
    }
    return Math.sin(num_in);
}
exports.sin = sin;

},{"../types":136}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqrt = void 0;
/* eslint-disable radix */
const types_1 = require("../types");
function sqrt(input) {
    let num_in = undefined;
    if (typeof input.val === "number") {
        num_in = input.val;
    }
    else if (typeof input.val === "string") {
        num_in = parseFloat(input.val);
    }
    else if (input.val instanceof types_1.Float) {
        num_in = input.val.getRaw();
    }
    else {
        num_in = parseFloat(input.val.get().toString());
    }
    return Math.sqrt(num_in);
}
exports.sqrt = sqrt;

},{"../types":136}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strlen = void 0;
const types_1 = require("../types");
function strlen(input) {
    let str = "";
    if (typeof input.val === "string") {
        str = input.val;
    }
    else {
        str = input.val.get();
    }
    return new types_1.Integer().set(str.length);
}
exports.strlen = strlen;

},{"../types":136}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.substring = void 0;
const string_1 = require("../types/string");
function substring(input) {
    var _a, _b;
    let off = (_a = input === null || input === void 0 ? void 0 : input.off) === null || _a === void 0 ? void 0 : _a.get();
    if (off === undefined) {
        off = 0;
    }
    const len = (_b = input === null || input === void 0 ? void 0 : input.len) === null || _b === void 0 ? void 0 : _b.get();
    let sub = "";
    if (typeof input.val === "string") {
        sub = input.val.substr(off, len);
    }
    else {
        sub = input.val.getOffset({ offset: off, length: len }).get();
    }
    return new string_1.String().set(sub);
}
exports.substring = substring;

},{"../types/string":140}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.substring_after = void 0;
const string_1 = require("../types/string");
function substring_after(input) {
    const val = typeof input.val === "string" ? input.val : input.val.get();
    let reg = "";
    if (typeof input.regex === "string") {
        reg = input.regex;
    }
    else if (input === null || input === void 0 ? void 0 : input.regex) {
        reg = input.regex.get();
    }
    else if (typeof input.sub === "string") {
        reg = input.sub;
    }
    else if (input === null || input === void 0 ? void 0 : input.sub) {
        reg = input.sub.get();
    }
    const r = new RegExp(reg + "(.*)");
    const res = val.match(r);
    let ret = "";
    if (res && res[1]) {
        ret = res[1];
    }
    return new string_1.String().set(ret);
}
exports.substring_after = substring_after;

},{"../types/string":140}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.substring_before = void 0;
const string_1 = require("../types/string");
function substring_before(input) {
    const val = typeof input.val === "string" ? input.val : input.val.get();
    let reg = "";
    if (typeof input.regex === "string") {
        reg = input.regex;
    }
    else if (input === null || input === void 0 ? void 0 : input.regex) {
        reg = input.regex.get();
    }
    else if (typeof input.sub === "string") {
        reg = input.sub;
    }
    else if (input === null || input === void 0 ? void 0 : input.sub) {
        reg = input.sub.get();
    }
    const r = new RegExp("(.*?)" + reg);
    const res = val.match(r);
    let ret = "";
    if (res && res[1]) {
        ret = res[1];
    }
    return new string_1.String().set(ret);
}
exports.substring_before = substring_before;

},{"../types/string":140}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sy = void 0;
const types_1 = require("../types");
exports.sy = new types_1.Structure({
    abcde: new types_1.Character({ length: 26 }).set("ABCDEFGHIJKLMNOPQRSTUVWXYZ"),
    datlo: new types_1.Date(),
    datum: new types_1.Date(),
    dbcnt: new types_1.Integer(),
    fdpos: new types_1.Integer(),
    index: new types_1.Integer(),
    langu: new types_1.Character({ length: 1 }).set("E"),
    mandt: new types_1.Character({ length: 3 }).set("123"),
    msgid: new types_1.Character({ length: 20 }),
    msgno: new types_1.Numc({ length: 3 }),
    msgty: new types_1.Character({ length: 1 }),
    msgv1: new types_1.Character({ length: 50 }),
    msgv2: new types_1.Character({ length: 50 }),
    msgv3: new types_1.Character({ length: 50 }),
    msgv4: new types_1.Character({ length: 50 }),
    subrc: new types_1.Integer(),
    sysid: new types_1.Character({ length: 3 }).set("ABC"),
    tabix: new types_1.Integer(),
    timlo: new types_1.Time(),
    tzone: new types_1.Integer(),
    uname: new types_1.Character({ length: 12 }).set("USERNAME"),
    uzeit: new types_1.Time(),
});

},{"../types":136}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tan = void 0;
/* eslint-disable radix */
const types_1 = require("../types");
function tan(input) {
    let num_in = undefined;
    if (typeof input.val === "number") {
        num_in = input.val;
    }
    else if (typeof input.val === "string") {
        num_in = parseFloat(input.val);
    }
    else if (input.val instanceof types_1.Float) {
        num_in = input.val.getRaw();
    }
    else {
        num_in = parseFloat(input.val.get().toString());
    }
    return Math.tan(num_in);
}
exports.tan = tan;

},{"../types":136}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.to_lower = void 0;
const types_1 = require("../types");
function to_lower(input) {
    const val = typeof input.val === "string" ? input.val : input.val.get();
    return new types_1.String().set(val.toLowerCase());
}
exports.to_lower = to_lower;

},{"../types":136}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.to_mixed = void 0;
/* eslint-disable @typescript-eslint/ban-types */
const types_1 = require("../types");
function to_mixed(input) {
    let sep = input.sep;
    if (sep === undefined) {
        sep = "_";
    }
    if (typeof sep !== "string") {
        sep = sep.get();
    }
    if (sep.length === 0) {
        throw "CX_SY_STRG_PAR_VAL";
    }
    const min = 1;
    if (min < 0) {
        throw "CX_SY_STRG_PAR_VAL";
    }
    let val = input.val;
    if (typeof val !== "string") {
        val = val.get();
    }
    val = val.substring(0, min) + val.substring(min).toLowerCase();
    if (input.case) {
        if (typeof input.case === "string") {
            if (input.case === input.case.toLowerCase()) {
                val = val.substring(0, 1).toLowerCase() + val.substring(1);
            }
        }
        else {
            if (input.case.get() === input.case.get().toLowerCase()) {
                val = val.substring(0, 1).toLowerCase() + val.substring(1);
            }
        }
    }
    const length = sep.length;
    const regex = new RegExp(sep + "\\w");
    while (val.match(regex)) {
        val = val.replace(regex, (x) => {
            return x.substring(length).toUpperCase();
        });
    }
    return new types_1.String().set(val);
}
exports.to_mixed = to_mixed;

},{"../types":136}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.to_upper = void 0;
const types_1 = require("../types");
function to_upper(input) {
    const val = typeof input.val === "string" ? input.val : input.val.get();
    return new types_1.String().set(val.toUpperCase());
}
exports.to_upper = to_upper;

},{"../types":136}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = void 0;
const string_1 = require("../types/string");
function translate(input) {
    let val = typeof input.val === "string" ? input.val : input.val.get();
    const from = typeof input.from === "string" ? input.from : input.from.get();
    const to = typeof input.to === "string" ? input.to : input.to.get();
    const fromSplit = from.split("");
    const toSplit = to.split("");
    const chars = {};
    for (let i = 0; i < fromSplit.length; i++) {
        chars[fromSplit[i]] = toSplit[i] || "";
    }
    const reg = new RegExp("[" + from + "]", "g");
    val = val.replace(reg, m => chars[m] || "");
    return new string_1.String().set(val);
}
exports.translate = translate;

},{"../types/string":140}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trunc = void 0;
function trunc(input) {
    let num_in = undefined;
    if (typeof input.val === "number") {
        num_in = input.val;
    }
    else if (typeof input.val === "string") {
        num_in = parseFloat(input.val);
    }
    else {
        num_in = parseFloat(input.val.get().toString());
    }
    return Math.trunc(num_in);
}
exports.trunc = trunc;

},{}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xstrlen = void 0;
const types_1 = require("../types");
function xstrlen(input) {
    if (typeof input.val === "string") {
        return new types_1.Integer().set(input.val.length / 2);
    }
    else {
        return new types_1.Integer().set(input.val.get().length / 2);
    }
}
exports.xstrlen = xstrlen;

},{"../types":136}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassicError = void 0;
class ClassicError extends Error {
    constructor(input) {
        super();
        this.classic = input.classic;
    }
}
exports.ClassicError = ClassicError;

},{}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clone = void 0;
const types_1 = require("./types");
function clone(obj) {
    if (null == obj || "object" != typeof obj) {
        return obj;
    }
    if (obj instanceof types_1.ABAPObject) {
        const n = new types_1.ABAPObject();
        n.set(obj.get());
        // @ts-ignore
        return n;
    }
    else if (obj instanceof types_1.DataReference) {
        const n = new types_1.DataReference(obj.getType());
        n.assign(obj.getPointer());
        // @ts-ignore
        return n;
    }
    // @ts-ignore
    const copy = new obj.constructor();
    for (const attr in obj) {
        // @ts-ignore
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(attr)) {
            if (null == obj[attr] || "object" != typeof obj[attr]) {
                copy[attr] = obj[attr];
            }
            else {
                copy[attr] = clone(obj[attr]);
            }
        }
    }
    return copy;
}
exports.clone = clone;

},{"./types":136}],46:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assigned = void 0;
function assigned(val) {
    return val.isAssigned();
}
exports.assigned = assigned;

},{}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.between = void 0;
const ge_1 = require("./ge");
const le_1 = require("./le");
function between(left, and1, and2) {
    return (0, ge_1.ge)(left, and1) && (0, le_1.le)(left, and2);
}
exports.between = between;

},{"./ge":54,"./le":59}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ca = void 0;
function ca(left, right) {
    let l = "";
    if (typeof left === "number" || typeof left === "string") {
        l = left.toString();
    }
    else {
        l = left.get().toString();
    }
    if (l === "") {
        l = " ";
    }
    let r = "";
    if (typeof right === "string") {
        r = right.toString();
    }
    else {
        r = right.get().toString();
    }
    const split = r.split("");
    return split.some(c => l.includes(c));
}
exports.ca = ca;

},{}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cn = void 0;
const co_1 = require("./co");
function cn(left, right) {
    return (0, co_1.co)(left, right) === false;
}
exports.cn = cn;

},{"./co":50}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.co = void 0;
const types_1 = require("../types");
function co(left, right) {
    let l = "";
    if (typeof left === "number" || typeof left === "string") {
        l = left.toString();
    }
    else {
        l = left.get().toString();
    }
    let r = "";
    if (typeof right === "string") {
        r = right.toString();
    }
    else if (right instanceof types_1.Structure) {
        r = Object.values(right.get()).map((a) => a.get()).join("");
    }
    else {
        r = right.get().toString();
    }
    const characters = r.split("");
    return l.split("").every(c => characters.includes(c));
}
exports.co = co;

},{"../types":136}],51:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cp = void 0;
function cp(left, right) {
    let l = "";
    if (typeof left === "number" || typeof left === "string") {
        l = left.toString();
    }
    else {
        l = left.get().toString();
    }
    let r = "";
    if (typeof right === "string") {
        r = right.toString();
    }
    else {
        r = right.get().toString();
    }
    r = r.replace(/\\/g, "\\\\");
    r = r.replace(/\[/g, "\\[");
    r = r.replace(/\]/g, "\\]");
    r = r.replace(/\?/g, "\\?");
    r = r.replace(/\(/g, "\\(");
    r = r.replace(/\)/g, "\\)");
    r = r.replace(/\./g, "\\.");
    r = r.replace(/\|/g, "\\|");
    r = r.replace(/\*/g, "[\\s\\S]*");
    r = r.replace(/\+/g, "[\\s\\S]");
    const reg = new RegExp("^" + r + "$", "i");
    return l.match(reg) !== null;
}
exports.cp = cp;

},{}],52:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cs = void 0;
function cs(left, right) {
    let l = "";
    if (typeof left === "number" || typeof left === "string") {
        l = left.toString();
    }
    else {
        l = left.get().toString();
    }
    l = l.toUpperCase();
    let r = "";
    if (typeof right === "string") {
        r = right.toString();
    }
    else {
        r = right.get().toString();
    }
    r = r.toUpperCase();
    const index = l.indexOf(r);
    if (index < 0) {
        // @ts-ignore
        abap.builtin.sy.get().fdpos.set(l.length);
        return false;
    }
    else {
        // @ts-ignore
        abap.builtin.sy.get().fdpos.set(index);
        return true;
    }
}
exports.cs = cs;

},{}],53:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eq = void 0;
const types_1 = require("../types");
function compareTables(left, right) {
    const leftArray = left.array();
    const rightArray = right.array();
    if (leftArray.length !== rightArray.length) {
        return false;
    }
    for (let i = 0; i < leftArray.length; i++) {
        const rowCompare = eq(leftArray[i], rightArray[i]);
        if (rowCompare === false) {
            return false;
        }
    }
    return true;
}
function eq(left, right) {
    /*
      console.dir(left);
      console.dir(right);
    */
    if (right instanceof types_1.FieldSymbol) {
        return eq(left, right.getPointer());
    }
    else if (left instanceof types_1.FieldSymbol) {
        return eq(left.getPointer(), right);
    }
    if (left instanceof types_1.Table || right instanceof types_1.Table) {
        if (left instanceof types_1.Table && right instanceof types_1.Table) {
            return compareTables(left, right);
        }
        else {
            // this happens in dynamic/ANY typed scenarios?
            return false;
        }
    }
    if (left instanceof types_1.Structure || right instanceof types_1.Structure) {
        if (!(right instanceof types_1.Structure)) {
            return false;
        }
        if (!(left instanceof types_1.Structure)) {
            return false;
        }
        const l = left.get();
        const r = right.get();
        const leftKeys = Object.keys(l);
        const rightKeys = Object.keys(r);
        if (leftKeys.length !== rightKeys.length) {
            return false;
        }
        for (const k of leftKeys) {
            const e = eq(l[k], r[k]);
            if (e === false) {
                return false;
            }
        }
        return true;
    }
    let l = undefined;
    if (left instanceof types_1.Character) {
        l = left.getTrimEnd();
    }
    else if (typeof left === "object") {
        l = left.get();
    }
    else {
        l = left;
    }
    let r = undefined;
    if (right instanceof types_1.Character) {
        r = right.getTrimEnd();
    }
    else if (typeof right === "object") {
        r = right.get();
    }
    else {
        r = right;
    }
    if (right instanceof types_1.Hex && typeof l === "number") {
        r = parseInt(right.get(), 16);
    }
    else if (left instanceof types_1.Hex && typeof r === "number") {
        l = parseInt(left.get(), 16);
    }
    if (right instanceof types_1.Float && left instanceof types_1.Float) {
        r = right.getRaw();
        l = left.getRaw();
    }
    else if (right instanceof types_1.Float && typeof l === "number") {
        r = right.getRaw();
    }
    else if (left instanceof types_1.Float) {
        if (typeof r === "number") {
            l = left.getRaw();
        }
        else if (typeof r === "string") {
            l = left.getRaw();
            r = Number(r);
        }
    }
    if (right instanceof types_1.Numc && left instanceof types_1.Integer) {
        l = left.get();
        r = parseInt(right.get(), 10);
    }
    else if (right instanceof types_1.Integer && left instanceof types_1.Numc) {
        r = right.get();
        l = parseInt(left.get(), 10);
    }
    // assumption: typically no casts are required, so start checking if the types doesnt match
    if (typeof l !== typeof r) {
        if (typeof l === "string" && typeof r === "number") {
            r = r.toString();
        }
        else if (typeof l === "number" && typeof r === "string") {
            if (r === "") {
                r = 0;
            }
            else {
                r = parseInt(r, 10);
            }
        }
    }
    /*
      console.dir(l);
      console.dir(r);
    */
    return l === r;
}
exports.eq = eq;

},{"../types":136}],54:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ge = void 0;
const _1 = require(".");
function ge(left, right) {
    return (0, _1.gt)(left, right) || (0, _1.eq)(left, right);
}
exports.ge = ge;

},{".":57}],55:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gt = void 0;
const types_1 = require("../types");
const integer_1 = require("../types/integer");
function gt(left, right) {
    if (left instanceof types_1.Table || right instanceof types_1.Table) {
        throw "runtime_todo, gt TABLE";
    }
    if (left instanceof types_1.Hex || right instanceof types_1.Hex) {
        return gt_with_hex(left, right);
    }
    let l = undefined;
    if (typeof left === "number" || typeof left === "string") {
        l = left;
    }
    else if (left instanceof types_1.Float) {
        l = left.getRaw();
    }
    else {
        l = left.get();
    }
    let r = undefined;
    if (typeof right === "number" || typeof right === "string") {
        r = right;
    }
    else if (right instanceof types_1.Float) {
        r = right.getRaw();
    }
    else {
        r = right.get();
    }
    if (typeof l === "string" && typeof r === "number") {
        if (l === "") {
            l = 0;
        }
        else {
            l = parseInt(l, 10);
        }
    }
    else if (typeof l === "number" && typeof r === "string") {
        if (r === "") {
            r = 0;
        }
        else {
            r = parseInt(r, 10);
        }
    }
    if (l === undefined) {
        return true; // todo, not sure this is correct
    }
    if (r === undefined) {
        return true; // todo, not sure this is correct
    }
    return l > r;
}
exports.gt = gt;
function gt_with_hex(left, right) {
    const left_hex = get_hex_from_parameter(left);
    const right_hex = get_hex_from_parameter(right);
    return left_hex > right_hex;
}
function get_hex_from_parameter(comparison_part) {
    let hex_from_parameter = "";
    switch (typeof comparison_part) {
        case "number":
            hex_from_parameter = comparison_part.toString(16);
            break;
        case "string":
            hex_from_parameter = comparison_part.split("")
                .map(c => c.charCodeAt(0).toString(16).padStart(2, "0"))
                .join("");
            break;
        case "object":
            if (comparison_part instanceof types_1.Hex) {
                hex_from_parameter = comparison_part.get();
            }
            else if (comparison_part instanceof integer_1.Integer) {
                hex_from_parameter = comparison_part.get().toString(16).toUpperCase();
                if (hex_from_parameter.length % 2 === 1) {
                    hex_from_parameter = "0" + hex_from_parameter;
                }
            }
            else {
                throw "runtime_todo, gt hex";
            }
            break;
        default:
            throw "runtime_todo, gt hex";
    }
    return hex_from_parameter;
}

},{"../types":136,"../types/integer":137}],56:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareIn = void 0;
const eq_1 = require("./eq");
function compareIn(left, right) {
    if (right.array().length === 0) {
        return true;
    }
    for (const row of right.array()) {
        if ((0, eq_1.eq)(row.get()["sign"], "I")
            && (0, eq_1.eq)(row.get()["option"], "EQ")
            && (0, eq_1.eq)(row.get()["low"], left)) {
            return true;
        }
    }
    return false;
}
exports.compareIn = compareIn;

},{"./eq":53}],57:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.in = void 0;
__exportStar(require("./assigned"), exports);
__exportStar(require("./between"), exports);
__exportStar(require("./ca"), exports);
__exportStar(require("./cn"), exports);
__exportStar(require("./co"), exports);
__exportStar(require("./cp"), exports);
__exportStar(require("./cs"), exports);
__exportStar(require("./eq"), exports);
__exportStar(require("./ge"), exports);
__exportStar(require("./gt"), exports);
__exportStar(require("./initial"), exports);
__exportStar(require("./le"), exports);
__exportStar(require("./lt"), exports);
__exportStar(require("./ne"), exports);
__exportStar(require("./na"), exports);
__exportStar(require("./ns"), exports);
__exportStar(require("./np"), exports);
var in_1 = require("./in");
Object.defineProperty(exports, "in", { enumerable: true, get: function () { return in_1.compareIn; } });

},{"./assigned":46,"./between":47,"./ca":48,"./cn":49,"./co":50,"./cp":51,"./cs":52,"./eq":53,"./ge":54,"./gt":55,"./in":56,"./initial":58,"./le":59,"./lt":60,"./na":61,"./ne":62,"./np":63,"./ns":64}],58:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initial = void 0;
const types_1 = require("../types");
function initial(val) {
    // todo, refactor? add as method in each type instead?
    if (val instanceof types_1.Table) {
        return val.array().length === 0;
    }
    else if (val instanceof types_1.DataReference) {
        return val.getPointer() === undefined;
    }
    else if (val instanceof types_1.Date) {
        return val.get() === "00000000";
    }
    else if (val instanceof types_1.Numc) {
        return val.get().match(/^0+$/) !== null;
    }
    else if (val instanceof types_1.Hex) {
        return val.get().match(/^0+$/) !== null;
    }
    else if (val instanceof types_1.Time) {
        return val.get() === "000000";
    }
    else if (val instanceof types_1.Character) {
        return val.get().match(/^ *$/) !== null;
    }
    else if (val instanceof types_1.FieldSymbol && val.getPointer() === undefined) {
        throw "FS not assigned";
    }
    else if (val instanceof types_1.FieldSymbol) {
        const res = initial(val.getPointer());
        return res;
    }
    if (typeof val === "string") {
        return val === "";
    }
    else if (typeof val === "number") {
        return val === 0;
    }
    const value = val.get();
    if (typeof value === "string") {
        return value === "";
    }
    else if (typeof value === "number") {
        return value === 0;
    }
    else if (val instanceof types_1.ABAPObject) {
        return value === undefined;
    }
    else if (typeof value === "object") {
        for (const f of Object.keys(value)) {
            if (initial(value[f]) === false) {
                return false;
            }
        }
        return true;
    }
    else {
        throw new Error("runtime, initial, missing implementation");
    }
}
exports.initial = initial;

},{"../types":136}],59:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.le = void 0;
const _1 = require(".");
function le(left, right) {
    return (0, _1.lt)(left, right) || (0, _1.eq)(left, right);
}
exports.le = le;

},{".":57}],60:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lt = void 0;
const gt_1 = require("./gt");
function lt(left, right) {
    return (0, gt_1.gt)(right, left);
}
exports.lt = lt;

},{"./gt":55}],61:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.na = void 0;
const ca_1 = require("./ca");
function na(left, right) {
    return !(0, ca_1.ca)(left, right);
}
exports.na = na;

},{"./ca":48}],62:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ne = void 0;
const eq_1 = require("./eq");
function ne(left, right) {
    return !(0, eq_1.eq)(left, right);
}
exports.ne = ne;

},{"./eq":53}],63:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.np = void 0;
const cp_1 = require("./cp");
function np(left, right) {
    return !(0, cp_1.cp)(left, right);
}
exports.np = np;

},{"./cp":51}],64:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ns = void 0;
const cs_1 = require("./cs");
function ns(left, right) {
    return !(0, cs_1.cs)(left, right);
}
exports.ns = ns;

},{"./cs":52}],65:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Console = void 0;
class Console {
    constructor() {
        this.data = "";
    }
    clear() {
        this.data = "";
    }
    add(data) {
        this.data = this.data + data;
    }
    get() {
        return this.data;
    }
    getTrimmed() {
        return this.data.split("\n").map(a => a.trimEnd()).join("\n");
    }
}
exports.Console = Console;

},{}],66:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
class Context {
    constructor() {
        // DEFAULT and secondary database connections
        this.databaseConnections = {};
        this.RFCDestinations = {};
    }
    defaultDB() {
        if (this.databaseConnections["DEFAULT"] === undefined) {
            throw new Error("Runtime, database not initialized");
        }
        return this.databaseConnections["DEFAULT"];
    }
}
exports.Context = Context;

},{}],67:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],68:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expandIN = void 0;
// note: must always return an expression, never return empty string
function expandIN(fieldName, table) {
    var _a, _b, _c;
    let ret = "";
    if (table.array().length === 0) {
        ret = fieldName + " NOT IN ()";
    }
    else {
        ret = fieldName + " IN (";
        const values = [];
        for (const row of table.array()) {
            if (((_a = row.get().sign) === null || _a === void 0 ? void 0 : _a.get()) !== "I" || ((_b = row.get().option) === null || _b === void 0 ? void 0 : _b.get()) !== "EQ") {
                throw "Error: IN, only I EQ supported for now";
            }
            values.push("'" + ((_c = row.get().low) === null || _c === void 0 ? void 0 : _c.get().replace(/'/g, "''")) + "'");
        }
        ret += values.join(",") + ")";
    }
    return ret;
}
exports.expandIN = expandIN;

},{}],69:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ABAP = exports.DB = exports.types = exports.RFC = exports.UnitTestResult = void 0;
const console_1 = require("./console");
const context_1 = require("./context");
const offset_length_1 = require("./offset_length");
const statements_1 = require("./statements");
const template_formatting_1 = require("./template_formatting");
const unit_test_1 = require("./unit_test");
Object.defineProperty(exports, "UnitTestResult", { enumerable: true, get: function () { return unit_test_1.UnitTestResult; } });
const builtin = require("./builtin");
const compare = require("./compare");
const DB = require("./db/db");
exports.DB = DB;
const operators = require("./operators");
const RFC = require("./rfc");
exports.RFC = RFC;
const types = require("./types");
exports.types = types;
const expand_in_1 = require("./expand_in");
const classic_error_1 = require("./classic_error");
class ABAP {
    constructor() {
        // global objects
        this.FunctionModules = {};
        this.Classes = {};
        this.Interfaces = {};
        this.DDIC = {};
        this.types = types;
        this.builtin = builtin;
        this.operators = operators;
        this.compare = compare;
        this.OffsetLength = offset_length_1.OffsetLength;
        this.templateFormatting = template_formatting_1.templateFormatting;
        this.expandIN = expand_in_1.expandIN;
        this.ClassicError = classic_error_1.ClassicError;
        this.context = new context_1.Context();
        this.console = new console_1.Console();
        this.context.console = this.console;
        this.statements = new statements_1.Statements(this.context);
        // todo, this should not be a singleton, it should be part of this instance
        // todo, move to context
        builtin.sy.get().subrc.set(0);
        builtin.sy.get().tabix.set(0);
        builtin.sy.get().index.set(0);
        this.statements.getTime({ sy: builtin.sy });
    }
}
exports.ABAP = ABAP;

},{"./builtin":17,"./classic_error":44,"./compare":57,"./console":65,"./context":66,"./db/db":67,"./expand_in":68,"./offset_length":70,"./operators":81,"./rfc":86,"./statements":106,"./template_formatting":126,"./types":136,"./unit_test":146}],70:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffsetLength = void 0;
const types_1 = require("./types");
class OffsetLength {
    constructor(obj, options) {
        this.obj = obj;
        this.isHex = obj instanceof types_1.Hex || obj instanceof types_1.XString;
        if (options.offset) {
            if (typeof options.offset === "number") {
                this.offset = options.offset;
            }
            else {
                this.offset = options.offset.get();
            }
            if (this.isHex) {
                this.offset *= 2;
            }
        }
        if (options.length) {
            if (typeof options.length === "number") {
                this.length = options.length;
            }
            else {
                this.length = options.length.get();
            }
            if (this.isHex) {
                this.length *= 2;
            }
        }
    }
    get() {
        return this.obj.getOffset({ offset: this.offset, length: this.length }).get();
    }
    set(value) {
        let val = "";
        if (typeof value === "string") {
            val = value;
        }
        else if (typeof value === "number") {
            val = value + "";
        }
        else if (value instanceof types_1.Integer) {
            val = value.get() + "";
            if (this.isHex) {
                val = Number(val).toString(16);
            }
        }
        else {
            val = value.get() + "";
        }
        let old = this.obj.get();
        if (this.obj instanceof types_1.Character) {
            old = old.padEnd(this.obj.getLength(), " ");
        }
        if (this.length) {
            val = val.substr(0, this.length);
            if (this.isHex || this.obj instanceof types_1.Time) {
                val = val.padStart(this.length, "0");
            }
        }
        if (this.length && this.offset) {
            old = old.substr(0, this.offset) + val + old.substr(this.offset + this.length);
        }
        else if (this.length) {
            old = val + old.substr(this.length);
        }
        else if (this.offset) {
            old = old.substr(0, this.offset) + val;
        }
        old = old.trimEnd();
        if (this.obj instanceof types_1.Character) {
            old = old.padEnd(this.obj.getLength(), " ");
        }
        this.obj.set(old);
    }
}
exports.OffsetLength = OffsetLength;

},{"./types":136}],71:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_bit_operation_chunks = void 0;
function get_bit_operation_chunks(left, right) {
    const ret = [];
    let leftFull = left.get();
    const leftLen = leftFull.length;
    leftFull = leftFull.padEnd(Math.ceil(leftLen / 2) * 2, "0");
    let rightFull = right.get();
    const rightLen = rightFull.length;
    rightFull = rightFull.padEnd(Math.ceil(rightLen / 2) * 2, "0");
    const maxLen = leftFull.length > rightFull.length ? leftFull.length : rightFull.length;
    // Using 3-byte chunkgs (6 hex positions) to avoid JavaScript negative values for extreme cases
    const chunks = maxLen / 6;
    for (let pass = chunks; pass > 0; pass--) {
        const chunkStart = maxLen - pass * 6;
        const chunkEnd = maxLen - (pass - 1) * 6;
        let leftSlice = leftFull.slice(chunkStart, chunkEnd);
        let rightSlice = rightFull.slice(chunkStart, chunkEnd);
        const chunkLen = leftSlice.length > rightSlice.length ? leftSlice.length : rightSlice.length;
        leftSlice = leftSlice.padEnd(chunkLen, "0");
        rightSlice = rightSlice.padEnd(chunkLen, "0");
        const leftChunk = parseInt(leftSlice, 16);
        const rightChunk = parseInt(rightSlice, 16);
        ret.push({ leftChunk: leftChunk, rightChunk: rightChunk, chunkLen: chunkLen });
    }
    return ret;
}
exports.get_bit_operation_chunks = get_bit_operation_chunks;

},{}],72:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const types_1 = require("../types");
const xstring_1 = require("../types/xstring");
function parse(val) {
    if (typeof val === "number") {
        return val;
    }
    else if (typeof val === "string") {
        return parseInt(val, 10);
    }
    else if (val instanceof types_1.Float) {
        return val.getRaw();
    }
    else if (val instanceof xstring_1.XString || val instanceof types_1.Hex) {
        if (val.get() === "") {
            return 0;
        }
        let num = parseInt(val.get(), 16);
        // handle two complement,
        if (val instanceof types_1.Hex && val.getLength() >= 4) {
            const maxVal = Math.pow(2, val.get().length / 2 * 8);
            if (num > maxVal / 2 - 1) {
                num = num - maxVal;
            }
        }
        return num;
    }
    else if (val instanceof types_1.Time || val instanceof types_1.Date) {
        return val.getNumeric();
    }
    else {
        return parse(val.get());
    }
}
exports.parse = parse;

},{"../types":136,"../types/xstring":145}],73:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = void 0;
const types_1 = require("../types");
const string_1 = require("../types/string");
const _parse_1 = require("./_parse");
function add(left, right) {
    if (left instanceof types_1.Integer && right instanceof types_1.Integer) {
        return new types_1.Integer().set(left.get() + right.get());
    }
    else if (typeof left === "number" && typeof right === "number"
        && Number.isInteger(left) && Number.isInteger(right)) {
        return new types_1.Integer().set(left + right);
    }
    else if (typeof left === "number" && Number.isInteger(left) && right instanceof types_1.Integer) {
        return new types_1.Integer().set(left + right.get());
    }
    else if (typeof right === "number" && Number.isInteger(right) && left instanceof types_1.Integer) {
        return new types_1.Integer().set(left.get() + right);
    }
    else if ((left instanceof string_1.String || left instanceof types_1.Character) && Number.isInteger(Number(left.get())) && right instanceof types_1.Integer) {
        return new types_1.Integer().set(Number.parseInt(left.get(), 10) + right.get());
    }
    else if ((right instanceof string_1.String || right instanceof types_1.Character) && Number.isInteger(Number(right)) && left instanceof types_1.Integer) {
        return new types_1.Integer().set(left.get() + Number.parseInt(right.get(), 10));
    }
    return new types_1.Float().set((0, _parse_1.parse)(left) + (0, _parse_1.parse)(right));
}
exports.add = add;

},{"../types":136,"../types/string":140,"./_parse":72}],74:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bitand = void 0;
/*eslint no-bitwise: ["error", { "allow": ["&"] }] */
const types_1 = require("../types");
const _bit_operations_1 = require("./_bit_operations");
function bitand(left, right) {
    let and = "";
    const chunks = (0, _bit_operations_1.get_bit_operation_chunks)(left, right);
    // eslint-disable-next-line no-cond-assign
    for (let i = 0, chunk; chunk = chunks[i]; i++) {
        and = and + (chunk.leftChunk & chunk.rightChunk).toString(16).toUpperCase().padStart(chunk.chunkLen, "0");
    }
    const ret = new types_1.XString();
    ret.set(and);
    return ret;
}
exports.bitand = bitand;

},{"../types":136,"./_bit_operations":71}],75:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bitnot = void 0;
/*eslint no-bitwise: ["error", { "allow": ["~"] }] */
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_NOT
const types_1 = require("../types");
function bitnot(right) {
    const right16 = parseInt(right.get(), 16);
    const not = ~right16;
    const ret = new types_1.Hex({ length: right.get().length / 2 });
    ret.set(not);
    return ret;
}
exports.bitnot = bitnot;

},{"../types":136}],76:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bitor = void 0;
/*eslint no-bitwise: ["error", { "allow": ["|"] }] */
const types_1 = require("../types");
const _bit_operations_1 = require("./_bit_operations");
function bitor(left, right) {
    let or = "";
    const chunks = (0, _bit_operations_1.get_bit_operation_chunks)(left, right);
    // eslint-disable-next-line no-cond-assign
    for (let i = 0, chunk; chunk = chunks[i]; i++) {
        or = or + (chunk.leftChunk | chunk.rightChunk).toString(16).toUpperCase().padStart(chunk.chunkLen, "0");
    }
    const ret = new types_1.XString();
    ret.set(or);
    return ret;
}
exports.bitor = bitor;

},{"../types":136,"./_bit_operations":71}],77:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bitxor = void 0;
/*eslint no-bitwise: ["error", { "allow": ["^"] }] */
const types_1 = require("../types");
const _bit_operations_1 = require("./_bit_operations");
function bitxor(left, right) {
    let xor = "";
    const chunks = (0, _bit_operations_1.get_bit_operation_chunks)(left, right);
    // eslint-disable-next-line no-cond-assign
    for (let i = 0, chunk; chunk = chunks[i]; i++) {
        xor = xor + (chunk.leftChunk ^ chunk.rightChunk).toString(16).toUpperCase().padStart(chunk.chunkLen, "0");
    }
    const ret = new types_1.XString();
    ret.set(xor);
    return ret;
}
exports.bitxor = bitxor;

},{"../types":136,"./_bit_operations":71}],78:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concat = void 0;
const types_1 = require("../types");
function concat(left, right) {
    let val = "";
    if (typeof left === "string" || typeof left === "number") {
        val += left;
    }
    else if (left instanceof types_1.Character) {
        val += left.getTrimEnd();
    }
    else {
        val += left.get();
    }
    if (typeof right === "string" || typeof right === "number") {
        val += right;
    }
    else if (right instanceof types_1.Character) {
        val += right.getTrimEnd();
    }
    else {
        val += right.get();
    }
    return new types_1.String().set(val);
}
exports.concat = concat;

},{"../types":136}],79:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.div = void 0;
const types_1 = require("../types");
const _parse_1 = require("./_parse");
function div(left, right) {
    const l = (0, _parse_1.parse)(left);
    const r = (0, _parse_1.parse)(right);
    const ret = new types_1.Integer().set(Math.floor(l / r));
    return ret;
}
exports.div = div;

},{"../types":136,"./_parse":72}],80:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.divide = void 0;
const types_1 = require("../types");
const _parse_1 = require("./_parse");
// todo, this will only work when the target value is an integer?
function divide(left, right) {
    const val = (0, _parse_1.parse)(left) / (0, _parse_1.parse)(right);
    return new types_1.Float().set(val);
}
exports.divide = divide;

},{"../types":136,"./_parse":72}],81:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./add"), exports);
__exportStar(require("./div"), exports);
__exportStar(require("./divide"), exports);
__exportStar(require("./minus"), exports);
__exportStar(require("./mod"), exports);
__exportStar(require("./multiply"), exports);
__exportStar(require("./power"), exports);
__exportStar(require("./bit-and"), exports);
__exportStar(require("./bit-not"), exports);
__exportStar(require("./bit-or"), exports);
__exportStar(require("./bit-xor"), exports);
__exportStar(require("./concat"), exports);

},{"./add":73,"./bit-and":74,"./bit-not":75,"./bit-or":76,"./bit-xor":77,"./concat":78,"./div":79,"./divide":80,"./minus":82,"./mod":83,"./multiply":84,"./power":85}],82:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minus = void 0;
const types_1 = require("../types");
const _parse_1 = require("./_parse");
const string_1 = require("../types/string");
function minus(left, right) {
    if (left instanceof types_1.Integer && right instanceof types_1.Integer) {
        return new types_1.Integer().set(left.get() - right.get());
    }
    else if (typeof left === "number" && typeof right === "number"
        && Number.isInteger(left) && Number.isInteger(right)) {
        return new types_1.Integer().set(left - right);
    }
    else if (typeof left === "number" && Number.isInteger(left) && right instanceof types_1.Integer) {
        return new types_1.Integer().set(left - right.get());
    }
    else if (typeof right === "number" && Number.isInteger(right) && left instanceof types_1.Integer) {
        return new types_1.Integer().set(left.get() - right);
    }
    else if ((left instanceof string_1.String || left instanceof types_1.Character) && Number.isInteger(Number(left.get())) && right instanceof types_1.Integer) {
        return new types_1.Integer().set(Number.parseInt(left.get(), 10) - right.get());
    }
    else if ((right instanceof string_1.String || right instanceof types_1.Character) && Number.isInteger(Number(right)) && left instanceof types_1.Integer) {
        return new types_1.Integer().set(left.get() - Number.parseInt(right.get(), 10));
    }
    return new types_1.Float().set((0, _parse_1.parse)(left) - (0, _parse_1.parse)(right));
}
exports.minus = minus;

},{"../types":136,"../types/string":140,"./_parse":72}],83:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mod = void 0;
const types_1 = require("../types");
const _parse_1 = require("./_parse");
function mod(left, right) {
    const l = (0, _parse_1.parse)(left);
    const r = (0, _parse_1.parse)(right);
    const ret = new types_1.Integer().set(((l % r) + r) % r);
    return ret;
}
exports.mod = mod;

},{"../types":136,"./_parse":72}],84:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiply = void 0;
const types_1 = require("../types");
const _parse_1 = require("./_parse");
const string_1 = require("../types/string");
function multiply(left, right) {
    if (left instanceof types_1.Integer && right instanceof types_1.Integer) {
        return new types_1.Integer().set(left.get() * right.get());
    }
    else if (typeof left === "number" && typeof right === "number"
        && Number.isInteger(left) && Number.isInteger(right)) {
        return new types_1.Integer().set(left * right);
    }
    else if (typeof left === "number" && Number.isInteger(left) && right instanceof types_1.Integer) {
        return new types_1.Integer().set(left * right.get());
    }
    else if (typeof right === "number" && Number.isInteger(right) && left instanceof types_1.Integer) {
        return new types_1.Integer().set(left.get() * right);
    }
    else if ((left instanceof string_1.String || left instanceof types_1.Character) && Number.isInteger(Number(left.get())) && right instanceof types_1.Integer) {
        return new types_1.Integer().set(Number.parseInt(left.get(), 10) * right.get());
    }
    else if ((right instanceof string_1.String || right instanceof types_1.Character) && Number.isInteger(Number(right)) && left instanceof types_1.Integer) {
        return new types_1.Integer().set(left.get() * Number.parseInt(right.get(), 10));
    }
    return new types_1.Float().set((0, _parse_1.parse)(left) * (0, _parse_1.parse)(right));
}
exports.multiply = multiply;

},{"../types":136,"../types/string":140,"./_parse":72}],85:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.power = void 0;
const types_1 = require("../types");
const _parse_1 = require("./_parse");
function power(left, right) {
    return new types_1.Float().set(Math.pow((0, _parse_1.parse)(left), (0, _parse_1.parse)(right)));
}
exports.power = power;

},{"../types":136,"./_parse":72}],86:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],87:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.append = void 0;
const types_1 = require("../types");
function append(input) {
    if (input.target instanceof types_1.FieldSymbol) {
        input.target = input.target.getPointer();
    }
    if (input.target === undefined) {
        throw "Field symbol not assigned";
    }
    if (input.source instanceof types_1.FieldSymbol) {
        input.source = input.source.getPointer();
    }
    if (input.lines === true && input.source instanceof types_1.Table) {
        let from = 1;
        if (input.from) {
            from = parseInt(input.from.get() + "", 10);
        }
        let to = input.source.array().length;
        if (input.to) {
            to = parseInt(input.to.get() + "", 10);
        }
        let index = 1;
        for (const a of input.source.array()) {
            if (index < from || index > to) {
                index++;
                continue;
            }
            input.target.append(a);
            index++;
        }
    }
    else {
        const val = input.target.append(input.source);
        if (input.assigning) {
            if (val instanceof types_1.FieldSymbol) {
                input.assigning.assign(val.getPointer());
            }
            else {
                input.assigning.assign(val);
            }
        }
    }
    // @ts-ignore
    abap.builtin.sy.get().tabix.set(input.target.array().length);
}
exports.append = append;

},{"../types":136}],88:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert = void 0;
function assert(input) {
    if (input === false) {
        throw new Error("ASSERT failed");
    }
}
exports.assert = assert;

},{}],89:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assign = void 0;
const types_1 = require("../types");
function assign(input) {
    // console.dir(input);
    if (input.dynamicName) {
        if (input.dynamicSource instanceof types_1.FieldSymbol) {
            input.dynamicSource = input.dynamicSource.getPointer();
        }
        if (input.dynamicName.includes("->")) {
            if (input.dynamicSource instanceof types_1.ABAPObject) {
                const split = input.dynamicName.split("->");
                // @ts-ignore
                input.dynamicSource = input.dynamicSource.get()[split[1].toLowerCase()];
            }
            else {
                // @ts-ignore
                abap.builtin.sy.get().subrc.set(4);
                return;
            }
        }
        else if (input.dynamicName.includes("=>")) {
            const split = input.dynamicName.split("=>");
            // @ts-ignore
            const clas = abap.Classes[split[0].toUpperCase()];
            if (clas === undefined) {
                // @ts-ignore
                abap.builtin.sy.get().subrc.set(4);
                return;
            }
            if (clas[split[1].toLowerCase()] !== undefined) {
                input.target.assign(clas[split[1].toLowerCase()]);
                // @ts-ignore
                abap.builtin.sy.get().subrc.set(0);
                return;
            }
            else if (clas[split[0].toLowerCase() + "$" + split[1].toLowerCase()] !== undefined) {
                input.target.assign(clas[split[0].toLowerCase() + "$" + split[1].toLowerCase()]);
                // @ts-ignore
                abap.builtin.sy.get().subrc.set(0);
                return;
            }
        }
        if (input.dynamicSource) {
            input.target.assign(input.dynamicSource);
            // @ts-ignore
            abap.builtin.sy.get().subrc.set(0);
        }
        else {
            // @ts-ignore
            abap.builtin.sy.get().subrc.set(4);
        }
    }
    else if (input.component) {
        if (input.source instanceof types_1.FieldSymbol || input.source instanceof types_1.DataReference) {
            input.source = input.source.getPointer();
            assign(input);
            return;
        }
        else if (!(input.source instanceof types_1.Structure)) {
            // @ts-ignore
            abap.builtin.sy.get().subrc.set(4);
            return;
        }
        let component = input.component;
        if (typeof component !== "string") {
            component = component.get();
        }
        let result = undefined;
        if (typeof component === "number") {
            const structure_as_object = input.source.get();
            const keys = Object.keys(structure_as_object);
            const component_name = keys[(component - 1)];
            result = structure_as_object[component_name];
        }
        else {
            result = input.source.get()[component.toLowerCase()];
        }
        if (result === undefined) {
            // not a field in the structure
            // @ts-ignore
            abap.builtin.sy.get().subrc.set(4);
        }
        else {
            input.target.assign(result);
            // @ts-ignore
            abap.builtin.sy.get().subrc.set(0);
        }
    }
    else {
        if (input.source instanceof types_1.FieldSymbol) {
            input.target.assign(input.source.getPointer());
        }
        else {
            if (input.casting) {
                input.target.setCasting();
            }
            input.target.assign(input.source);
        }
        // @ts-ignore
        abap.builtin.sy.get().subrc.set(0);
    }
}
exports.assign = assign;

},{"../types":136}],90:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallFunction = void 0;
class CallFunction {
    constructor(context) {
        this.context = context;
    }
    // note: this is only called if DESTINIATION is supplied
    async callFunction(options) {
        const dest = this.context.RFCDestinations[options.destination];
        if (dest === undefined) {
            throw new Error(`RFC destination ${options.destination} does not exist`);
        }
        await dest.call(options.name, {
            exporting: options.exporting,
            importing: options.importing,
            tables: options.tables,
            changing: options.changing,
            exceptions: options.exceptions,
        });
    }
}
exports.CallFunction = CallFunction;

},{}],91:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cast = void 0;
const compare_1 = require("../compare");
// todo, field symbols as input?
// todo, local classes?
// check with javascript instanceof?
// handling interfaces?
async function cast(target, source) {
    var _a;
    if ((0, compare_1.initial)(source)) {
        target.clear();
        return;
    }
    // eslint-disable-next-line prefer-const
    let castEnabled = true;
    if (castEnabled === true) {
        const targetName = (_a = target.getQualifiedName()) === null || _a === void 0 ? void 0 : _a.toUpperCase();
        if ((targetName === null || targetName === void 0 ? void 0 : targetName.startsWith("IF_")) === false
            && (targetName === null || targetName === void 0 ? void 0 : targetName.startsWith("ZIF_")) === false) { // todo, interfaces are also classes but not inherited
            // using "instanceof" is probably wrong in some cases,
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof
            // @ts-ignore
            if (abap.Classes[targetName] && source.get() instanceof abap.Classes[targetName] === false) {
                // @ts-ignore
                if (abap.Classes["CX_SY_MOVE_CAST_ERROR"] !== undefined) {
                    // @ts-ignore
                    throw new abap.Classes["CX_SY_MOVE_CAST_ERROR"]();
                }
                else {
                    throw "Global class CX_SY_MOVE_CAST_ERROR not found";
                }
            }
        }
        target.set(source);
    }
    else {
        target.set(source);
    }
}
exports.cast = cast;

},{"../compare":57}],92:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clear = void 0;
function clear(value) {
    value.clear();
}
exports.clear = clear;

},{}],93:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commit = void 0;
function commit() {
    // todo
}
exports.commit = commit;

},{}],94:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concatenate = void 0;
const types_1 = require("../types");
function concatenate(input) {
    const list = [];
    if (input.lines === true) {
        const tab = input.source[0];
        if (tab instanceof types_1.Table) {
            for (const l of tab.array()) {
                list.push(l.get());
            }
        }
    }
    else {
        for (const source of input.source) {
            if (typeof source === "string" || typeof source === "number") {
                list.push(source.toString());
            }
            else if (source instanceof types_1.Table) {
                throw new Error("concatenate, error input is table");
            }
            else {
                list.push(source.get().toString());
            }
        }
    }
    let sep = "";
    if (input.separatedBy) {
        if (typeof input.separatedBy === "string" || typeof input.separatedBy === "number") {
            sep = input.separatedBy.toString();
        }
        else {
            sep = input.separatedBy.get().toString();
        }
    }
    input.target.set(list.join(sep));
}
exports.concatenate = concatenate;

},{"../types":136}],95:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.condense = void 0;
function condense(input, options) {
    let trimmed = input.get().replace(/ +$/, "");
    trimmed = trimmed.replace(/^ +/, "");
    if (options.nogaps) {
        trimmed = trimmed.replace(/ */g, "");
    }
    else {
        trimmed = trimmed.replace(/ {2,}/g, " ");
    }
    input.set(trimmed);
}
exports.condense = condense;

},{}],96:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = void 0;
const temporal_polyfill_1 = require("temporal-polyfill");
function convert(source, target) {
    var _a, _b, _c;
    let date = "";
    if (source.date) {
        if (typeof source.date === "string") {
            date = source.date;
        }
        else {
            date = source.date.get();
        }
    }
    let time = "";
    if (source.time) {
        if (typeof source.time === "string") {
            time = source.time;
        }
        else {
            time = source.time.get();
        }
    }
    let stamp = "";
    if (source.stamp) {
        if (typeof source.stamp === "string") {
            stamp = source.stamp;
        }
        else {
            stamp = source.stamp.get() + "";
        }
    }
    let zone = "";
    if (source.zone) {
        if (typeof source.zone === "string") {
            zone = source.zone;
        }
        else {
            zone = source.zone.get() + "";
        }
    }
    if (zone === "") {
        zone = "UTC";
    }
    ////////////////////////
    let zoned = undefined;
    if (date !== "" && time !== "") {
        if (date === "00000000" && time === "000000") {
            (_a = target.stamp) === null || _a === void 0 ? void 0 : _a.clear();
            return;
        }
        const pt = temporal_polyfill_1.Temporal.PlainTime.from(time.substring(0, 2) + ":" + time.substring(2, 4) + ":" + time.substring(4, 6));
        zoned = temporal_polyfill_1.Temporal.PlainDate.from(date).toZonedDateTime({ timeZone: zone, plainTime: pt });
        zoned = zoned.withTimeZone("UTC");
    }
    else {
        if (stamp === "0") {
            (_b = target.date) === null || _b === void 0 ? void 0 : _b.clear();
            (_c = target.time) === null || _c === void 0 ? void 0 : _c.clear();
            return;
        }
        const pt = temporal_polyfill_1.Temporal.PlainTime.from(stamp.substring(8, 10) + ":" + stamp.substring(10, 12) + ":" + stamp.substring(12, 14));
        zoned = temporal_polyfill_1.Temporal.PlainDate.from(stamp.substring(0, 8)).toZonedDateTime({ timeZone: "UTC", plainTime: pt });
    }
    const d = zoned.toPlainDate().toString().replace(/-/g, "");
    const t = zoned.toPlainTime().toString().replace(/:/g, "");
    if (target.stamp) {
        target.stamp.set(d + t);
    }
    if (target.date) {
        target.date.set(d);
    }
    if (target.time) {
        target.time.set(t);
    }
}
exports.convert = convert;

},{"temporal-polyfill":149}],97:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createData = void 0;
const clone_1 = require("../clone");
const types_1 = require("../types");
function throwGlobalException(name) {
    // @ts-ignore
    if (abap.Classes[name] !== undefined) {
        // @ts-ignore
        throw new abap.Classes[name]();
    }
    else {
        throw `Global class ${name} not found`;
    }
}
function createData(target, options) {
    //  console.dir(options);
    if ((options === null || options === void 0 ? void 0 : options.name) && (options === null || options === void 0 ? void 0 : options.table)) {
        // @ts-ignore
        if (abap.DDIC[options.name] === undefined) {
            throwGlobalException("CX_SY_CREATE_DATA_ERROR");
        }
        // @ts-ignore
        target.assign(new abap.types.Table(abap.DDIC[options.name].type));
    }
    else if (options === null || options === void 0 ? void 0 : options.name) {
        // @ts-ignore
        if (abap.DDIC[options.name] === undefined) {
            throwGlobalException("CX_SY_CREATE_DATA_ERROR");
        }
        // @ts-ignore
        target.assign((0, clone_1.clone)(abap.DDIC[options.name].type));
    }
    else if (options === null || options === void 0 ? void 0 : options.typeName) {
        switch (options.typeName) {
            case "C":
                {
                    let length = 1;
                    if (options.length) {
                        length = options.length.get();
                    }
                    target.assign(new types_1.Character({ length: length }));
                }
                break;
            case "X":
                {
                    let length = 1;
                    if (options.length) {
                        length = options.length.get();
                    }
                    target.assign(new types_1.Hex({ length: length }));
                }
                break;
            case "P":
                {
                    let length = 1;
                    if (options.length) {
                        length = options.length.get();
                    }
                    target.assign(new types_1.Packed({ length: length }));
                }
                break;
            case "F":
                target.assign(new types_1.Float());
                break;
            case "D":
                target.assign(new types_1.Date());
                break;
            case "T":
                target.assign(new types_1.Time());
                break;
            case "I":
                target.assign(new types_1.Integer());
                break;
            case "STRING":
                target.assign(new types_1.String());
                break;
            case "XSTRING":
                target.assign(new types_1.XString());
                break;
            default:
                throw "CREATE DATA, unknown type " + options.typeName;
        }
    }
    else if (options === null || options === void 0 ? void 0 : options.type) {
        target.assign((0, clone_1.clone)(options.type));
    }
    else if (options === null || options === void 0 ? void 0 : options.likeLineOf) {
        if (options.likeLineOf instanceof types_1.FieldSymbol) {
            options.likeLineOf = options.likeLineOf.getPointer();
        }
        target.assign((0, clone_1.clone)(options.likeLineOf.getRowType()));
    }
    else if (options === null || options === void 0 ? void 0 : options.like) {
        if (options.like instanceof types_1.FieldSymbol) {
            options.like = options.like.getPointer();
        }
        target.assign((0, clone_1.clone)(options.like));
    }
    else {
        target.assign((0, clone_1.clone)(target.getType()));
    }
}
exports.createData = createData;

},{"../clone":45,"../types":136}],98:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteDatabase = void 0;
const types_1 = require("../types");
class DeleteDatabase {
    constructor(context) {
        this.context = context;
    }
    async deleteDatabase(table, options) {
        if (options.table instanceof types_1.FieldSymbol) {
            options.table = options.table.getPointer();
        }
        if (options.from instanceof types_1.FieldSymbol) {
            options.from = options.from.getPointer();
        }
        if (typeof table !== "string") {
            table = table.get();
        }
        if (options.table) {
            for (const row of options.table.array()) {
                this.deleteDatabase(table, { from: row });
            }
        }
        else if (options.from) {
            let where = [];
            const structure = options.from.get();
            for (const k of Object.keys(structure)) {
                // todo, integers should not be surrounded by '"'?
                const str = k + ' = "' + structure[k].get() + '"';
                where.push(str);
            }
            where = where.join(" AND ");
            const { subrc, dbcnt } = await this.context.defaultDB().delete({ table, where });
            // @ts-ignore
            abap.builtin.sy.get().subrc.set(subrc);
            // @ts-ignore
            abap.builtin.sy.get().dbcnt.set(dbcnt);
        }
        else {
            throw "deleteDatabase todo";
        }
    }
}
exports.DeleteDatabase = DeleteDatabase;

},{"../types":136}],99:[function(require,module,exports){
"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInternal = void 0;
const types_1 = require("../types");
const compare_1 = require("../compare");
const loop_1 = require("./loop");
async function deleteInternal(target, options) {
    var e_1, _a;
    let prev = undefined;
    let index = 0;
    if (target instanceof types_1.FieldSymbol) {
        target = target.getPointer();
        if (target === undefined) {
            throw "FS not assigned";
        }
    }
    if ((options === null || options === void 0 ? void 0 : options.index)
        && (options === null || options === void 0 ? void 0 : options.where) === undefined
        && (options === null || options === void 0 ? void 0 : options.adjacent) === undefined
        && (options === null || options === void 0 ? void 0 : options.fromValue) === undefined
        && (options === null || options === void 0 ? void 0 : options.from) === undefined
        && (options === null || options === void 0 ? void 0 : options.to) === undefined) {
        if (target.array()[options.index.get() - 1] === undefined) {
            // @ts-ignore
            abap.builtin.sy.get().subrc.set(4);
            return;
        }
        else {
            target.deleteIndex(options.index.get() - 1);
            // @ts-ignore
            abap.builtin.sy.get().subrc.set(0);
            return;
        }
    }
    try {
        for (var _b = __asyncValues((0, loop_1.loop)(target)), _c; _c = await _b.next(), !_c.done;) {
            const i = _c.value;
            // @ts-ignore
            index = abap.builtin.sy.get().tabix.get() - 1;
            if (options === null || options === void 0 ? void 0 : options.where) {
                const row = i instanceof types_1.Structure ? i.get() : { table_line: i };
                if (options.where(row) === true) {
                    target.deleteIndex(index);
                }
            }
            else if ((options === null || options === void 0 ? void 0 : options.adjacent) === true && prev !== undefined) {
                if (options === null || options === void 0 ? void 0 : options.comparing) {
                    let match = false;
                    for (const compareField of options.comparing) {
                        match = (0, compare_1.eq)(prev.get()[compareField], i.get()[compareField]);
                        if (!match) {
                            break;
                        }
                    }
                    if (match) {
                        target.deleteIndex(index);
                    }
                }
                else if ((0, compare_1.eq)(prev, i) === true) {
                    target.deleteIndex(index);
                }
            }
            else if ((options === null || options === void 0 ? void 0 : options.index) && options.index.get() === index) {
                target.deleteIndex(options.index.get() - 1);
            }
            else if ((options === null || options === void 0 ? void 0 : options.fromValue) && (0, compare_1.eq)(options.fromValue, i)) {
                target.deleteIndex(index);
            }
            else if ((options === null || options === void 0 ? void 0 : options.from) && options.from.get() <= index + 1) {
                target.deleteIndex(index);
            }
            else if ((options === null || options === void 0 ? void 0 : options.to) && options.to.get() <= index + 1) {
                target.deleteIndex(0);
            }
            prev = i;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
exports.deleteInternal = deleteInternal;

},{"../compare":57,"../types":136,"./loop":109}],100:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.describe = void 0;
const types_1 = require("../types");
function describe(input) {
    //  console.dir(input);
    if (input.type) {
        if (input.field instanceof types_1.FieldSymbol) {
            describe({ field: input.field.getPointer(), type: input.type, length: input.length, mode: input.mode });
            return;
        }
        if (input.field instanceof types_1.Table) {
            input.type.set("h");
        }
        else if (input.field instanceof types_1.Character || typeof input.field === "string") {
            input.type.set("C");
        }
        else if (input.field instanceof types_1.Integer) {
            input.type.set("I");
        }
        else if (input.field instanceof types_1.Date) {
            input.type.set("D");
        }
        else if (input.field instanceof types_1.Time) {
            input.type.set("T");
        }
        else if (input.field instanceof types_1.Float) {
            input.type.set("F");
        }
        else if (input.field instanceof types_1.Numc) {
            input.type.set("N");
        }
        else if (input.field instanceof types_1.Hex) {
            input.type.set("X");
        }
        else if (input.field instanceof types_1.Packed) {
            input.type.set("P");
        }
        else if (input.field instanceof types_1.String) {
            input.type.set("g");
        }
        else if (input.field instanceof types_1.XString) {
            input.type.set("y");
        }
        else if (input.field instanceof types_1.DecFloat34) {
            input.type.set("e");
        }
        else if (input.field instanceof types_1.Structure) {
            input.type.set("u");
        }
        else if (input.field instanceof types_1.ABAPObject) {
            input.type.set("r");
        }
        else if (input.field instanceof types_1.DataReference) {
            input.type.set("l");
        }
        else {
            throw new Error("DESCRIBE, todo, transpiler, " + input.field.constructor.name);
        }
    }
    if (input.length) {
        if (input.field instanceof types_1.FieldSymbol) {
            input.field = input.field.getPointer();
        }
        if (input.field instanceof types_1.Character
            || input.field instanceof types_1.Hex) {
            input.length.set(input.field.getLength());
        }
        else {
            throw "DESCRIBE, unsupported or todo";
        }
    }
    if (input.table && input.lines) {
        input.lines.set(input.table.array().length);
    }
}
exports.describe = describe;

},{"../types":136}],101:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.find = void 0;
const types_1 = require("../types");
function find(input, options) {
    var _a, _b, _c, _d, _e, _f, _g;
    let sectionOffset = (_a = options.sectionOffset) === null || _a === void 0 ? void 0 : _a.get();
    if (sectionOffset && options.byteMode) {
        sectionOffset = sectionOffset * 2;
    }
    let s = "";
    if (options.find) {
        s = options.find;
        if (typeof s !== "string") {
            s = s.get();
        }
        if (s === "") {
            // @ts-ignore
            abap.builtin.sy.get().subrc.set(0);
            return;
        }
        s = s.replace(/\[/g, "\\[");
        s = s.replace(/\]/g, "\\]");
        s = s.replace(/\?/g, "\\?");
        s = s.replace(/\(/g, "\\(");
        s = s.replace(/\)/g, "\\)");
        s = s.replace(/\./g, "\\.");
        s = s.replace(/\|/g, "\\|");
        s = s.replace(/\*/g, "\\*");
        s = s.replace(/\+/g, "\\+");
        s = new RegExp(s, "g");
    }
    else if (options.regex) {
        if (options.regex === "") {
            throw "FIND, runtime, no input, regex empty";
        }
        let r = options.regex;
        if (typeof r !== "string") {
            r = r.get();
        }
        // check type, it can also be a CL_ABAP_REGEX
        if (typeof r === "string") {
            r = r.replace("[[:space:]]", "\\s");
        }
        s = new RegExp(r, "g" + (options.ignoringCase === true ? "i" : ""));
    }
    else {
        throw "FIND, runtime, no input";
    }
    const matches = [];
    if (input instanceof types_1.Table) {
        let line = 1;
        for (const blah of input.array()) {
            let temp;
            // eslint-disable-next-line no-cond-assign
            while (temp = s.exec(blah.get())) {
                matches.push(Object.assign(Object.assign({}, temp), { line }));
                if (options.first === true) {
                    break;
                }
            }
            line++;
        }
    }
    else {
        let blah = input.get();
        if (sectionOffset) {
            blah = blah.substr(sectionOffset);
        }
        let temp;
        // eslint-disable-next-line no-cond-assign
        while (temp = s.exec(blah)) {
            matches.push(temp);
            if (options.first === true) {
                break;
            }
        }
    }
    if (options.submatches) {
        for (let index = 0; index < options.submatches.length; index++) {
            if (matches[0] && matches[0][index + 1]) {
                options.submatches[index].set(matches[0][index + 1]);
            }
            else if (matches.length > 0) {
                options.submatches[index].clear();
            }
        }
    }
    if (options.results) {
        // assumption, results is a table with the correct type
        options.results.clear();
        for (const m of matches) {
            const match = new types_1.Structure({
                line: new types_1.Integer(),
                offset: new types_1.Integer(),
                length: new types_1.Integer(),
                submatches: new types_1.Table(new types_1.Structure({ offset: new types_1.Integer(), length: new types_1.Integer() })),
            });
            match.get().line.set(m.line || 0);
            match.get().offset.set(m.index);
            match.get().length.set(m[0].length);
            const submatch = new types_1.Structure({ offset: new types_1.Integer(), length: new types_1.Integer() });
            for (let i = 1; i < m.length; i++) {
                if (m[i] === undefined) {
                    submatch.get().offset.set(-1);
                    submatch.get().length.set(0);
                }
                else {
                    submatch.get().offset.set(m.index + m[0].indexOf(m[i]));
                    submatch.get().length.set(m[i].length);
                }
                match.get().submatches.append(submatch);
            }
            if (options.results instanceof types_1.Table) {
                options.results.append(match);
            }
            else {
                options.results.set(match);
            }
            if (options.first === undefined || options.first === true) {
                break;
            }
        }
    }
    if (matches.length === 0) {
        // @ts-ignore
        abap.builtin.sy.get().subrc.set(4);
    }
    else {
        // @ts-ignore
        abap.builtin.sy.get().subrc.set(0);
    }
    if (((_b = matches[0]) === null || _b === void 0 ? void 0 : _b.index) !== undefined) {
        let val = matches[0].index;
        if (sectionOffset) {
            val += sectionOffset;
        }
        if (options.byteMode) {
            val = val / 2;
        }
        (_c = options.offset) === null || _c === void 0 ? void 0 : _c.set(val);
    }
    if (options === null || options === void 0 ? void 0 : options.count) {
        (_d = options.count) === null || _d === void 0 ? void 0 : _d.set(matches.length);
    }
    else {
        (_e = options.count) === null || _e === void 0 ? void 0 : _e.clear();
    }
    if ((options === null || options === void 0 ? void 0 : options.length) && matches && matches[0]) {
        (_f = options.length) === null || _f === void 0 ? void 0 : _f.set(matches[0][0].length);
    }
    else {
        (_g = options.length) === null || _g === void 0 ? void 0 : _g.clear();
    }
}
exports.find = find;

},{"../types":136}],102:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBit = void 0;
function getBit(number, hex, output) {
    const charIndex = Math.floor((number.get() - 1) / 8);
    const bitIndex = (number.get() - 1) % 8;
    const h = hex.get().substr(charIndex * 2, 2);
    const parsed = parseInt(h, 16).toString(2);
    const bits = parsed.padStart(8, "0");
    output.set(bits.substr(bitIndex, 1));
}
exports.getBit = getBit;

},{}],103:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocale = void 0;
function getLocale(target) {
    // todo
    target.set("E");
}
exports.getLocale = getLocale;

},{}],104:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRunTime = void 0;
let prev = undefined;
function getRunTime(value) {
    if (prev === undefined) {
        value.set(0);
        prev = new Date().getTime();
    }
    else {
        const now = new Date().getTime();
        value.set(now - prev);
        prev = now;
    }
}
exports.getRunTime = getRunTime;

},{}],105:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTime = void 0;
function getTime(options) {
    const d = new Date();
    const date = d.getUTCFullYear() +
        (d.getUTCMonth() + 1 + "").padStart(2, "0") +
        (d.getUTCDate() + "").padStart(2, "0");
    const time = (d.getUTCHours() + "").padStart(2, "0") +
        (d.getUTCMinutes() + "").padStart(2, "0") +
        (d.getUTCSeconds() + "").padStart(2, "0");
    if (options === undefined) {
        options = {};
    }
    if ((options === null || options === void 0 ? void 0 : options.sy) === undefined) {
        // @ts-ignore
        options.sy = abap.builtin.sy;
    }
    options.sy.get().datlo.set(date);
    options.sy.get().datum.set(date);
    options.sy.get().timlo.set(time);
    options.sy.get().uzeit.set(time);
    if (options === null || options === void 0 ? void 0 : options.field) {
        options.field.set(time);
    }
    if (options === null || options === void 0 ? void 0 : options.stamp) {
        options.stamp.set(date + time);
    }
}
exports.getTime = getTime;

},{}],106:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Statements = void 0;
const append_1 = require("./append");
const assert_1 = require("./assert");
const assign_1 = require("./assign");
const clear_1 = require("./clear");
const commit_1 = require("./commit");
const concatenate_1 = require("./concatenate");
const condense_1 = require("./condense");
const convert_1 = require("./convert");
const create_data_1 = require("./create_data");
const delete_internal_1 = require("./delete_internal");
const describe_1 = require("./describe");
const find_1 = require("./find");
const cast_1 = require("./cast");
const get_bit_1 = require("./get_bit");
const get_locale_1 = require("./get_locale");
const set_locale_1 = require("./set_locale");
const get_run_time_1 = require("./get_run_time");
const get_time_1 = require("./get_time");
const insert_database_1 = require("./insert_database");
const insert_internal_1 = require("./insert_internal");
const delete_database_1 = require("./delete_database");
const loop_1 = require("./loop");
const message_1 = require("./message");
const modify_database_1 = require("./modify_database");
const modify_internal_1 = require("./modify_internal");
const move_corresponding_1 = require("./move_corresponding");
const read_table_1 = require("./read_table");
const replace_1 = require("./replace");
const rollback_1 = require("./rollback");
const select_1 = require("./select");
const set_bit_1 = require("./set_bit");
const shift_1 = require("./shift");
const sort_1 = require("./sort");
const split_1 = require("./split");
const translate_1 = require("./translate");
const update_database_1 = require("./update_database");
const write_1 = require("./write");
const call_function_1 = require("./call_function");
// this is a class, as statements like SELECT needs access to the database object instance
// and WRITE will access the Console
class Statements {
    constructor(context) {
        this.append = append_1.append;
        this.assert = assert_1.assert;
        this.assign = assign_1.assign;
        this.cast = cast_1.cast;
        this.clear = clear_1.clear;
        this.commit = commit_1.commit;
        this.concatenate = concatenate_1.concatenate;
        this.condense = condense_1.condense;
        this.convert = convert_1.convert;
        this.createData = create_data_1.createData;
        this.deleteInternal = delete_internal_1.deleteInternal;
        this.describe = describe_1.describe;
        this.find = find_1.find;
        this.getBit = get_bit_1.getBit;
        this.getLocale = get_locale_1.getLocale;
        this.getRunTime = get_run_time_1.getRunTime;
        this.getTime = get_time_1.getTime;
        this.insertInternal = insert_internal_1.insertInternal;
        this.loop = loop_1.loop;
        this.modifyInternal = modify_internal_1.modifyInternal;
        this.moveCorresponding = move_corresponding_1.moveCorresponding;
        this.readTable = read_table_1.readTable;
        this.replace = replace_1.replace;
        this.rollback = rollback_1.rollback;
        this.setBit = set_bit_1.setBit;
        this.setLocale = set_locale_1.setLocale;
        this.shift = shift_1.shift;
        this.sort = sort_1.sort;
        this.split = split_1.split;
        this.translate = translate_1.translate;
        this.context = context;
    }
    async deleteDatabase(table, options) {
        return new delete_database_1.DeleteDatabase(this.context).deleteDatabase(table, options);
    }
    async insertDatabase(table, options) {
        return new insert_database_1.InsertDatabase(this.context).insertDatabase(table, options);
    }
    async message(options) {
        return new message_1.MessageStatement(this.context).message(options);
    }
    async modifyDatabase(table, options) {
        return new modify_database_1.ModifyDatabase(this.context).modifyDatabase(table, options);
    }
    async select(target, select, runtimeOptions) {
        return new select_1.SelectDatabase(this.context).select(target, select, runtimeOptions);
    }
    async updateDatabase(table, options) {
        return new update_database_1.UpdateDatabase(this.context).updateDatabase(table, options);
    }
    async callFunction(options) {
        return new call_function_1.CallFunction(this.context).callFunction(options);
    }
    write(source, options) {
        return new write_1.WriteStatement(this.context).write(source, options);
    }
}
exports.Statements = Statements;

},{"./append":87,"./assert":88,"./assign":89,"./call_function":90,"./cast":91,"./clear":92,"./commit":93,"./concatenate":94,"./condense":95,"./convert":96,"./create_data":97,"./delete_database":98,"./delete_internal":99,"./describe":100,"./find":101,"./get_bit":102,"./get_locale":103,"./get_run_time":104,"./get_time":105,"./insert_database":107,"./insert_internal":108,"./loop":109,"./message":110,"./modify_database":111,"./modify_internal":112,"./move_corresponding":113,"./read_table":114,"./replace":115,"./rollback":116,"./select":117,"./set_bit":118,"./set_locale":119,"./shift":120,"./sort":121,"./split":122,"./translate":123,"./update_database":124,"./write":125}],107:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertDatabase = void 0;
class InsertDatabase {
    constructor(context) {
        this.context = context;
    }
    async insertDatabase(table, options) {
        const columns = [];
        const values = [];
        const structure = options.values.get();
        for (const k of Object.keys(structure)) {
            columns.push(k);
            // todo, integers should not be surrounded by '"'?
            values.push('"' + structure[k].get().replace(/"/g, "\"\"") + '"');
        }
        if (typeof table !== "string") {
            table = table.get();
        }
        const { subrc, dbcnt } = await this.context.defaultDB().insert({ table, columns, values });
        // @ts-ignore
        abap.builtin.sy.get().subrc.set(subrc);
        // @ts-ignore
        abap.builtin.sy.get().dbcnt.set(dbcnt);
        return subrc;
    }
}
exports.InsertDatabase = InsertDatabase;

},{}],108:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertInternal = void 0;
const clone_1 = require("../clone");
const compare_1 = require("../compare");
const types_1 = require("../types");
const read_table_1 = require("./read_table");
const sort_1 = require("./sort");
function insertInternal(options) {
    var _a;
    if (options.table instanceof types_1.FieldSymbol) {
        options.table = options.table.getPointer();
    }
    const tableOptions = options.table.getOptions();
    const isSorted = (tableOptions === null || tableOptions === void 0 ? void 0 : tableOptions.type) === types_1.TableAccessType.sorted || (tableOptions === null || tableOptions === void 0 ? void 0 : tableOptions.type) === types_1.TableAccessType.hashed;
    if (isSorted) {
        const insert = options.data instanceof types_1.Structure ? options.data.get() : { table_line: options.data };
        const compare = (row) => {
            for (const key of (tableOptions === null || tableOptions === void 0 ? void 0 : tableOptions.keyFields) || []) {
                if ((0, compare_1.ne)(row[key.toLowerCase()], insert[key.toLowerCase()])) {
                    return false;
                }
            }
            return true;
        };
        if (tableOptions.isUnique === true) {
            (0, read_table_1.readTable)(options.table, { withKey: compare });
            // @ts-ignore
            if (abap.builtin.sy.get().subrc.get() === 0) {
                // @ts-ignore
                abap.builtin.sy.get().subrc.set(4);
                return;
            }
        }
    }
    let data = options.data;
    if (typeof data === "string") {
        const tmp = (0, clone_1.clone)(options.table.getRowType());
        tmp.set(data);
        data = tmp;
    }
    if (data && options.index) {
        const index = options.index.get() - 1;
        const val = options.table.insertIndex(data, index);
        if (options.assigning) {
            options.assigning.assign(val);
        }
    }
    else if (options.lines && options.data instanceof types_1.Table) {
        for (const i of options.data.array()) {
            options.table.append(i);
        }
    }
    else if (options.initial === true) {
        let index = options.table.array().length;
        if (options.index) {
            index = options.index.get() - 1;
        }
        const val = options.table.insertIndex(options.table.getRowType(), index);
        if (options.assigning) {
            options.assigning.assign(val);
        }
    }
    else if (data) {
        // todo, for now it just appends, this is not correct, but currently the table type is not known
        const val = options.table.insertIndex(data, options.table.array().length);
        if (options.assigning) {
            options.assigning.assign(val);
        }
        if (options.referenceInto) {
            options.referenceInto.assign(val);
        }
    }
    // @ts-ignore
    abap.builtin.sy.get().subrc.set(0);
    if (isSorted) {
        // slow, but works for now
        const by = (_a = tableOptions === null || tableOptions === void 0 ? void 0 : tableOptions.keyFields) === null || _a === void 0 ? void 0 : _a.map(f => { return { component: f.toLowerCase() }; });
        (0, sort_1.sort)(options.table, { by: by });
    }
}
exports.insertInternal = insertInternal;

},{"../clone":45,"../compare":57,"../types":136,"./read_table":114,"./sort":121}],109:[function(require,module,exports){
"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
};
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loop = void 0;
const types_1 = require("../types");
function loop(table, options) {
    return __asyncGenerator(this, arguments, function* loop_1() {
        if (table === undefined) {
            throw new Error("LOOP at undefined");
        }
        else if (table instanceof types_1.FieldSymbol) {
            // @ts-ignore
            yield __await(yield* __asyncDelegator(__asyncValues(loop(table.getPointer(), options))));
            return yield __await(void 0);
        }
        const length = table.array().length;
        if (length === 0) {
            // @ts-ignore
            abap.builtin.sy.get().subrc.set(4);
            return yield __await(void 0);
        }
        const loopFrom = (options === null || options === void 0 ? void 0 : options.from) && (options === null || options === void 0 ? void 0 : options.from.get()) > 0 ? options.from.get() - 1 : 0;
        let loopTo = (options === null || options === void 0 ? void 0 : options.to) && options.to.get() < length ? options.to.get() : length;
        const loopIndex = table.startLoop(loopFrom);
        let entered = false;
        try {
            const array = table.array();
            const isStructured = array[0] instanceof types_1.Structure;
            while (loopIndex.index < loopTo) {
                if (loopIndex.index > array.length) {
                    break;
                }
                const current = array[loopIndex.index];
                if (options === null || options === void 0 ? void 0 : options.where) {
                    const row = isStructured ? current.get() : { table_line: current };
                    if ((yield __await(options.where(row))) === false) {
                        loopIndex.index++;
                        continue;
                    }
                }
                // @ts-ignore
                abap.builtin.sy.get().tabix.set(loopIndex.index + 1);
                entered = true;
                yield yield __await(current);
                loopIndex.index++;
                loopTo = (options === null || options === void 0 ? void 0 : options.to) && options.to.get() < array.length ? options.to.get() : array.length;
            }
        }
        finally {
            table.unregisterLoop(loopIndex);
            // @ts-ignore
            abap.builtin.sy.get().subrc.set(entered ? 0 : 4);
        }
    });
}
exports.loop = loop;

},{"../types":136}],110:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageStatement = void 0;
function replace(text, w) {
    for (let i = 0; i < 6; i++) {
        const search = "&" + (i + 1);
        let replace = "";
        if (w && w[i]) {
            const j = w[i];
            if (typeof j === "string") {
                replace = j;
            }
            else {
                replace = j.get();
            }
        }
        const field = "msgv" + (i + 1);
        if (i <= 3) {
            // @ts-ignore
            abap.builtin.sy.get()[field].set(replace);
        }
        text = text.replace(search, replace);
    }
    return text.trim();
}
async function findText(context, arbgb, msgnr, msgty) {
    let text = undefined;
    if (arbgb && msgnr) {
        try {
            // todo, sql injection?
            const select = `SELECT * FROM t100 WHERE sprsl='E' AND arbgb='${arbgb}' AND msgnr='${msgnr}' LIMIT 1`;
            const { rows: result } = await context.defaultDB().select({ select });
            if (result[0]) {
                text = result[0]["text"];
            }
        }
        catch (_a) {
            // use fallback text
        }
    }
    if (text === undefined) {
        // fallback
        text = msgty + ":" + arbgb + ":" + msgnr + " &1 &2 &3 &4";
    }
    return text;
}
class MessageStatement {
    constructor(context) {
        this.context = context;
    }
    async message(options) {
        let arbgb = options.id;
        if (arbgb !== undefined && typeof arbgb !== "string") {
            arbgb = arbgb.get();
        }
        arbgb = arbgb === null || arbgb === void 0 ? void 0 : arbgb.toUpperCase();
        let msgty = options.type;
        if (msgty !== undefined && typeof msgty !== "string") {
            msgty = msgty.get();
        }
        msgty = msgty === null || msgty === void 0 ? void 0 : msgty.toUpperCase();
        // @ts-ignore
        abap.builtin.sy.get().msgid.set(arbgb);
        let msgnr = options.number;
        if (msgnr !== undefined && typeof msgnr !== "string") {
            msgnr = msgnr.get();
        }
        // @ts-ignore
        abap.builtin.sy.get().msgno.set(msgnr);
        // @ts-ignore
        abap.builtin.sy.get().msgty.set(msgty);
        const text = await findText(this.context, arbgb, msgnr, msgty);
        const replaced = replace(text, options.with);
        if (options.into) {
            options.into.set(replaced);
        }
    }
}
exports.MessageStatement = MessageStatement;

},{}],111:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifyDatabase = void 0;
const types_1 = require("../types");
const insert_database_1 = require("./insert_database");
const update_database_1 = require("./update_database");
class ModifyDatabase {
    constructor(context) {
        this.context = context;
    }
    async modifyDatabase(table, options) {
        if (options.table instanceof types_1.FieldSymbol) {
            options.table = options.table.getPointer();
        }
        if (options.from instanceof types_1.FieldSymbol) {
            options.from = options.from.getPointer();
        }
        const insert = new insert_database_1.InsertDatabase(this.context);
        const update = new update_database_1.UpdateDatabase(this.context);
        if (options.table) {
            for (const row of options.table.array()) {
                const subrc = await insert.insertDatabase(table, { values: row });
                if (subrc !== 0) {
                    await update.updateDatabase(table, { from: row });
                }
            }
        }
        else if (options.from) {
            const subrc = await insert.insertDatabase(table, { values: options.from });
            if (subrc !== 0) {
                await update.updateDatabase(table, { from: options.from });
            }
        }
        else {
            throw "modifyDatabase todo";
        }
    }
}
exports.ModifyDatabase = ModifyDatabase;

},{"../types":136,"./insert_database":107,"./update_database":124}],112:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyInternal = void 0;
const types_1 = require("../types");
const delete_internal_1 = require("./delete_internal");
const insert_internal_1 = require("./insert_internal");
const read_table_1 = require("./read_table");
function modifyInternal(table, options) {
    let found = false;
    if (options.index) {
        const index = options.index.get() - 1;
        found = table.array()[index] !== undefined;
        if (found) {
            table.deleteIndex(index);
            table.insertIndex(options.from, index);
        }
    }
    else if (options.from) {
        const readResult = (0, read_table_1.readTable)(table, { from: options.from });
        if (readResult.subrc === 0) {
            (0, delete_internal_1.deleteInternal)(table, { index: new types_1.Integer().set(readResult.foundIndex) });
        }
        (0, insert_internal_1.insertInternal)({ table, data: options.from });
    }
    const subrc = found ? 0 : 4;
    // @ts-ignore
    abap.builtin.sy.get().subrc.set(subrc);
}
exports.modifyInternal = modifyInternal;

},{"../types":136,"./delete_internal":99,"./insert_internal":108,"./read_table":114}],113:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveCorresponding = void 0;
function moveCorresponding(source, target) {
    var _a;
    for (const n in source.get()) {
        (_a = target.get()[n]) === null || _a === void 0 ? void 0 : _a.set(source.get()[n]);
    }
}
exports.moveCorresponding = moveCorresponding;

},{}],114:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readTable = void 0;
const compare_1 = require("../compare");
const types_1 = require("../types");
function readTable(table, options) {
    var _a;
    let found = undefined;
    let foundIndex = 0;
    const arr = table.array();
    if (options === null || options === void 0 ? void 0 : options.index) {
        let index = options.index;
        if (typeof index !== "number") {
            index = index.get();
        }
        found = arr[index - 1];
        if (found) {
            foundIndex = index;
        }
    }
    else if (options === null || options === void 0 ? void 0 : options.withKey) {
        const isStructured = arr[0] instanceof types_1.Structure;
        for (const a of arr) {
            foundIndex++;
            const row = isStructured ? Object.assign({ table_line: a }, a.get()) : { table_line: a };
            if (options.withKey(row) === true) {
                found = a;
                break;
            }
        }
        if (found === undefined) {
            foundIndex = 0;
        }
    }
    else if (options === null || options === void 0 ? void 0 : options.from) {
        if (table instanceof types_1.Table && options.from instanceof types_1.Structure) {
            const keys = (_a = table.getOptions()) === null || _a === void 0 ? void 0 : _a.keyFields;
            const isStructured = arr[0] instanceof types_1.Structure;
            if (keys !== undefined && isStructured === true) {
                //        console.dir(keys);
                //        console.dir(options.from.get()[keys[0].toLowerCase()]);
                for (const a of arr) {
                    foundIndex++;
                    let matches = true;
                    for (const k of keys) {
                        if ((0, compare_1.eq)(a.get()[k.toLowerCase()], options.from.get()[k.toLowerCase()]) === false) {
                            matches = false;
                            break;
                        }
                    }
                    if (matches === true) {
                        found = arr;
                        break;
                    }
                }
            }
        }
        if (found === undefined) {
            foundIndex = 0;
        }
    }
    else {
        throw new Error("runtime, readTable, unexpected input");
    }
    let subrc = found ? 0 : 4;
    if ((options === null || options === void 0 ? void 0 : options.from) && subrc === 4) {
        subrc = 8;
    }
    // @ts-ignore
    abap.builtin.sy.get().subrc.set(subrc);
    // @ts-ignore
    abap.builtin.sy.get().tabix.set(foundIndex);
    if (options.into && found) {
        if (options.into instanceof types_1.DataReference && found instanceof types_1.DataReference) {
            options.into.assign(found.getPointer());
        }
        else if (options.into instanceof types_1.DataReference) {
            options.into.assign(found);
        }
        else {
            options.into.set(found);
        }
    }
    else if (options.referenceInto && found) {
        options.referenceInto.assign(found);
    }
    else if (options.assigning && found) {
        options.assigning.assign(found);
    }
    return { subrc, foundIndex };
}
exports.readTable = readTable;

},{"../compare":57,"../types":136}],115:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replace = void 0;
function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
function replace(input) {
    let temp = input.target.get();
    const ignoreCase = input.ignoringCase === true ? "i" : "";
    const allOccurrences = input.all === true ? "g" : "";
    let search = undefined;
    let found = false;
    if (input.of) {
        let inp = input.of.get();
        if (inp.length === 0 && input.all === true) {
            throw "REPLACE, zero length input";
        }
        found = temp.indexOf(inp) >= 0;
        inp = escapeRegExp(inp);
        search = new RegExp(inp, ignoreCase + allOccurrences);
    }
    else if (input.regex) {
        if (input.regex.get().length === 0 && input.all === true) {
            throw "REPLACE, zero length input";
        }
        found = temp.match(input.regex.get()) !== null;
        search = new RegExp(input.regex.get(), ignoreCase + allOccurrences);
    }
    else {
        throw "REPLACE, unexpected input";
    }
    let replace = "";
    if (typeof input.with === "string") {
        replace = input.with;
    }
    else {
        replace = input.with.get();
        replace = replace.replace(/\\\$/g, "$");
        replace = replace.replace(/\\\{/g, "{");
        replace = replace.replace(/\\\}/g, "}");
    }
    temp = temp.replace(search, replace);
    const subrc = found ? 0 : 4;
    // @ts-ignore
    abap.builtin.sy.get().subrc.set(subrc);
    input.target.set(temp);
}
exports.replace = replace;

},{}],116:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rollback = void 0;
function rollback() {
    // todo
}
exports.rollback = rollback;

},{}],117:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectDatabase = void 0;
const clone_1 = require("../clone");
const types_1 = require("../types");
class SelectDatabase {
    constructor(context) {
        this.context = context;
    }
    async select(target, input, runtimeOptions) {
        var _a;
        const { rows: rows } = await this.context.defaultDB().select(input);
        if (target instanceof types_1.FieldSymbol) {
            if (target.isAssigned() === false) {
                throw "select, fs not assigned";
            }
            // @ts-ignore
            target = target.getPointer();
        }
        if ((runtimeOptions === null || runtimeOptions === void 0 ? void 0 : runtimeOptions.appending) !== true) {
            target === null || target === void 0 ? void 0 : target.clear();
        }
        if (rows.length === 0) {
            // @ts-ignore
            abap.builtin.sy.get().subrc.set(4);
            return;
        }
        if (target instanceof types_1.Structure) {
            const result = {};
            for (const column in rows[0]) {
                result[column] = (0, clone_1.clone)(target.get()[column]).set(rows[0][column]);
            }
            target.set(new types_1.Structure(result));
        }
        else if (target instanceof types_1.Table) {
            for (const row of rows) {
                const targetRow = (0, clone_1.clone)(target.getRowType());
                for (let columnName in row) {
                    columnName = columnName.toLowerCase();
                    // todo, non structured table = table with simple rows
                    // @ts-ignore
                    (_a = targetRow.get()[columnName]) === null || _a === void 0 ? void 0 : _a.set(row[columnName]);
                }
                // @ts-ignore
                abap.statements.insertInternal({ table: target, data: targetRow });
            }
        }
        else if (target !== undefined) {
            throw new Error("Runtime, SELECT todo");
        }
        if (target === undefined && rows.length === 1) {
            // @ts-ignore
            abap.builtin.sy.get().dbcnt.set(Object.values(rows[0])[0]);
        }
        else {
            // @ts-ignore
            abap.builtin.sy.get().dbcnt.set(rows.length);
        }
        // @ts-ignore
        abap.builtin.sy.get().subrc.set(0);
    }
}
exports.SelectDatabase = SelectDatabase;

},{"../clone":45,"../types":136}],118:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBit = void 0;
function setBit(number, hex, val) {
    let hexFull = hex.get();
    if (hexFull === "") {
        hexFull = "00";
    }
    const fullByteLength = Math.ceil(hexFull.length / 2);
    hexFull = hexFull.padEnd(fullByteLength * 2, "0");
    const byteNum = Math.ceil(number.get() / 8);
    if (byteNum > fullByteLength) {
        return;
    }
    let pre = "";
    let byte = "";
    let post = "";
    if (hexFull.length > 2) {
        if (byteNum > 1) {
            pre = hexFull.substr(0, (byteNum - 1) * 2);
        }
        byte = hexFull.substr((byteNum - 1) * 2, 2);
        if (fullByteLength > byteNum) {
            post = hexFull.substr(byteNum * 2, (fullByteLength - byteNum) * 2);
        }
    }
    else {
        byte = hexFull;
    }
    let bits = parseInt(byte, 16);
    const bitMask = 1 << 8 - (number.get() - (byteNum - 1) * 8);
    if ((val === null || val === void 0 ? void 0 : val.get()) === 0 || (val === null || val === void 0 ? void 0 : val.get()) === "0") {
        bits = bits &= ~bitMask;
    }
    else {
        bits = bits |= bitMask;
    }
    const reconstructed = pre + bits.toString(16).toUpperCase().padStart(2, "0") + post;
    hex.set(reconstructed);
}
exports.setBit = setBit;

},{}],119:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLocale = void 0;
function setLocale(_source) {
    // todo
}
exports.setLocale = setLocale;

},{}],120:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shift = void 0;
const compare_1 = require("../compare");
function shift(target, options) {
    if ((options === null || options === void 0 ? void 0 : options.mode) === "BYTE") {
        shift_byte_mode(target, options);
    }
    else {
        shift_character_mode(target, options);
    }
}
exports.shift = shift;
function shift_character_mode(target, options) {
    let value = target.get();
    if (options === null || options === void 0 ? void 0 : options.deletingLeading) {
        let leading = options.deletingLeading;
        if (typeof leading !== "string") {
            leading = leading.get();
        }
        const split = leading.split("");
        while (split.some(s => value.substr(0, 1) === s)) {
            value = value.substr(1);
        }
    }
    else if (options === null || options === void 0 ? void 0 : options.deletingTrailing) {
        let trailing = options.deletingTrailing;
        if (typeof trailing !== "string") {
            trailing = trailing.get();
        }
        if ((0, compare_1.co)(value, " ") === false) {
            while (value.endsWith(trailing)) {
                value = " ".repeat(trailing.length) + value.substring(0, value.length - trailing.length);
            }
        }
    }
    else if (options === null || options === void 0 ? void 0 : options.places) {
        const p = options.places.get();
        if (options.circular) {
            value = value.substr(p) + value.substr(0, p);
        }
        else {
            value = value.substr(p);
        }
    }
    else if (options === null || options === void 0 ? void 0 : options.to) {
        let to = "";
        if (typeof options.to === "string") {
            to = options.to;
        }
        else {
            to = options.to.get();
        }
        const index = value.search(to);
        if (index > 0) {
            value = value.substr(index);
        }
    }
    else if (options === null || options === void 0 ? void 0 : options.circular) {
        value = value.substr(1) + value.substr(0, 1);
    }
    else {
        value = value.substr(1);
    }
    target.set(value);
}
function shift_byte_mode(target, options) {
    let value = target.get();
    if (options === null || options === void 0 ? void 0 : options.deletingLeading) {
        let leading = options.deletingLeading;
        if (typeof leading !== "string") {
            leading = leading.get();
        }
        const split = leading.split("");
        while (split.some(s => value.substr(0, 2) === s)) {
            value = value.substr(2);
        }
    }
    else if (options === null || options === void 0 ? void 0 : options.places) {
        const p = options.places.get() * 2;
        if (options.circular) {
            value = value.substr(p) + value.substr(0, p);
        }
        else {
            value = value.substr(p);
        }
    }
    else if (options === null || options === void 0 ? void 0 : options.to) {
        let to = "";
        if (typeof options.to === "string") {
            to = options.to;
        }
        else {
            to = options.to.get();
        }
        const index = value.search(to);
        if (index > 0) {
            value = value.substr(index);
        }
    }
    else if (options === null || options === void 0 ? void 0 : options.circular) {
        value = value.substr(2) + value.substr(0, 2);
    }
    else {
        value = value.substr(2);
    }
    target.set(value);
}

},{"../compare":57}],121:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sort = void 0;
const compare_1 = require("../compare");
function compare(a, b, input) {
    const componentName = input.component;
    const descending = input.descending;
    let vala = a.get()[componentName];
    let valb = b.get()[componentName];
    if (componentName.toLowerCase() === "table_line") {
        vala = a.get();
        valb = b.get();
    }
    if ((0, compare_1.eq)(vala, valb)) {
        return 0;
    }
    else if (descending && (0, compare_1.gt)(vala, valb)) {
        return -1;
    }
    else if (!descending && (0, compare_1.lt)(vala, valb)) {
        return -1;
    }
    else {
        return 1;
    }
}
function sort(input, options) {
    if (options === null || options === void 0 ? void 0 : options.by) {
        if (options.by.length === 0) {
            throw "SortByLengthZero";
        }
        input.sort((a, b) => {
            for (const c of options.by || []) {
                const res = compare(a, b, c);
                if (res !== 0) {
                    return res;
                }
            }
            return 0;
        });
    }
    else {
        const descending = (options === null || options === void 0 ? void 0 : options.descending) === true ? true : false;
        input.sort((a, b) => {
            if ((0, compare_1.eq)(a, b)) {
                return 0;
            }
            else if (descending && (0, compare_1.gt)(a, b)) {
                return -1;
            }
            else if (!descending && (0, compare_1.lt)(a, b)) {
                return -1;
            }
            else {
                return 1;
            }
        });
    }
}
exports.sort = sort;

},{"../compare":57}],122:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.split = void 0;
const types_1 = require("../types");
function split(param) {
    const source = typeof param.source === "string" ? param.source : param.source.get();
    const at = typeof param.at === "string" ? param.at : param.at.get();
    const split = source.includes(at) ? source.split(at) : [];
    if (source.endsWith(at)) {
        split.pop();
    }
    if (param.table) {
        param.table.clear();
        for (const s of split) {
            param.table.append(new types_1.String().set(s));
        }
        if (source !== "" && split.length === 0) {
            param.table.append(new types_1.String().set(source));
        }
    }
    if (param.targets) {
        if (split.length === 0) {
            split.push(source);
        }
        for (const t of param.targets) {
            t.clear();
            if (split.length > 0) {
                t.set(split.shift().trimEnd());
            }
        }
        if (split.length > 0) {
            const concat = split.join(at);
            const last = param.targets[param.targets.length - 1];
            last.set(last.get() + at + concat);
        }
    }
}
exports.split = split;

},{"../types":136}],123:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = void 0;
function translate(input, i) {
    let c = i;
    if (typeof c !== "string") {
        c = c.get();
    }
    if (c === "LOWER") {
        input.set(input.get().toLowerCase());
    }
    else if (c === "UPPER") {
        input.set(input.get().toUpperCase());
    }
    else {
        const chunks = c.match(/.{1,2}/g);
        for (const chunk of chunks || []) {
            const search = chunk.substr(0, 1);
            const replace = chunk.substr(1, 1);
            input.set(input.get().replace(new RegExp(search, "g"), replace));
        }
    }
}
exports.translate = translate;

},{}],124:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDatabase = void 0;
const types_1 = require("../types");
class UpdateDatabase {
    constructor(context) {
        this.context = context;
    }
    async updateDatabase(table, options) {
        if (options.table instanceof types_1.FieldSymbol) {
            options.table = options.table.getPointer();
        }
        if (options.from instanceof types_1.FieldSymbol) {
            options.from = options.from.getPointer();
        }
        if (typeof table !== "string") {
            table = table.get();
        }
        // @ts-ignore
        const keys = abap.DDIC[table.toUpperCase()].keyFields;
        const where = [];
        const set = [];
        if (options.from) {
            const structure = options.from.get();
            for (const k of Object.keys(structure)) {
                // todo, integers should not be surrounded by '"'?
                const str = k + ' = "' + structure[k].get() + '"';
                if (keys.includes(k.toUpperCase())) {
                    where.push(str);
                }
                else {
                    set.push(str);
                }
            }
        }
        else {
            throw "updateDatabase, todo";
        }
        const { subrc, dbcnt } = await this.context.defaultDB().update({ table, where: where.join(" AND "), set });
        // @ts-ignore
        abap.builtin.sy.get().subrc.set(subrc);
        // @ts-ignore
        abap.builtin.sy.get().dbcnt.set(dbcnt);
        return subrc;
    }
}
exports.UpdateDatabase = UpdateDatabase;

},{"../types":136}],125:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriteStatement = void 0;
const types_1 = require("../types");
class WriteStatement {
    constructor(context) {
        this.context = context;
    }
    write(source, options) {
        var _a;
        if ((options === null || options === void 0 ? void 0 : options.skipLine) === true) {
            this.context.console.add("\n");
        }
        else {
            if ((options === null || options === void 0 ? void 0 : options.newLine) === true && this.context.console.get().length > 0) {
                this.context.console.add("\n");
            }
            let result = "";
            if (typeof source === "string" || typeof source === "number") {
                result = source.toString();
            }
            else if (source instanceof types_1.Structure) {
                const obj = source.get();
                for (const f in obj) {
                    this.write(obj[f], Object.assign({}, options));
                }
            }
            else if (source instanceof types_1.Float) {
                if (((_a = options === null || options === void 0 ? void 0 : options.exponent) === null || _a === void 0 ? void 0 : _a.get()) === 0) {
                    const tens = source.getRaw().toFixed(0).length - 1;
                    if (options.noSign === true && source.getRaw() < 0) {
                        result = source.getRaw().toFixed(17 - tens).replace(".", ",");
                        result = result.replace("-", "");
                    }
                    else {
                        result = source.getRaw().toFixed(16 - tens).replace(".", ",");
                    }
                }
                else {
                    result = source.get().toString();
                }
            }
            else {
                result = source.get().toString();
            }
            if (options === null || options === void 0 ? void 0 : options.target) {
                options.target.set(result);
            }
            else {
                this.context.console.add(result);
            }
        }
    }
}
exports.WriteStatement = WriteStatement;

},{"../types":136}],126:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateFormatting = void 0;
const types_1 = require("./types");
function templateFormatting(source, options) {
    let text = "";
    if (source instanceof types_1.Character) {
        text = source.getTrimEnd();
    }
    else {
        text = source.get() + "";
    }
    if ((options === null || options === void 0 ? void 0 : options.currency) !== undefined) {
        throw "template formatting with currency not supported";
    }
    if ((options === null || options === void 0 ? void 0 : options.timestamp) === "iso") {
        text = text.substr(0, 4) + "-" + text.substr(4, 2) + "-" + text.substr(6, 2) + "T" + text.substr(8, 2) + ":" + text.substr(10, 2) + ":" + text.substr(12, 2);
        if (text === "0--T::") {
            text = "0000-00-00T00:00:00";
        }
    }
    if ((options === null || options === void 0 ? void 0 : options.date) === "iso") {
        text = text.substr(0, 4) + "-" + text.substr(4, 2) + "-" + text.substr(6, 2);
    }
    if ((options === null || options === void 0 ? void 0 : options.time) === "iso") {
        text = text.substr(0, 2) + ":" + text.substr(2, 2) + ":" + text.substr(4, 2);
    }
    if ((options === null || options === void 0 ? void 0 : options.width) && options.pad) {
        if (options.align === "right") {
            text = text.trimEnd().padStart(options.width, options.pad);
        }
        else {
            text = text.trimEnd().padEnd(options.width, options.pad);
        }
    }
    else if (options === null || options === void 0 ? void 0 : options.width) {
        text = text.trimEnd().padEnd(options.width, " ");
    }
    else if ((options === null || options === void 0 ? void 0 : options.decimals) && source instanceof types_1.Integer) {
        text = source.get() + "." + "".padEnd(options.decimals, "0");
    }
    else if ((options === null || options === void 0 ? void 0 : options.decimals) && source instanceof types_1.Packed) {
        text = source.get().toFixed(options.decimals);
    }
    return text;
}
exports.templateFormatting = templateFormatting;

},{"./types":136}],127:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNumberFromDate = exports.getDateFromNumber = void 0;
function getDateFromNumber(value) {
    const msInOneDay = 24 * 60 * 60 * 1000;
    const date = new Date(-62135596800000 + value * msInOneDay);
    let removeJulianLeaps = 2;
    if (value <= 577736) {
        let beforeGregorian = date.getFullYear() <= 1582 ? date.getFullYear() : 1582;
        if (date.getMonth() < 1 || (date.getMonth() === 1 && date.getDay() < 29)) {
            beforeGregorian -= 1;
        }
        removeJulianLeaps = Math.floor(beforeGregorian / 100) - Math.floor(beforeGregorian / 400);
    }
    date.setTime(date.getTime() - removeJulianLeaps * msInOneDay);
    let ret = date.getFullYear().toString().padStart(4, "0");
    ret += (date.getMonth() + 1).toString().padStart(2, "0");
    ret += date.getDate().toString().padStart(2, "0");
    return ret;
}
exports.getDateFromNumber = getDateFromNumber;
function getNumberFromDate(value) {
    const msInOneDay = 24 * 60 * 60 * 1000;
    const date = new Date(-62135596800000);
    date.setUTCFullYear(parseInt(value.substr(0, 4), 10));
    date.setUTCMonth(parseInt(value.substr(4, 2), 10) - 1);
    date.setUTCDate(parseInt(value.substr(6, 2), 10));
    let days = Math.floor((date.getTime() + 62135596800000) / msInOneDay);
    let addJulianLeaps = 2;
    if (days <= 577736) {
        let beforeGregorian = date.getFullYear() <= 1582 ? date.getFullYear() : 1582;
        if (date.getMonth() < 1 || (date.getMonth() === 1 && date.getDay() < 29)) {
            beforeGregorian -= 1;
        }
        addJulianLeaps = Math.floor(beforeGregorian / 100) - Math.floor(beforeGregorian / 400);
    }
    days = days + addJulianLeaps;
    return days;
}
exports.getNumberFromDate = getNumberFromDate;

},{}],128:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ABAPObject = void 0;
class ABAPObject {
    constructor(input) {
        this.qualifiedName = input === null || input === void 0 ? void 0 : input.qualifiedName;
        this.clear();
    }
    get() {
        return this.value;
    }
    clear() {
        this.value = undefined;
    }
    getQualifiedName() {
        return this.qualifiedName;
    }
    set(value) {
        if (value instanceof ABAPObject) {
            this.value = value.get();
        }
        else {
            this.value = value;
        }
    }
}
exports.ABAPObject = ABAPObject;

},{}],129:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
const _parse_1 = require("../operators/_parse");
class Character {
    constructor(input) {
        this.length = (input === null || input === void 0 ? void 0 : input.length) ? input === null || input === void 0 ? void 0 : input.length : 1;
        if (this.length <= 0) {
            throw "Character, invalid length";
        }
        this.qualifiedName = input === null || input === void 0 ? void 0 : input.qualifiedName;
        this.clear();
    }
    set(value) {
        if (typeof value === "string" || typeof value === "number") {
            this.value = value;
        }
        else {
            this.value = value.get() + "";
        }
        if (this.value.length > this.length) {
            this.value = this.value.substr(0, this.length);
            // todo, maintain consistent length
            //    } else if (this.value.length < this.length) {
            //      this.value.padEnd(this.length, " ");
        }
        return this;
    }
    getQualifiedName() {
        return this.qualifiedName;
    }
    getLength() {
        return this.length;
    }
    clear() {
        // todo, maintain consistent length
        //    this.value = " ".repeat(this.length);
        this.value = "";
    }
    get() {
        return this.value;
    }
    getTrimEnd() {
        return this.value.replace(/ *$/, "");
    }
    getOffset(input) {
        if (input === null || input === void 0 ? void 0 : input.offset) {
            input.offset = (0, _parse_1.parse)(input.offset);
        }
        if (input === null || input === void 0 ? void 0 : input.length) {
            input.length = (0, _parse_1.parse)(input.length);
        }
        if ((input.offset && input.offset >= this.length)
            || (input.offset && input.offset < 0)
            || (input.length && input.length < 0)) {
            // @ts-ignore
            if (abap.Classes["CX_SY_RANGE_OUT_OF_BOUNDS"] !== undefined) {
                // @ts-ignore
                throw new abap.Classes["CX_SY_RANGE_OUT_OF_BOUNDS"]();
            }
            else {
                throw "Global class CX_SY_RANGE_OUT_OF_BOUNDS not found";
            }
        }
        let ret = this.value;
        if (input === null || input === void 0 ? void 0 : input.offset) {
            // @ts-ignore
            ret = ret.substr(input.offset);
        }
        if ((input === null || input === void 0 ? void 0 : input.length) !== undefined) {
            // @ts-ignore
            ret = ret.substr(0, input.length);
        }
        const r = new Character({ length: ret.length });
        r.set(ret);
        return r;
    }
}
exports.Character = Character;

},{"../operators/_parse":72}],130:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataReference = void 0;
const string_1 = require("./string");
const _parse_1 = require("../operators/_parse");
class DataReference {
    constructor(type) {
        this.pointer = undefined;
        this.type = type;
    }
    getType() {
        return this.type;
    }
    assign(pointer) {
        this.pointer = pointer;
    }
    unassign() {
        this.pointer = undefined;
    }
    getPointer() {
        return this.pointer;
    }
    ///////////////
    clear() {
        this.unassign();
        //    return this.pointer?.clear();
    }
    get() {
        var _a;
        if (this.pointer === this) {
            throw "Cyclic data reference";
        }
        // @ts-ignore
        return (_a = this.pointer) === null || _a === void 0 ? void 0 : _a.get();
    }
    array() {
        var _a;
        // @ts-ignore
        return (_a = this.pointer) === null || _a === void 0 ? void 0 : _a.array();
    }
    set(value) {
        var _a;
        if (value instanceof DataReference) {
            return this.pointer = value.getPointer();
        }
        else {
            return (_a = this.pointer) === null || _a === void 0 ? void 0 : _a.set(value);
        }
    }
    getOffset(input) {
        if (input === null || input === void 0 ? void 0 : input.offset) {
            input.offset = (0, _parse_1.parse)(input.offset);
        }
        if (input === null || input === void 0 ? void 0 : input.length) {
            input.length = (0, _parse_1.parse)(input.length);
        }
        // Assuming we're interested in Strings here, for now...
        let ret = this.get();
        if (input === null || input === void 0 ? void 0 : input.offset) {
            ret = ret.substr(input.offset);
        }
        if ((input === null || input === void 0 ? void 0 : input.length) !== undefined) {
            ret = ret.substr(0, input.length);
        }
        const r = new string_1.String();
        r.set(ret);
        return r;
    }
}
exports.DataReference = DataReference;

},{"../operators/_parse":72,"./string":140}],131:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Date = void 0;
const string_1 = require("./string");
const _javascript_date_1 = require("./_javascript_date");
const float_1 = require("./float");
const _parse_1 = require("../operators/_parse");
class Date {
    constructor(input) {
        this.clear();
        this.qualifiedName = input === null || input === void 0 ? void 0 : input.qualifiedName;
    }
    getQualifiedName() {
        return this.qualifiedName;
    }
    set(value) {
        if (typeof value === "number") {
            if (value <= 0 || value > 3652060) {
                this.value = "00000000";
            }
            else {
                this.value = (0, _javascript_date_1.getDateFromNumber)(value);
            }
        }
        else if (value instanceof float_1.Float) {
            this.set(Math.round(value.getRaw()));
        }
        else if (typeof value === "string") {
            this.value = value;
        }
        else {
            this.set(value.get());
        }
        return this;
    }
    clear() {
        this.value = "00000000";
    }
    get() {
        return this.value;
    }
    getNumeric() {
        return (0, _javascript_date_1.getNumberFromDate)(this.value);
    }
    getOffset(input) {
        if (input === null || input === void 0 ? void 0 : input.offset) {
            input.offset = (0, _parse_1.parse)(input.offset);
        }
        if (input === null || input === void 0 ? void 0 : input.length) {
            input.length = (0, _parse_1.parse)(input.length);
        }
        let ret = this.value;
        if (input === null || input === void 0 ? void 0 : input.offset) {
            // @ts-ignore
            ret = ret.substr(input.offset);
        }
        if ((input === null || input === void 0 ? void 0 : input.length) !== undefined) {
            // @ts-ignore
            ret = ret.substr(0, input.length);
        }
        const r = new string_1.String();
        r.set(ret);
        return r;
    }
}
exports.Date = Date;

},{"../operators/_parse":72,"./_javascript_date":127,"./float":134,"./string":140}],132:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecFloat34 = void 0;
const _1 = require(".");
const hex_1 = require("./hex");
const xstring_1 = require("./xstring");
class DecFloat34 {
    constructor() {
        this.value = 0;
    }
    set(value) {
        if (typeof value === "number") {
            this.value = value;
        }
        else if (typeof value === "string" && value.trim().length === 0) {
            this.value = 0;
        }
        else if (typeof value === "string") {
            this.value = parseFloat(value);
        }
        else if (value instanceof _1.Float) {
            this.value = value.getRaw();
        }
        else if (value instanceof hex_1.Hex || value instanceof xstring_1.XString) {
            // todo, how/if should this work?
            this.set(parseInt(value.get(), 16));
        }
        else {
            this.set(value.get());
        }
        return this;
    }
    clear() {
        this.value = 0;
    }
    getRaw() {
        return this.value;
    }
    get() {
        let text = new Number(this.value).toString();
        text = text.replace(".", ",");
        return text;
    }
}
exports.DecFloat34 = DecFloat34;

},{".":136,"./hex":135,"./xstring":145}],133:[function(require,module,exports){
(function (Buffer){(function (){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldSymbol = void 0;
const table_1 = require("./table");
const string_1 = require("./string");
const hex_1 = require("./hex");
const _parse_1 = require("../operators/_parse");
class FieldSymbol {
    constructor(type) {
        this.pointer = undefined;
        this.casting = false;
        this.type = type;
    }
    assign(pointer) {
        this.pointer = pointer;
    }
    setCasting() {
        this.casting = true;
    }
    unassign() {
        this.pointer = undefined;
    }
    isAssigned() {
        return this.pointer !== undefined;
    }
    getPointer() {
        if (this.casting) {
            // todo, this wont work for everything, eg changing CASTING'ed values
            return this.get();
        }
        return this.pointer;
    }
    ///////////////
    clear() {
        var _a;
        return (_a = this.pointer) === null || _a === void 0 ? void 0 : _a.clear();
    }
    get() {
        var _a, _b, _c;
        if (this.casting) {
            if (this.type instanceof hex_1.Hex) {
                // @ts-ignore
                const ret = new string_1.String().set(Buffer.from((_a = this.pointer) === null || _a === void 0 ? void 0 : _a.get(), "utf16le").toString("hex"));
                return ret.get();
            }
            else {
                // @ts-ignore
                const ret = new string_1.String().set(Buffer.from((_b = this.pointer) === null || _b === void 0 ? void 0 : _b.get(), "hex").toString("utf16le"));
                return ret.get();
            }
        }
        else {
            // @ts-ignore
            return (_c = this.pointer) === null || _c === void 0 ? void 0 : _c.get();
        }
    }
    appendInitial() {
        if (this.pointer instanceof table_1.Table) {
            return this.pointer.appendInitial();
        }
        return undefined;
    }
    array() {
        var _a;
        // @ts-ignore
        return (_a = this.pointer) === null || _a === void 0 ? void 0 : _a.array();
    }
    set(value) {
        var _a;
        (_a = this.pointer) === null || _a === void 0 ? void 0 : _a.set(value);
        return this;
    }
    getOffset(input) {
        if (input === null || input === void 0 ? void 0 : input.offset) {
            input.offset = (0, _parse_1.parse)(input.offset);
        }
        if (input === null || input === void 0 ? void 0 : input.length) {
            input.length = (0, _parse_1.parse)(input.length);
        }
        // Assuming we're interested in Strings here, for now...
        let ret = this.get();
        if (input === null || input === void 0 ? void 0 : input.offset) {
            ret = ret.substr(input.offset);
        }
        if ((input === null || input === void 0 ? void 0 : input.length) !== undefined) {
            ret = ret.substr(0, input.length);
        }
        const r = new string_1.String();
        r.set(ret);
        return r;
    }
}
exports.FieldSymbol = FieldSymbol;

}).call(this)}).call(this,require("buffer").Buffer)
},{"../operators/_parse":72,"./hex":135,"./string":140,"./table":142,"buffer":2}],134:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Float = void 0;
const hex_1 = require("./hex");
const xstring_1 = require("./xstring");
/*
function getNumberParts(x: number) {
  if(isNaN(x)) {
    throw "Float NaN";
  }
  const sig = x > 0 ? 1 : -1;
  if (!isFinite(x)) {
    throw "Float not finite";
  }
  x = Math.abs(x);
  const exp = Math.floor(Math.log(x) * Math.LOG2E) - 52;
  const man = x / Math.pow(2, exp);
  return {mantissa: sig * man, exponent: exp};
}
*/
class Float {
    constructor(input) {
        this.value = 0;
        this.qualifiedName = input === null || input === void 0 ? void 0 : input.qualifiedName;
    }
    getQualifiedName() {
        return this.qualifiedName;
    }
    set(value) {
        if (typeof value === "number") {
            this.value = value;
        }
        else if (typeof value === "string" && value.trim().length === 0) {
            this.value = 0;
        }
        else if (typeof value === "string") {
            this.value = parseFloat(value);
        }
        else if (value instanceof Float) {
            this.value = value.getRaw();
        }
        else if (value instanceof hex_1.Hex || value instanceof xstring_1.XString) {
            // todo, how/if should this work?
            this.set(parseInt(value.get(), 16));
        }
        else {
            this.set(value.get());
        }
        return this;
    }
    clear() {
        this.value = 0;
    }
    getRaw() {
        return this.value;
    }
    get() {
        let text = new Number(this.value).toExponential(16);
        text = text.replace(".", ",");
        if (text.includes("e+")) {
            const split = text.split("e+");
            const mantissa = split[0];
            const exponent = split[1].padStart(2, "0");
            return mantissa + "E+" + exponent;
        }
        else {
            const split = text.split("e-");
            const mantissa = split[0];
            const exponent = split[1].padStart(2, "0");
            return mantissa + "E-" + exponent;
        }
    }
}
exports.Float = Float;

},{"./hex":135,"./xstring":145}],135:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hex = void 0;
const _parse_1 = require("../operators/_parse");
const float_1 = require("./float");
const xstring_1 = require("./xstring");
class Hex {
    constructor(input) {
        this.length = (input === null || input === void 0 ? void 0 : input.length) ? input === null || input === void 0 ? void 0 : input.length : 1;
        this.value = "0".repeat(this.length * 2);
    }
    set(value) {
        if (typeof value === "string") {
            this.value = value;
        }
        else if (typeof value === "number") {
            if (value < 0) {
                const maxVal = Math.pow(2, this.length * 8);
                this.value = Math.round(value + maxVal).toString(16);
            }
            else {
                this.value = Math.round(value).toString(16);
            }
            this.value = this.value.padStart(this.length * 2, "0");
        }
        else {
            let v = value.get();
            if (value instanceof float_1.Float) {
                v = value.getRaw();
                this.set(v);
            }
            if (typeof v === "number") {
                this.set(v);
            }
            else {
                this.value = v;
                if (this.value.match(/^(?![A-F0-9])/)) {
                    this.value = "";
                }
            }
        }
        if (this.value.length > this.length * 2) {
            this.value = this.value.substr(0, this.length * 2);
        }
        if (this.value.length < this.length * 2) {
            this.value = this.value.padEnd(this.length * 2, "0");
        }
        this.value = this.value.toUpperCase();
    }
    getLength() {
        return this.length;
    }
    clear() {
        this.value = "";
    }
    get() {
        return this.value;
    }
    getOffset(input) {
        if (input === null || input === void 0 ? void 0 : input.offset) {
            input.offset = (0, _parse_1.parse)(input.offset);
        }
        if (input === null || input === void 0 ? void 0 : input.length) {
            input.length = (0, _parse_1.parse)(input.length);
        }
        let ret = this.value;
        if (input === null || input === void 0 ? void 0 : input.offset) {
            // @ts-ignore
            ret = ret.substr(input.offset * 2);
        }
        if ((input === null || input === void 0 ? void 0 : input.length) !== undefined) {
            // @ts-ignore
            ret = ret.substr(0, input.length * 2);
        }
        const r = new xstring_1.XString();
        r.set(ret);
        return r;
    }
}
exports.Hex = Hex;

},{"../operators/_parse":72,"./float":134,"./xstring":145}],136:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./abap_object"), exports);
__exportStar(require("./character"), exports);
__exportStar(require("./data_reference"), exports);
__exportStar(require("./date"), exports);
__exportStar(require("./decfloat34"), exports);
__exportStar(require("./field_symbol"), exports);
__exportStar(require("./float"), exports);
__exportStar(require("./hex"), exports);
__exportStar(require("./integer"), exports);
__exportStar(require("./numc"), exports);
__exportStar(require("./packed"), exports);
__exportStar(require("./string"), exports);
__exportStar(require("./structure"), exports);
__exportStar(require("./table"), exports);
__exportStar(require("./time"), exports);
__exportStar(require("./utc_long"), exports);
__exportStar(require("./xstring"), exports);

},{"./abap_object":128,"./character":129,"./data_reference":130,"./date":131,"./decfloat34":132,"./field_symbol":133,"./float":134,"./hex":135,"./integer":137,"./numc":138,"./packed":139,"./string":140,"./structure":141,"./table":142,"./time":143,"./utc_long":144,"./xstring":145}],137:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Integer = void 0;
const float_1 = require("./float");
const hex_1 = require("./hex");
const xstring_1 = require("./xstring");
class Integer {
    constructor(input) {
        this.value = 0;
        this.qualifiedName = input === null || input === void 0 ? void 0 : input.qualifiedName;
    }
    getQualifiedName() {
        return this.qualifiedName;
    }
    set(value) {
        if (typeof value === "number") {
            this.value = value;
        }
        else if (typeof value === "string" && value.trim().length === 0) {
            this.value = 0;
        }
        else if (typeof value === "string") {
            if (/^\s*-?\+?\d+\.?\d*$/i.test(value) === false) {
                // @ts-ignore
                if (abap.Classes["CX_SY_CONVERSION_NO_NUMBER"] !== undefined) {
                    // @ts-ignore
                    throw new abap.Classes["CX_SY_CONVERSION_NO_NUMBER"]();
                }
                else {
                    throw "Global class CX_SY_CONVERSION_NO_NUMBER not found";
                }
            }
            this.value = parseInt(value, 10);
        }
        else if (value instanceof float_1.Float) {
            this.set(Math.round(value.getRaw()));
        }
        else if (value instanceof hex_1.Hex || value instanceof xstring_1.XString) {
            let num = parseInt(value.get(), 16);
            // handle two complement,
            if (value instanceof hex_1.Hex && value.getLength() >= 4) {
                const maxVal = Math.pow(2, value.get().length / 2 * 8);
                if (num > maxVal / 2 - 1) {
                    num = num - maxVal;
                }
            }
            this.set(num);
        }
        else {
            this.set(value.get());
        }
        return this;
    }
    clear() {
        this.value = 0;
    }
    get() {
        return this.value;
    }
}
exports.Integer = Integer;

},{"./float":134,"./hex":135,"./xstring":145}],138:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Numc = void 0;
class Numc {
    constructor(input) {
        this.length = (input === null || input === void 0 ? void 0 : input.length) ? input === null || input === void 0 ? void 0 : input.length : 1;
        this.qualifiedName = input === null || input === void 0 ? void 0 : input.qualifiedName;
        this.clear();
    }
    getQualifiedName() {
        return this.qualifiedName;
    }
    set(value) {
        if (typeof value === "number") {
            this.value = value.toString();
        }
        else if (typeof value === "string") {
            this.value = parseInt(value, 10) + "";
        }
        else {
            this.set(value.get());
            return;
        }
        if (this.value.length > this.length) {
            this.value = this.value.substr(this.value.length - this.length, this.length);
        }
        else {
            const pad = this.length - this.value.length;
            if (pad > 0) {
                this.value = "0".repeat(pad) + this.value;
            }
        }
        return this;
    }
    getLength() {
        return this.length;
    }
    clear() {
        this.value = "0".repeat(this.length);
    }
    get() {
        return this.value;
    }
    getOffset(_input) {
        throw "todo, runtime, numc getOffset()";
    }
}
exports.Numc = Numc;

},{}],139:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Packed = void 0;
const float_1 = require("./float");
class Packed {
    constructor(input) {
        this.value = 0;
        this.length = 666;
        if (input === null || input === void 0 ? void 0 : input.length) {
            this.length = input.length;
        }
        this.decimals = 0;
        if (input === null || input === void 0 ? void 0 : input.decimals) {
            this.decimals = input.decimals;
        }
        this.qualifiedName = input === null || input === void 0 ? void 0 : input.qualifiedName;
    }
    getQualifiedName() {
        return this.qualifiedName;
    }
    set(value) {
        if (typeof value === "number") {
            this.value = value;
        }
        else if (typeof value === "string") {
            this.value = parseFloat(value);
        }
        else if (value instanceof float_1.Float) {
            this.value = value.getRaw();
        }
        else {
            this.set(value.get());
        }
    }
    getLength() {
        return this.length;
    }
    getDecimals() {
        return this.decimals;
    }
    clear() {
        this.value = 0;
    }
    get() {
        return this.value;
    }
}
exports.Packed = Packed;

},{"./float":134}],140:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.String = void 0;
const _parse_1 = require("../operators/_parse");
const character_1 = require("./character");
const integer_1 = require("./integer");
class String {
    constructor(input) {
        this.value = "";
        this.qualifiedName = input === null || input === void 0 ? void 0 : input.qualifiedName;
    }
    getQualifiedName() {
        return this.qualifiedName;
    }
    set(value) {
        if (typeof value === "string") {
            this.value = value;
        }
        else if (typeof value === "number") {
            this.value = value.toString();
        }
        else if (value instanceof character_1.Character) {
            // replace trailing blanks if the source is a Character string
            this.value = value.getTrimEnd();
        }
        else if (value instanceof integer_1.Integer) {
            const lv_sign = (parseInt(value.get(), 10) >= 0) ? " " : "-";
            this.value = value.get() + lv_sign;
        }
        else {
            this.value = value.get() + "";
        }
        return this;
    }
    clear() {
        this.value = "";
    }
    get() {
        return this.value;
    }
    getOffset(input) {
        if (input === null || input === void 0 ? void 0 : input.offset) {
            input.offset = (0, _parse_1.parse)(input.offset);
        }
        if (input === null || input === void 0 ? void 0 : input.length) {
            input.length = (0, _parse_1.parse)(input.length);
        }
        if ((input.offset && input.offset > this.value.length)
            || (input.offset && input.offset < 0)
            || (input.length && input.length < 0)) {
            // @ts-ignore
            if (abap.Classes["CX_SY_RANGE_OUT_OF_BOUNDS"] !== undefined) {
                // @ts-ignore
                throw new abap.Classes["CX_SY_RANGE_OUT_OF_BOUNDS"]();
            }
            else {
                throw "Global class CX_SY_RANGE_OUT_OF_BOUNDS not found";
            }
        }
        let ret = this.value;
        if (input === null || input === void 0 ? void 0 : input.offset) {
            // @ts-ignore
            ret = ret.substr(input.offset);
        }
        if ((input === null || input === void 0 ? void 0 : input.length) !== undefined) {
            // @ts-ignore
            ret = ret.substr(0, input.length);
        }
        const r = new String();
        r.set(ret);
        return r;
    }
}
exports.String = String;

},{"../operators/_parse":72,"./character":129,"./integer":137}],141:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Structure = void 0;
const clone_1 = require("../clone");
const field_symbol_1 = require("./field_symbol");
const table_1 = require("./table");
class Structure {
    constructor(fields, qualifiedName) {
        this.value = fields;
        this.qualifiedName = qualifiedName === null || qualifiedName === void 0 ? void 0 : qualifiedName.toUpperCase();
    }
    clear() {
        for (const f in this.value) {
            // @ts-ignore
            this.value[f].clear();
        }
        return this;
    }
    getQualifiedName() {
        return this.qualifiedName;
    }
    set(input) {
        if (input === undefined) {
            return;
        }
        if (input instanceof field_symbol_1.FieldSymbol) {
            this.set(input.getPointer());
        }
        else if (input instanceof table_1.Table) {
            throw "Structure, input is a table";
        }
        else if (input instanceof Structure) {
            const obj = input.get();
            for (const f in obj) {
                // @ts-ignore
                this.value[f].set((0, clone_1.clone)(obj[f]));
            }
        }
        else {
            this.setCharacter(input);
        }
        return this;
    }
    setCharacter(input) {
        this.clear();
        let val = input;
        if (typeof val !== "string") {
            val = val.get() + "";
        }
        for (const key of Object.keys(this.value)) {
            const targetLength = this.value[key].getLength();
            this.value[key].set(val.substr(0, targetLength));
            val = val.substr(targetLength);
        }
    }
    get() {
        return this.value;
    }
}
exports.Structure = Structure;

},{"../clone":45,"./field_symbol":133,"./table":142}],142:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = exports.LoopIndex = exports.TableAccessType = void 0;
const integer_1 = require("./integer");
const string_1 = require("./string");
const clone_1 = require("../clone");
const field_symbol_1 = require("./field_symbol");
const data_reference_1 = require("./data_reference");
const insert_internal_1 = require("../statements/insert_internal");
var TableAccessType;
(function (TableAccessType) {
    TableAccessType["standard"] = "STANDARD";
    TableAccessType["sorted"] = "SORTED";
    TableAccessType["hashed"] = "HASHED";
    TableAccessType["index"] = "INDEX";
    TableAccessType["any"] = "ANY";
})(TableAccessType = exports.TableAccessType || (exports.TableAccessType = {}));
class LoopIndex {
    constructor(start) {
        this.index = start;
    }
}
exports.LoopIndex = LoopIndex;
class Table {
    constructor(rowType, options, qualifiedName) {
        this.value = [];
        this.loops = new Set();
        this.rowType = rowType;
        this.options = options;
        if (this.options === undefined) {
            this.options = {
                type: TableAccessType.standard,
                keyFields: [],
                isUnique: false,
                withHeader: false,
            };
        }
        this.qualifiedName = qualifiedName === null || qualifiedName === void 0 ? void 0 : qualifiedName.toUpperCase();
    }
    getQualifiedName() {
        return this.qualifiedName;
    }
    getOptions() {
        return this.options;
    }
    startLoop(start = 0) {
        const l = new LoopIndex(start);
        this.loops.add(l);
        return l;
    }
    unregisterLoop(loop) {
        this.loops.delete(loop);
    }
    getRowType() {
        return this.rowType;
    }
    // Modifications to the array must be done inside this class, in order to keep track of LOOP indexes
    array() {
        return this.value;
    }
    clear() {
        this.value = [];
    }
    set(tab) {
        this.clear();
        for (const a of tab.array()) {
            // this clones the values, and add sorting if required
            (0, insert_internal_1.insertInternal)({ table: this, data: a });
        }
    }
    insertIndex(item, index) {
        const val = this.getValue(item);
        this.value.splice(index, 0, val);
        for (const l of this.loops.values()) {
            if (l.index <= index) {
                l.index++;
            }
        }
        return val;
    }
    deleteIndex(index) {
        if (index > this.value.length) {
            return;
        }
        if (index === this.value.length - 1) {
            this.value.pop(); // pop'ing is faster than splice
        }
        else if (index === 0) {
            this.value.shift();
        }
        else {
            this.value.splice(index, 1);
        }
        for (const l of this.loops.values()) {
            if (l.index >= index) {
                l.index--;
            }
        }
    }
    append(item, cloneRow = true) {
        if (item instanceof field_symbol_1.FieldSymbol) {
            const p = item.getPointer();
            if (p === undefined) {
                throw new Error("APPEND, fs not assigned");
            }
            this.value.push(p);
            return item;
        }
        else if (item instanceof data_reference_1.DataReference) {
            const ref = new data_reference_1.DataReference(item.getType());
            ref.assign(item.getPointer());
            this.value.push(ref);
            return ref;
        }
        else {
            const val = this.getValue(item, cloneRow);
            const p = (0, clone_1.clone)(this.rowType);
            p.set(val);
            this.value.push(p);
            return p;
        }
    }
    appendInitial() {
        // note that this will clone the object
        this.append(this.rowType);
        // @ts-ignore
        abap.builtin.sy.get().tabix.set(this.value.length);
        return this.value[this.value.length - 1];
    }
    sort(compareFn) {
        this.value.sort(compareFn);
    }
    ///////////////////////////
    getValue(item, cloneRow = true) {
        // make sure to do conversion if needed
        if (typeof item === "number") {
            const tmp = (0, clone_1.clone)(this.getRowType());
            tmp.set(new integer_1.Integer().set(item));
            return tmp;
        }
        else if (typeof item === "string") {
            const tmp = (0, clone_1.clone)(this.getRowType());
            tmp.set(new string_1.String().set(item));
            return tmp;
        }
        else if (cloneRow === true) {
            const tmp = (0, clone_1.clone)(this.getRowType());
            tmp.set(item);
            return tmp;
        }
        else {
            return item;
        }
    }
}
exports.Table = Table;

},{"../clone":45,"../statements/insert_internal":108,"./data_reference":130,"./field_symbol":133,"./integer":137,"./string":140}],143:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Time = void 0;
const string_1 = require("./string");
const _1 = require(".");
const _parse_1 = require("../operators/_parse");
class Time {
    constructor(input) {
        this.clear();
        this.qualifiedName = input === null || input === void 0 ? void 0 : input.qualifiedName;
    }
    getQualifiedName() {
        return this.qualifiedName;
    }
    set(value) {
        if (typeof value === "number") {
            const date = new Date();
            date.setTime(value * 1000);
            this.value = date.getUTCHours().toString().padStart(2, "0") +
                date.getUTCMinutes().toString().padStart(2, "0") +
                date.getUTCSeconds().toString().padStart(2, "0");
        }
        else if (typeof value === "string") {
            this.value = value;
        }
        else if (value instanceof _1.Float) {
            this.set(Math.round(value.getRaw()));
        }
        else {
            this.set(value.get());
        }
        return this;
    }
    clear() {
        this.value = "000000";
    }
    get() {
        return this.value;
    }
    getNumeric() {
        const hours = parseInt(this.value.substr(0, 2), 10);
        const minutes = parseInt(this.value.substr(2, 2), 10);
        const seconds = parseInt(this.value.substr(4, 2), 10);
        return hours * 3600 + minutes * 60 + seconds;
    }
    getOffset(input) {
        if (input === null || input === void 0 ? void 0 : input.offset) {
            input.offset = (0, _parse_1.parse)(input.offset);
        }
        if (input === null || input === void 0 ? void 0 : input.length) {
            input.length = (0, _parse_1.parse)(input.length);
        }
        let ret = this.value;
        if (input === null || input === void 0 ? void 0 : input.offset) {
            // @ts-ignore
            ret = ret.substr(input.offset);
        }
        if ((input === null || input === void 0 ? void 0 : input.length) !== undefined) {
            // @ts-ignore
            ret = ret.substr(0, input.length);
        }
        const r = new string_1.String();
        r.set(ret);
        return r;
    }
}
exports.Time = Time;

},{".":136,"../operators/_parse":72,"./string":140}],144:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UTCLong = void 0;
class UTCLong {
    constructor(input) {
        this.clear();
        this.qualifiedName = input === null || input === void 0 ? void 0 : input.qualifiedName;
    }
    getQualifiedName() {
        return this.qualifiedName;
    }
    getOffset(_input) {
        throw new Error("Method not implemented, getOffset(), utcLong");
    }
    set(_value) {
        // todo
        return this;
    }
    clear() {
        this.value = "";
    }
    get() {
        return this.value;
    }
}
exports.UTCLong = UTCLong;

},{}],145:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XString = void 0;
const _parse_1 = require("../operators/_parse");
class XString {
    constructor(input) {
        this.value = "";
        this.qualifiedName = input === null || input === void 0 ? void 0 : input.qualifiedName;
    }
    getQualifiedName() {
        return this.qualifiedName;
    }
    set(value) {
        if (typeof value === "string") {
            this.value = value;
            const finalLength = Math.ceil(this.value.length / 2) * 2;
            this.value = this.value.padEnd(finalLength, "0");
        }
        else {
            const v = value.get();
            if (typeof v === "number") {
                this.value = v.toString(16);
                const finalLength = Math.ceil(this.value.length / 2) * 2;
                this.value = this.value.padStart(finalLength, "0");
            }
            else {
                this.set(v);
            }
        }
    }
    clear() {
        this.value = "";
    }
    get() {
        return this.value;
    }
    getOffset(input) {
        if (input === null || input === void 0 ? void 0 : input.offset) {
            input.offset = (0, _parse_1.parse)(input.offset);
        }
        if (input === null || input === void 0 ? void 0 : input.length) {
            input.length = (0, _parse_1.parse)(input.length);
        }
        let ret = this.value;
        if (input === null || input === void 0 ? void 0 : input.offset) {
            // @ts-ignore
            ret = ret.substr(input.offset * 2);
        }
        if ((input === null || input === void 0 ? void 0 : input.length) !== undefined) {
            // @ts-ignore
            ret = ret.substr(0, input.length * 2);
        }
        const r = new XString();
        r.set(ret);
        return r;
    }
}
exports.XString = XString;

},{"../operators/_parse":72}],146:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitTestResult = void 0;
/* eslint-disable max-len */
class UnitTestMethodResult {
    constructor(name) {
        this.name = name;
        this.result = undefined;
        this.result = undefined;
    }
    pass() {
        this.result = "Pass";
    }
    fail() {
        this.result = "Fail";
    }
    skip() {
        this.result = "Skip";
    }
}
class UnitTestClassResult {
    constructor(name) {
        this.name = name;
        this.methods = [];
    }
    addMethod(name) {
        const ret = new UnitTestMethodResult(name);
        this.methods.push(ret);
        return ret;
    }
}
class UnitTestObjectResult {
    constructor(name) {
        this.name = name;
        this.classes = [];
    }
    addTestClass(name) {
        const ret = new UnitTestClassResult(name);
        this.classes.push(ret);
        return ret;
    }
}
class UnitTestResult {
    constructor() {
        this.objects = [];
    }
    addObject(name) {
        const ret = new UnitTestObjectResult(name);
        this.objects.push(ret);
        return ret;
    }
    xUnitXML() {
        // https://xunit.net/docs/format-xml-v2
        // <assemblies> = project
        // <assembly> = global object/global class
        // <collection> = local class
        // <test> = method
        let ret = `<?xml version="1.0" encoding="utf-8"?>\n<assemblies>\n`;
        for (const obj of this.objects) {
            ret += `  <assembly name="${obj.name}" test-framework="abap-framework" environment="abap-environment">\n`;
            for (const clas of obj.classes) {
                ret += `    <collection name="${clas.name}">\n`;
                for (const meth of clas.methods) {
                    ret += `      ` +
                        `<test name="${obj.name}.${clas.name}.${meth.name}" type="${obj.name}.${clas.name}" method="${obj.name}.${clas.name}.${meth.name}" time="0" result="${meth.result}"></test>\n`;
                }
                ret += `    </collection>\n`;
            }
            ret += `  </assembly>\n`;
        }
        ret += `</assemblies>`;
        return ret;
    }
}
exports.UnitTestResult = UnitTestResult;

},{}],147:[function(require,module,exports){
const n=36e11,t=864e11,e=[1,1e3,1e6,1e9,6e10,n,t],o=[9,6,3];function r(n){return n<=6}function i(n){return n>=6}const s=a("overflow",{constrain:0,reject:1},0);function a(n,t,e){const o=function(n,t,e){return(o,r)=>{if(void 0===o){const t=null!=r?r:e;if(void 0===t)throw new RangeError(`Must specify a ${n}`);return t}if(void 0===t[o])throw new RangeError(`Invalid ${n}: ${o}`);return t[o]}}(n,t,e);return(t,e)=>{const r=d(t);return o(r[n],e)}}function c(n,t,e,o){if(void 0===n)return t;if(!Number.isFinite(n))throw new RangeError("Number must be finite");n=Math.trunc(n);const r=Math.min(Math.max(n,t),e);if(r!==n&&1===o)throw new RangeError("Invalid overflowed value "+n);return r}function u(n,t){const e={};for(const o in t)void 0!==n[o]&&(e[o]=t[o](n[o]));return e}function d(n,t){if(void 0===n&&!t)return{};if(!h(n))throw TypeError("options must be an object or undefined");return n}const l=/object|function/;function h(n){return null!==n&&l.test(typeof n)}const f=a("roundingMode",{halfExpand:Math.round,ceil:Math.ceil,trunc:Math.trunc,floor:Math.floor});function m(){const n=new WeakMap;return[n.get.bind(n),n.set.bind(n)]}function g(n,t){Object.defineProperties(n.prototype,y(t,(n=>({get:n}))))}function y(n,t){const e={};for(const o in n)e[o]=t(n[o],o);return e}function w(n,t,e){const o={};for(const r of t)o[r]=e(n[r]);return o}function p(n,t){const e={};return n.forEach(((n,o)=>{e[n]=t(n,o)})),e}const v=["nanosecond","microsecond","millisecond","second","minute","hour"],M=[...v,"day","week","month","year"],b=M.map((n=>n+"s")),S=p(M,((n,t)=>t)),I=p(b,((n,t)=>t));function F(n,t,e,o){var r;let i;if(void 0===n){if(void 0===t)throw new RangeError("Unit is required");i=t}else if(i=null!=(r=S[n])?r:I[n],void 0===i||i<e||i>o)throw new RangeError("Invalid unit "+n);return i}function T(n,t,o,r,i,s){var a;const c=d(n),u=null!=(a=c.roundingIncrement)?a:1,l=F(c.smallestUnit,o,r,i),h=f(c,s?Math.round:Math.trunc);let m=c.largestUnit;"auto"===m&&(m=void 0);const g=F(m,t=Math.max(t,l),r,i);if(l>g)throw new RangeError("Bad smallestUnit/largestUnit");if(l<6){const n=e[l+1],t=e[l]*u;if(n===t)throw new RangeError("Must not equal larger unit");if(n%t)throw new RangeError("Must divide into larger unit")}return{smallestUnit:l,largestUnit:g,roundingFunc:h,roundingIncrement:u}}function O(n,o,r,i){var s;const a=d("string"==typeof n?{smallestUnit:n}:n,!0),c=null!=(s=a.roundingIncrement)?s:1,u=F(a.smallestUnit,void 0,o,r),l=f(a,Math.round),h=e[u]*c;if(6===u){if(1!==c)throw new RangeError("When smallestUnit is days, roundingIncrement must be 1")}else{const n=i?t:e[u+1];if(!i&&n===h)throw new RangeError("Must not equal larger unit");if(n%h)throw new RangeError("Must divide into larger unit")}return{smallestUnit:u,roundingFunc:l,incNano:h}}const D=Symbol();function N(n,t,...e){return t instanceof n?t:n.from(t,...e)}class Y{toJSON(){return this.toString()}}class E extends Y{valueOf(){throw new Error("Cannot convert object using valueOf")}}const[Z,C]=m();class U extends E{constructor(n){super(),C(this,Object.freeze(n))}getISOFields(){return Z(this)}}function P(n,t){return n<t?-1:n>t?1:0}function R(n){return P(n,0)}function k(n,t,e){return e(n/t)*t}function x(n){return k(n,6e10,j)}function j(n){return Math.round(Math.abs(n))*R(n)}function q(n,t,e){const o=n.div(t).mult(t),r=n.sub(o).toNumber();return o.add(e(r/t)*t)}function H(n,t){return(n%t+t)%t}function L(n,t){return $(e=String(n),t,"0")+e;var e}function B(n,t,e){return n+$(n,t,e)}function $(n,t,e){return new Array(Math.max(0,t-n.length+1)).join(e)}function A(n){return n<0?"-":"+"}const z=Math.pow(10,8);class W{constructor(n,t){this.high=n,this.low=t}sign(){return R(this.high)||R(this.low)}neg(){return new W(-this.high||0,-this.low||0)}abs(){return this.sign()<0?this.neg():this}add(n){const[t,e]=J(n);return Q(this.high+t,this.low+e)}sub(n){const[t,e]=J(n);return Q(this.high-t,this.low-e)}mult(n){return Q(this.high*n,this.low*n)}div(n){const t=this.high/n;let e=String(t);-1!==e.indexOf("e-")&&(e=t.toFixed(20));const o=e.indexOf(".");let r=0;if(-1!==o){let n=e.substr(o+1);n=B(n,8,"0"),n=n.substr(0,8),r=parseInt(n)*(R(t)||1)}return Q(Math.trunc(t)||0,Math.trunc(this.low/n)+r)}toNumber(){return this.high*z+this.low}toBigInt(){return BigInt(this.high)*BigInt(z)+BigInt(this.low)}}function K(n,t){let e,o;if(n instanceof W)e=n.high,o=n.low;else if("number"==typeof n){if(t)throw new TypeError("Must supply bigint, not number");e=Math.trunc(n/z),o=n%z||0}else if("bigint"==typeof n){const t=BigInt(z);e=Number(n/t),o=Number(n%t||0)}else{if("string"!=typeof n)throw new Error("Invalid type of BigNano");{if((n=n.trim()).match(/\D/))throw new SyntaxError(`Cannot parse ${n} to a BigInt`);const t=n.length-8;e=Number(n.substr(t)),o=Number(n.substr(0,t))}}return new W(e,o)}function G(n,t){return P(n.high,t.high)||P(n.low,t.low)}function J(n){return"number"==typeof n?[0,n]:[n.high,n.low]}function Q(n,t){let e=t%z||0,o=n+Math.trunc(t/z);const r=R(o),i=R(e);return i&&r&&i!==r&&(o+=i,e-=z*i),new W(o,e)}const V=b.concat("sign");function X(n){return w(n,V,(n=>-n||0))}function _(n,t){var e,o,r,i,s,a,c,u,d,l;return nn({years:null!=(e=t.years)?e:n.years,months:null!=(o=t.months)?o:n.months,weeks:null!=(r=t.weeks)?r:n.weeks,days:null!=(i=t.days)?i:n.days,hours:null!=(s=t.hours)?s:n.hours,minutes:null!=(a=t.minutes)?a:n.minutes,seconds:null!=(c=t.seconds)?c:n.seconds,milliseconds:null!=(u=t.milliseconds)?u:n.milliseconds,microseconds:null!=(d=t.microseconds)?d:n.microseconds,nanoseconds:null!=(l=t.nanoseconds)?l:n.nanoseconds})}function nn(n){return{...n,sign:tn(n)}}function tn(n){let t=0;for(const e of b){if(n[e]){t=R(n[e]);break}}return t}function en(n){let t=9;for(;t>0&&!n[b[t]];)t--;return t}const on={isoHour:0,isoMinute:0,isoSecond:0,isoMillisecond:0,isoMicrosecond:0,isoNanosecond:0},rn={hours:0,minutes:0,seconds:0,milliseconds:0,microseconds:0,nanoseconds:0};function sn(n){return{isoHour:n.hour||0,isoMinute:n.minute||0,isoSecond:n.second||0,isoMillisecond:n.millisecond||0,isoMicrosecond:n.microsecond||0,isoNanosecond:n.nanosecond||0}}function an(n){return K(t).mult(n.days).add(cn(n))}function cn(t){return K(t.nanoseconds).add(K(t.microseconds).mult(1e3)).add(K(t.milliseconds).mult(1e6)).add(K(t.seconds).mult(1e9)).add(K(t.minutes).mult(6e10)).add(K(t.hours).mult(n))}function un(t){return t.isoHour*n+6e10*t.isoMinute+1e9*t.isoSecond+1e6*t.isoMillisecond+1e3*t.isoMicrosecond+t.isoNanosecond}function dn(e,o){let r,i=0,s=0,a=0,c=0,u=0,d=0;switch(o){case 6:r=e.div(t),i=r.toNumber(),e=e.sub(r.mult(t));case 5:r=e.div(n),s=r.toNumber(),e=e.sub(r.mult(n));case 4:r=e.div(6e10),a=r.toNumber(),e=e.sub(r.mult(6e10));case 3:r=e.div(1e9),c=r.toNumber(),e=e.sub(r.mult(1e9));case 2:r=e.div(1e6),u=r.toNumber(),e=e.sub(r.mult(1e6));case 1:r=e.div(1e3),d=r.toNumber(),e=e.sub(r.mult(1e3))}return nn({years:0,months:0,weeks:0,days:i,hours:s,minutes:a,seconds:c,milliseconds:u,microseconds:d,nanoseconds:e.toNumber()})}function ln(e){const o=Math.floor(e/t);e-=o*t;const r=Math.floor(e/n);e-=r*n;const i=Math.floor(e/6e10);e-=6e10*i;const s=Math.floor(e/1e9);e-=1e9*s;const a=Math.floor(e/1e6);e-=1e6*a;const c=Math.floor(e/1e3);return[{isoHour:r,isoMinute:i,isoSecond:s,isoMillisecond:a,isoMicrosecond:c,isoNanosecond:e-=1e3*c},o]}const hn={gregory:{bce:-1,ce:0},ethioaa:{era0:0},ethiopic:{era0:0,era1:5500},coptic:{era0:-1,era1:0},roc:{beforeroc:-1,minguo:0},buddhist:{be:0},islamic:{ah:0},indian:{saka:0},persian:{ap:0},japanese:{bce:-1,ce:0,meiji:1867,taisho:1911,showa:1925,heisei:1988,reiwa:2018}};class fn{constructor(n){this.id=n}monthCode(n,t){return"M"+L(n,2)}convertMonthCode(n,t){const e=/L$/.test(n),o=parseInt(n.substr(1));if(e)throw new RangeError("Calendar system doesnt support leap months");return[o,!1]}}function mn(n,t,e,o){var r;let i=null==(r=hn[gn(n)])?void 0:r[e];if(void 0===i){if(!o)throw new Error("Unkown era "+e);i=0}return(i+t)*(R(i)||1)}function gn(n){return n.split("-")[0]}class yn extends fn{computeFields(n){const t=Fn(n);return{era:void 0,eraYear:void 0,year:t.isoYear,month:t.isoMonth,day:t.isoDay}}epochMilliseconds(n,t,e){return Sn(n,t,e)}daysInMonth(n,t){return 2===t?this.inLeapYear(n)?29:28:4===t||6===t||9===t||11===t?30:31}monthsInYear(){return 12}inLeapYear(n){return n%4==0&&(n%100!=0||n%400==0)}guessYearForMonthDay(){return pn}normalizeISOYearForMonthDay(){return pn}}const wn=new yn("iso8601"),pn=1972,vn=Symbol();function Mn(n){return bn(n.isoYear,n.isoMonth,n.isoDay,n.isoHour,n.isoMinute,n.isoSecond,n.isoMillisecond,n.isoMicrosecond,n.isoNanosecond)}function bn(n,t,e,o,r,i,s,a,c){return K(Sn(n,t,e,o,r,i,s)).mult(1e6).add(1e3*(null!=a?a:0)+(null!=c?c:0))}function Sn(n,t,e,o,r,i,s){const a=R(n);let c,u,d=0;const l=n>=0&&n<1e3,h=l?n+1200:n;for(;d<31;d++){c=e-a*d;const n=Date.UTC(h,t-1,c,null!=o?o:0,null!=r?r:0,null!=i?i:0,null!=s?s:0);if(!En(n)){u=n+a*d*864e5;break}}return(void 0===u||c<1||c>wn.daysInMonth(n,t))&&Zn(),l&&(u=new Date(u).setUTCFullYear(n)),u}function In(n){let t=n.div(1e6),e=n.sub(t.mult(1e6)).toNumber();e<0&&(e+=1e6,t=t.sub(1));const o=Math.floor(e/1e3);return e-=1e3*o,{...Fn(t.toNumber()),isoMicrosecond:o,isoNanosecond:e}}function Fn(n){const[t,e]=Yn(n);return{isoYear:t.getUTCFullYear(),isoMonth:t.getUTCMonth()+1,isoDay:t.getUTCDate()+e,isoHour:t.getUTCHours(),isoMinute:t.getUTCMinutes(),isoSecond:t.getUTCSeconds(),isoMillisecond:t.getUTCMilliseconds()}}function Tn(n){var t;return null!=(t=n[vn])?t:Mn(n.getISOFields())}function On(n){return Math.floor(Sn(n,1,1)/1e3)}function Dn(n){return Yn(n.div(1e6).toNumber())[0].getUTCFullYear()}function Nn(n,t,e){const[o,r]=Yn(Sn(n,t,e));return H(o.getUTCDay()+r,7)||7}function Yn(n){const t=R(n);let e,o=0;for(;o<31;o++){const r=new Date(n-t*o*864e5);if(!En(r)){e=r;break}}return void 0===e&&Zn(),[e,t*o]}function En(n){return isNaN(n.valueOf())}function Zn(){throw new RangeError("Date outside of supported range")}function Cn(n,t){return Math.round((t-n)/864e5)}function Un(n,t){return n+864e5*t}function Pn(n,t){return!Rn(n,t)&&n.calendar.toString()===t.calendar.toString()}function Rn(n,t){return G(Mn(n.getISOFields()),Mn(t.getISOFields()))}function kn(n,t){return P(un(n.getISOFields()),un(t.getISOFields()))}function xn(n,t){return P(n.year,t.year)||P(n.month,t.month)||P(n.day,t.day)}function jn(n,t){return G(n[vn],t[vn])}function qn(n,t,e,o,r){return[n=Number(n),t=c(t,1,o.monthsInYear(n),r),e=c(e,1,o.daysInMonth(n,t),r)]}function Hn(n,t){const[e,o,r]=qn(n.isoYear,n.isoMonth,n.isoDay,wn,t);return{isoYear:e,isoMonth:o,isoDay:r}}function Ln(n,t){return{...Hn(n,t),...Bn(n,t)}}function Bn({isoHour:n,isoMinute:t,isoSecond:e,isoMillisecond:o,isoMicrosecond:r,isoNanosecond:i},s){return{isoHour:n=c(n,0,23,s),isoMinute:t=c(t,0,59,s),isoSecond:e=c(e,0,59,s),isoMillisecond:o=c(o,0,999,s),isoMicrosecond:r=c(r,0,999,s),isoNanosecond:i=c(i,0,999,s)}}const $n={era:String,eraYear:Number,year:Number,month:Number,monthCode:String},An={...$n,day:Number},zn={hour:Number,minute:Number,second:Number,millisecond:Number,microsecond:Number,nanosecond:Number},Wn={era:String,eraYear:Number,year:Number,month:Number,monthCode:String,day:Number},Kn=p(b,(()=>Number));class Gn extends yn{computeFields(n){const t=super.computeFields(n),{year:e}=t;return{...t,era:e<1?"bce":"ce",eraYear:e<1?-(e-1):e}}}const Jn=a("calendarName",{auto:0,never:1,always:2},0),Qn=a("disambiguation",{compatible:0,earlier:1,later:2,reject:3},0);function Vn(n,t=4){const r=d(n),i=r.smallestUnit,s=r.fractionalSecondDigits;let a,u=0,l=1;return void 0!==i?(u=F(i,void 0,0,t),l=e[u],a=o[u]||0):void 0!==s&&"auto"!==s&&(a=c(s,0,9,1),l=Math.pow(10,9-a)),{smallestUnit:u,fractionalSecondDigits:a,roundingFunc:f(n,Math.trunc),incNano:l}}const Xn=a("timeZoneName",{auto:0,never:1},0);function _n(n,t){return nt(n)+"T"+et(n,t)}function nt(n){return tt(n)+"-"+L(n.isoDay,2)}function tt(n){const{isoYear:t}=n;return(t<1e3||t>9999?A(t)+L(Math.abs(t),6):L(t,4))+"-"+L(n.isoMonth,2)}function et(n,t){const e=[L(n.isoHour,2)];return t.smallestUnit<=4&&(e.push(L(n.isoMinute,2)),t.smallestUnit<=3&&e.push(L(n.isoSecond,2)+st(n.isoMillisecond,n.isoMicrosecond,n.isoNanosecond,t.fractionalSecondDigits)[0])),e.join(":")}function ot(n){const[t,e]=ln(Math.abs(n)),o=st(t.isoMillisecond,t.isoMicrosecond,t.isoNanosecond,void 0)[0];return A(n)+L(t.isoHour+24*e,2)+":"+L(t.isoMinute,2)+(t.isoSecond||o?":"+L(t.isoSecond,2)+o:"")}function rt(n,t){return n&&(2===t||1!==t&&"iso8601"!==n)?`[u-ca=${n}]`:""}function it(n){return n.map((([n,t,e])=>{if(e||n){return Math.abs(n).toLocaleString("fullwide",{useGrouping:!1})+t}return""})).join("")}function st(n,t,o,r,i,s){let a=K(n).mult(1e6).add(K(t).mult(1e3)).add(o);i&&(a=q(a,void 0===r?e[s]:Math.pow(10,9-r),i));const c=a.abs(),u=c.div(1e9);let d=L(c.sub(u.mult(1e9)).toNumber(),9);return d=void 0===r?d.replace(/0+$/,""):d.substr(0,r),[d?"."+d:"",u.toNumber()*(a.sign()||1)]}function at(n){g(n,{epochNanoseconds(){return this[vn].toBigInt()},epochMicroseconds(){return this[vn].div(1e3).toBigInt()},epochMilliseconds(){return this[vn].div(1e6).toNumber()},epochSeconds(){return this[vn].div(1e9).toNumber()}})}const ct={calendar:"calendar"};for(const n of M)ct[n]="iso"+((ut=n).charAt(0).toUpperCase()+ut.slice(1));var ut;function dt(n,t=[]){g(n,p(t.concat("calendar"),(n=>function(){return this.getISOFields()[ct[n]]})))}const lt=["era","eraYear","year","month","monthCode","daysInMonth","daysInYear","monthsInYear","inLeapYear"],ht=[...lt,"day","dayOfWeek","dayOfYear","weekOfYear","daysInWeek"];function ft(n,t){g(n,p(t,(n=>function(){const t=this.calendar[n](this);return Object.defineProperty(this,n,{value:t}),t})))}function mt(n,t){(n.prototype||n)[Symbol.toStringTag]="Temporal."+t}const gt=a("offset",{prefer:0,use:1,ignore:2,reject:3});function yt(n,e,o=0){const r=n.getPossibleInstantsFor(e);if(1===r.length)return r[0];if(3===o)throw new RangeError("Ambiguous offset");if(r.length)return r[2===o?1:0];{const r=function(n,e){const o=Tn(e),r=n.getOffsetNanosecondsFor(new Yr(o.sub(t)));return n.getOffsetNanosecondsFor(new Yr(o.add(t)))-r}(n,e),i=n.getPossibleInstantsFor(e.add({nanoseconds:r*(1===o?-1:1)}));return i[1===o?0:i.length-1]}}function wt({year:n,month:t,day:e},o,r,i){n+=o;const s=c(t,1,r.monthsInYear(n),i);let a=t===s?e:1;return a=c(a,1,r.daysInMonth(n,s),i),{year:n,month:s,day:a}}function pt({year:n,month:t,day:e},o,r,i){if(o){if(t+=o,o<0)for(;t<1;)t+=r.monthsInYear(--n);else{let e;for(;t>(e=r.monthsInYear(n));)t-=e,n++}e=c(e,1,r.daysInMonth(n,t),i)}return{year:n,month:t,day:e}}function vt({isoYear:n,isoMonth:t,isoDay:e},o){if(o){let r=Sn(n,t,e);r=Un(r,o),({isoYear:n,isoMonth:t,isoDay:e}=Fn(r))}return{isoYear:n,isoMonth:t,isoDay:e}}function Mt(n,t){if(en(t)>=6)throw new RangeError("Duration cant have units >= days");return n.add(cn(t))}function bt(n,t,e=3,o){const{offsetNanoseconds:r,timeZone:i,Z:s}=n;if(void 0!==r&&2!==e){if(1===e||s)return Mn(n).sub(r);{const o=St(n,r,i,t);if(void 0!==o)return o;if(3===e)throw new RangeError("Mismatching offset/timezone")}}return yt(i,Ho(n),Qn(o))[vn]}function St(n,t,e,o){const r=e.getPossibleInstantsFor(Ho(n)),i=Mn(n),s=o?x(t):t;for(const n of r){const t=n[vn],e=i.sub(t).toNumber();if((o?x(e):e)===s)return t}}function It(n){const{timeZone:t}=n,e={...n,...on,calendar:new mr("iso8601")},o={...vt(e,1),...on,calendar:new mr("iso8601")},r=yt(t,Ho(e))[vn];return yt(t,Ho(o))[vn].sub(r).toNumber()}const Ft="(\\d{2})(:?(\\d{2})(:?(\\d{2})([.,](\\d{1,9}))?)?)?",Tt="([+-])"+Ft,Ot="(Z|"+Tt+")?(\\[([^=\\]]+)\\])?(\\[u-ca=([^\\]]+)\\])?",Dt=Pt("([+-]\\d{6}|\\d{4})-?(\\d{2})"+Ot),Nt=Pt("(--)?(\\d{2})-?(\\d{2})"+Ot),Yt=Pt("([+-]\\d{6}|\\d{4})-?(\\d{2})-?(\\d{2})([T ](\\d{2})(:?(\\d{2})(:?(\\d{2})([.,](\\d{1,9}))?)?)?)?"+Ot),Et=Pt("T?"+Ft+Ot),Zt=Pt(Tt),Ct=/^([-+])?P(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T((\d+)([.,](\d{1,9}))?H)?((\d+)([.,](\d{1,9}))?M)?((\d+)([.,](\d{1,9}))?S)?)?$/i,Ut=/\u2212/g;function Pt(n){return new RegExp(`^${n}$`,"i")}function Rt(n){return n.replace(Ut,"-")}function kt(n){const t=Lt(n);if(!t)throw _t("dateTime",n);return t}function xt(n){const t=Bt(n);if(!t)throw _t("dateTime",n);return t}function jt(n){const t=zt(n);if(void 0===t)throw _t("timeZone",n);return t}function qt(n){let t=function(n){const t=Et.exec(Rt(n));if(t)return Kt(t.slice(1))}(n);if(void 0!==t){if("T"!==n.charAt(0)){const e=$t(n)||At(n);e&&function(n){try{return Hn(n,1),!0}catch(n){return!1}}(e)&&(t=void 0)}}else t=Bt(n,!0);if(void 0===t)throw _t("time",n);return t}const Ht=/^Z$/i;function Lt(n){const t=Yt.exec(Rt(n));if(t)return function(n){const t=n[11];let e,o=!1;t&&(o=Ht.test(t),e=o?0:Gt(n.slice(12)));return{...Wt(n),timeZone:n[21],offsetNanoseconds:e,Z:o}}(t.slice(1))}function Bt(n,t,e){const o=Yt.exec(Rt(n));if(o&&(e||!Ht.test(o[12]))&&(!t||o[4]))return Wt(o.slice(1))}function $t(n){const t=Dt.exec(Rt(n));if(t)return{calendar:(e=t.slice(1))[14],isoYear:Vt(e[0]),isoMonth:Vt(e[1]),isoDay:1};var e}function At(n){const t=Nt.exec(Rt(n));if(t)return{calendar:(e=t.slice(1))[15],isoYear:pn,isoMonth:Vt(e[1]),isoDay:Vt(e[2])};var e}function zt(n){const t=Zt.exec(Rt(n));if(t)return Gt(t.slice(1))}function Wt(n){return{calendar:n[23],isoYear:Vt(n[0]),isoMonth:Vt(n[1]),isoDay:Vt(n[2]),...Kt(n.slice(4))}}function Kt(n){const t=Qt(n[4]);return{...ln(Jt(n[6]||""))[0],isoHour:Qt(n[0]),isoMinute:Qt(n[2]),isoSecond:60===t?59:t}}function Gt(t){return("+"===t[0]?1:-1)*function(t){return Qt(t[0])*n+6e10*Qt(t[2])+1e9*Qt(t[4])+Jt(t[6]||"")}(t.slice(1))}function Jt(n){return parseInt(B(n,9,"0"))}function Qt(n){return parseInt(n||"0")}function Vt(n){return parseInt(n||"1")}function Xt(n){return void 0===n?void 0:parseInt(n)}function _t(n,t){throw new RangeError(`Cannot parse ${n} '${t}'`)}function ne(n){return{...n,calendar:void 0===n.calendar?gr():new mr(n.calendar)}}function te(n){return{...ne(n),timeZone:new we(n.timeZone)}}class ee{constructor(n){this.id=n}}class oe extends ee{constructor(n,t){super(n),this.offsetNano=t}getPossibleOffsets(){return[this.offsetNano]}getOffset(){return this.offsetNano}getTransition(){}}function re(n,t){const e={},o=n.formatToParts(t);for(const n of o)e[n.type]=n.value;return e}const ie={bc:"bce",ad:"ce"};function se(n){return n=n.toLowerCase().normalize("NFD").replace(/[^a-z0-9]/g,""),ie[n]||n}const ae=Intl.DateTimeFormat;function ce(n){return[].concat(n||[])}const ue={"Pacific/Apia":{2011:[[de(13017528e5),-36e12,-396e11],[de(13168728e5),-396e11,-36e12],[de(13252392e5),-36e12,504e11]]}};function de(n){return K(n).mult(1e6)}const le=(new Date).getUTCFullYear()+10,he=[182,91,273];class fe extends ee{constructor(n){const t=new ae("en-GB",{era:"short",year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric",timeZone:n});super(t.resolvedOptions().timeZone),this.format=t,this.yearEndOffsets={},this.transitionsInYear=ue[n]||{}}getPossibleOffsets(n){let t;const e=[this.getTransition(n,-1),this.getTransition(n.sub(1),1)].filter(Boolean);for(const o of e){const[e,r,i]=o,s=n.sub(r),a=n.sub(i);if(G(e,s)>0&&G(e,a)>0)return[r];if(!(G(e,s)<=0&&G(e,a)<=0))return r<i?[]:[r,i];t=i}return void 0!==t?[t]:[1e9*this.getYearEndOffsetSec(Dn(n))]}getOffset(n){return 1e9*this.getOffsetForEpochSecs(n.div(1e9).toNumber())}getOffsetForEpochSecs(n){const t=re(this.format,1e3*n);let e=parseInt(t.year);"bce"===se(t.era)&&(e=-(e-1));const o=Sn(e,parseInt(t.month),parseInt(t.day),parseInt(t.hour),parseInt(t.minute),parseInt(t.second));return Math.floor(o/1e3)-n}getTransition(n,t){let e=Dn(n);if(e>le){const o=this.getTransitionFrom(e,e+t,t,n);if(o||t>0)return o;e=le}return this.getTransitionFrom(Math.max(e,1847),t<0?1846:le,t,n)}getTransitionFrom(n,t,e,o){for(;n!==t;n+=e){let t=this.getTransitionsInYear(n);e<0&&(t=t.slice().reverse());for(const n of t)if(G(n[0],o)===e)return n}}getYearEndOffsetSec(n){const{yearEndOffsets:t}=this;return t[n]||(t[n]=this.getOffsetForEpochSecs(On(n+1)-1))}getTransitionsInYear(n){const{transitionsInYear:t}=this;return t[n]||(t[n]=this.computeTransitionsInYear(n))}computeTransitionsInYear(n){const t=this.getYearEndOffsetSec(n-1),e=this.getYearEndOffsetSec(n),o=On(n)-1,r=On(n+1)-1;if(t!==e)return[this.searchTransition(o,r,t,e)];const i=this.searchIsland(t,o);return void 0!==i?[this.searchTransition(o,i[0],t,i[1]),this.searchTransition(i[0],r,i[1],e)]:[]}searchTransition(n,t,e,o){for(;t-n>1;){const o=Math.floor(n+(t-n)/2);this.getOffsetForEpochSecs(o)===e?n=o:t=o}return[K(t).mult(1e9),1e9*e,1e9*o]}searchIsland(n,t){for(const e of he){const o=t+86400*e,r=this.getOffsetForEpochSecs(o);if(r!==n)return[o,r]}}}const me={UTC:new oe("UTC",0)};const[ge,ye]=m();class we extends Y{constructor(n){if(!n)throw new RangeError("Invalid timezone ID");super(),ye(this,function(n){const e=(n=String(n)).toLocaleUpperCase();if(me[e])return me[e];const o=zt(n);if(void 0!==o){if(Math.abs(o)>t)throw new RangeError("Offset out of bounds");return new oe(ot(o),o)}return me[e]=new fe(n)}(n))}static from(n){if(h(n))return function(n){const t=n.timeZone;if(void 0===t)return n;if(h(t)&&void 0===t.timeZone)return t;return new we(t)}(n);const t=Lt(String(n));if(t){if(t.timeZone){const n=te(t);return function(n){const{offsetNanoseconds:t,timeZone:e,Z:o}=n;if(void 0!==t&&!o&&void 0===St(n,t,e,!0))throw new RangeError("Mismatching offset/timezone")}(n),n.timeZone}if(t.Z)return new we("UTC");if(void 0!==t.offsetNanoseconds)return new we(ot(t.offsetNanoseconds))}return new we(String(n))}get id(){return this.toString()}getOffsetStringFor(n){return ot(this.getOffsetNanosecondsFor(n))}getOffsetNanosecondsFor(n){const t=N(Yr,n);return ge(this).getOffset(t[vn])}getPlainDateTimeFor(n,t=gr()){const e=N(Yr,n);return Ho({...In(e[vn].add(this.getOffsetNanosecondsFor(e))),calendar:N(mr,t)})}getInstantFor(n,t){return yt(this,N(qo,n),Qn(t))}getPossibleInstantsFor(n){const t=Mn(N(qo,n).getISOFields());return ge(this).getPossibleOffsets(t).map((n=>new Yr(t.sub(n))))}getPreviousTransition(n){const t=N(Yr,n),e=ge(this).getTransition(t[vn],-1);return e?new Yr(e[0]):null}getNextTransition(n){const t=N(Yr,n),e=ge(this).getTransition(t[vn],1);return e?new Yr(e[0]):null}toString(){return ge(this).id}}function pe(n){if(void 0===n.timeZone)throw new TypeError("Must specify timeZone");return N(we,n.timeZone)}mt(we,"TimeZone");const ve=Le((function(n,t,e){const o=Ce(n,t,e);if(o)return{...o,timeZone:pe(n),offsetNanoseconds:void 0!==n.offset?jt(String(n.offset)):void 0}})),Me=Le(Ce),be=Le(Ue),Se=Le((function(n,t){const e=pr(n),o=je(n,$n,e);if(Be(o))return e.yearMonthFromFields(o,t)})),Ie=Le((function(n,t){const e=pr(n),o=je(n,Wn,e);if(Be(o))return void 0===n.year&&void 0===n.calendar&&(o.year=pn),e.monthDayFromFields(o,t)})),Fe=Le(Pe),Te=Le((function(n,t,e,o){const r=Re(n,t,e,o),i=void 0!==t.offset;if(r||i)return{...r||n.getISOFields(),timeZone:n.timeZone,offsetNanoseconds:i?jt(String(t.offset)):n.offsetNanoseconds}}),!0),Oe=Le(Re,!0),De=Le(ke,!0),Ne=Le((function(n,t,e){const o=n.calendar;if(Be(je(t,$n,o))){const r=He(n,t,$n,o);return o.yearMonthFromFields(r,e)}}),!0),Ye=Le((function(n,t,e){const o=n.calendar;if(Be(je(t,Wn,o))){const r=He(n,t,Wn,o);return o.monthDayFromFields(r,e)}}),!0),Ee=Le(xe,!0),Ze=Le((function(n){const t=u(n,Kn);if(Be(t))return t}));function Ce(n,t,e){const o=Ue(n,e),r=Pe(n,t);if(o)return{...o.getISOFields(),...r||on}}function Ue(n,t){const e=pr(n),o=je(n,An,e);if(Be(o))return e.dateFromFields(o,t)}function Pe(n,t){const e=u(n,zn);if(Be(e))return Bn(sn(e),t)}function Re(n,t,e,o){const r=ke(n,t,o),i=xe(n,t,e);if(r||i)return{...n.getISOFields(),...r?r.getISOFields():{},...i}}function ke(n,t,e){const o=n.calendar,r=je(t,An,o);if(Be(r)){const t=He(n,r,An,o);return o.dateFromFields(t,e)}}function xe(n,t,e){const o=u(t,zn);if(Be(o)){return Bn(sn((r=n,i=o,y(zn,((n,t)=>{var e;return null!=(e=i[t])?e:r[t]})))),e)}var r,i}function je(n,t,e){let o=Object.keys(t);return o=e.fields?Array.prototype.slice.call(e.fields(o)):Object.keys(qe(e,o)),qe(n,o)}function qe(n,t){const e={};for(const o of t)void 0!==n[o]&&(e[o]=n[o]);return e}function He(n,t,e,o){const r=je(n,e,o);return o.mergeFields?o.mergeFields(r,t):yr(r,t)}function Le(n,t){return(...e)=>{if(t){const n=e[1];if(!h(n))throw new TypeError("must be object-like");if(void 0!==n.calendar)throw new TypeError("calendar not allowed");if(void 0!==n.timeZone)throw new TypeError("timeZone not allowed")}const o=n(...e);if(!o)throw new TypeError("No valid fields");return o}}function Be(n){return Object.keys(n).length>0}const $e=K(t).mult(1e8),Ae=$e.mult(-1),ze=$e.add(86399999999999),We=Ae.sub(86399999999999);function Ke(n,t){const e=Mn(n);Ge(e),cr(e,t)}function Ge(n){-1!==G(n,We)&&1!==G(n,ze)||Zn()}function Je(n,t){const e=Xe(un(n),t),[o,r]=ln(e);return{...vt(n,r),...o}}function Qe(n,t){const e=Xe(un(n),t),[o]=ln(e);return o}function Ve(n,t){const[e,o]=function(n){const t=In(n);return[bn(t.isoYear,t.isoMonth,t.isoDay),un(t)]}(n),r=Xe(o,t);return e.add(r)}function Xe(n,t){return k(n,t.incNano,t.roundingFunc)}function _e(n,t,e){return(o,r)=>{const i=io(n,r)?{}:{...n,...t};return{buildKey:ro(o,r,!1),buildFormat:function(n,t){return new ae(o,{calendar:n,timeZone:t||void 0,...i,...r,...e})},buildEpochMilli:no}}}function no(n){return n.epochMilliseconds}function to(n,t,e){return(o,r)=>{const i=io(n,r)?{}:n;return{buildKey:ro(o,r,e),buildFormat:function(n,e){return new ae(o,{calendar:n,...i,...r,...t,timeZone:e,timeZoneName:void 0})},buildEpochMilli:void 0!==r.timeZone?eo.bind(null,new we(r.timeZone)):oo}}}function eo(n,t){const e=Ho({...on,...t.getISOFields()});return n.getInstantFor(e).epochMilliseconds}function oo(n){return Sn((t=n.getISOFields()).isoYear,t.isoMonth,t.isoDay,t.isoHour,t.isoMinute,t.isoSecond,t.isoMillisecond);var t}function ro(n,t,e){var o;const r=null!=(o=t.calendar)?o:function(n){for(const t of n){const n=t.match(/-u-ca-(.*)$/);if(n)return n[1]}return}(n),i=t.timeZone;return function(n,t){var o,s,a,c;const u=null==(o=n.calendar)?void 0:o.id,d=null==(s=n.timeZone)?void 0:s.id;if(t){if((null==(a=t.calendar)?void 0:a.id)!==u)throw new RangeError("Mismatching calendar");if((null==(c=t.timeZone)?void 0:c.id)!==d)throw new RangeError("Mismatching timeZone")}if((e||"iso8601"!==u)&&void 0!==u&&void 0!==r&&r!==u)throw new RangeError("Non-iso calendar mismatch");if(void 0!==d&&void 0!==i&&i!==d)throw new RangeError("Given timeZone must agree");return[r||u||"iso8601",i||d||"UTC"]}}function io(n,t){for(const e in n)if(void 0!==t[e])return!0;return!1}function so(n,t){n.prototype.toLocaleString=function(n,e){const o=t(ce(n),e||{});return o.buildFormat(...o.buildKey(this)).format(o.buildEpochMilli(this))},n.prototype[D]=t}function ao(n){return null==n?void 0:n[D]}function co(n){const t=function(n){const t=Ct.exec(Rt(n));if(t){let n,e,o,r;[n,r]=uo(t[8],t[10],5,void 0),[e,r]=uo(t[12],t[14],4,r),[o,r]=uo(t[16],t[18],3,r);const i=function(n){const t={};for(const e in n)void 0!==n[e]&&(t[e]=n[e]);return t}({years:Xt(t[2]),months:Xt(t[3]),weeks:Xt(t[4]),days:Xt(t[5]),hours:n,minutes:e,seconds:o});if(!Object.keys(i).length)throw new RangeError("Duration string must have at least one field");const s=dn(K(r||0),2);i.milliseconds=s.milliseconds,i.microseconds=s.microseconds,i.nanoseconds=s.nanoseconds;let a=nn(i);return"-"===t[1]&&(a=X(a)),a}}(n);if(void 0===t)throw _t("duration",n);return t}function uo(n,t,o,r){if(void 0!==n){if(void 0!==r)throw new RangeError("Partial units must be last unit");return[parseInt(n),void 0!==t?Jt(t)*(e[o]/1e9):void 0]}if(void 0!==r){const n=Math.trunc(r/e[o]);return[n,r-n*e[o]]}return[void 0,void 0]}const lo=a("offset",{auto:0,never:1},0);class ho extends U{constructor(n=0,t=0,e=0,o=0,r=0,i=0){super({...Bn({isoHour:n,isoMinute:t,isoSecond:e,isoMillisecond:o,isoMicrosecond:r,isoNanosecond:i},1),calendar:gr()})}static from(n,t){const e=s(t);return fo(n instanceof ho?n.getISOFields():"object"==typeof n?Fe(n,e):qt(String(n)))}static compare(n,t){return kn(N(ho,n),N(ho,t))}with(n,t){return fo(Ee(this,n,s(t)))}add(n){return go(this,N(ko,n))}subtract(n){return go(this,X(N(ko,n)))}until(n,t){return yo(this,N(ho,n),t)}since(n,t){return yo(N(ho,n),this,t)}round(n){const t=O(n,0,5);return fo(Qe(this.getISOFields(),t))}equals(n){return!kn(this,N(ho,n))}toString(n){const t=Vn(n);return et(Qe(this.getISOFields(),t),t)}toZonedDateTime(n){const t=N(Sr,n.plainDate),e=N(we,n.timeZone);return Fo({...t.getISOFields(),...this.getISOFields(),timeZone:e})}toPlainDateTime(n){return N(Sr,n).toPlainDateTime(this)}}function fo(n){return new ho(n.isoHour,n.isoMinute,n.isoSecond,n.isoMillisecond,n.isoMicrosecond,n.isoNanosecond)}function mo(n){return N(ho,null!=n?n:{hour:0})}function go(n,t){return fo(function(n,t){const e=un(n)+cn(t).toNumber(),[o]=ln(e);return o}(n.getISOFields(),t))}function yo(n,t,o){const r=T(o,5,0,0,5);return xo(function(n,t,o){return dn(K(k(un(t)-un(n),e[o.smallestUnit]*o.roundingIncrement,o.roundingFunc)),o.largestUnit)}(n.getISOFields(),t.getISOFields(),r))}mt(ho,"PlainTime"),dt(ho,v),so(ho,(function(n,t){return{buildKey:()=>["",""],buildFormat:()=>new ae(n,{hour:"numeric",minute:"2-digit",second:"2-digit",...t,timeZone:"UTC",timeZoneName:void 0,year:void 0,month:void 0,day:void 0,weekday:void 0}),buildEpochMilli:n=>Math.trunc(un(n.getISOFields())/1e6)}}));const wo={day:1};class po extends U{constructor(n,t,e=gr(),o=1){const r=Hn({isoYear:n,isoMonth:t,isoDay:o},1),i=N(mr,e);var s,a;s=r,a=i.toString(),cr(Mn(s),a),super({...r,calendar:i})}static from(n,t){if(s(t),n instanceof po)return vo(n.getISOFields());if("object"==typeof n)return Se(n,t);const e=function(n){const t=$t(n)||Bt(n);if(!t)throw _t("yearMonth",n);return t}(String(n));return void 0===e.calendar&&(e.isoDay=1),vo(ne(e))}static compare(n,t){return Rn(N(po,n),N(po,t))}with(n,t){return Ne(this,n,t)}add(n,t){return Mo(this,N(ko,n),t)}subtract(n,t){return Mo(this,X(N(ko,n)),t)}until(n,t){return bo(this,N(po,n),!1,t)}since(n,t){return bo(this,N(po,n),!0,t)}equals(n){return!Rn(this,N(po,n))}toString(n){const t=this.getISOFields(),e=t.calendar.toString(),o=Jn(n);return("iso8601"===e?tt(t):nt(t))+rt(e,o)}toPlainDate(n){return this.calendar.dateFromFields({year:this.year,month:this.month,day:n.day})}}function vo(n){return new po(n.isoYear,n.isoMonth,n.calendar,n.isoDay)}function Mo(n,t,e){return n.toPlainDate({day:t.sign<0?n.daysInMonth:1}).add(t,e).toPlainYearMonth()}function bo(n,t,e,o){return xo(Or(n.toPlainDate(wo),t.toPlainDate(wo),vr(n,t),e,T(o,9,8,8,9)))}mt(po,"PlainYearMonth"),dt(po),ft(po,lt),so(po,to({year:"numeric",month:"numeric"},{weekday:void 0,day:void 0,hour:void 0,minute:void 0,second:void 0},!0));const So=Symbol();class Io extends U{constructor(n,t,e=gr()){const o=N(we,t),r=N(mr,e),i=K(n),[s,a]=To(i,o);Ke(s,r.toString()),super({...s,calendar:r,timeZone:o,offset:ot(a)}),this[vn]=i,this[So]=a}static from(n,t){const e=gt(t,3),o=s(t);if(n instanceof Io)return new Io(n.epochNanoseconds,n.timeZone,n.calendar);const r="object"==typeof n;return Fo(r?ve(n,o,t):te(kt(String(n))),!r,e,t)}static compare(n,t){return jn(N(Io,n),N(Io,t))}get timeZone(){return this.getISOFields().timeZone}get offsetNanoseconds(){return this[So]}get offset(){return this.getISOFields().offset}with(n,t){Qn(t);const e=s(t),o=gt(t,0);return Fo(Te(this,n,e,t),!1,o,t)}withPlainDate(n){const t=N(Sr,n),e=t.toPlainDateTime(this),{timeZone:o}=this,r=yt(o,e);return new Io(r.epochNanoseconds,o,Mr(this,t))}withPlainTime(n){return Fo({...this.getISOFields(),...void 0===n?on:N(ho,n).getISOFields()})}withCalendar(n){return new Io(this.epochNanoseconds,this.timeZone,n)}withTimeZone(n){return new Io(this.epochNanoseconds,n,this.calendar)}add(n,t){return Oo(this,N(ko,n),t)}subtract(n,t){return Oo(this,X(N(ko,n)),t)}until(n,t){return No(this,N(Io,n),!1,t)}since(n,t){return No(this,N(Io,n),!0,t)}round(n){return Do(this,O(n,0,6))}equals(n){return t=this,e=N(Io,n),Pn(t,e)&&t.timeZone.toString()===e.timeZone.toString();var t,e}startOfDay(){return Fo({...this.getISOFields(),...on,offsetNanoseconds:this.offsetNanoseconds},!1,0)}get hoursInDay(){return It(this.getISOFields())/n}toString(n){const t=Vn(n),e=lo(n),o=Xn(n),r=Jn(n),i=Do(this,t);return _n(i.getISOFields(),t)+(0===e?ot(x(i.offsetNanoseconds)):"")+(s=this.timeZone.toString(),1!==o?`[${s}]`:"")+rt(this.calendar.toString(),r);var s}toPlainYearMonth(){return vo(this.getISOFields())}toPlainMonthDay(){return this.calendar.monthDayFromFields(this)}toPlainDateTime(){return Ho(this.getISOFields())}toPlainDate(){return Ir(this.getISOFields())}toPlainTime(){return fo(this.getISOFields())}toInstant(){return new Yr(this.epochNanoseconds)}}function Fo(n,t,e,o){const r=bt(n,t,e,o);return new Io(r,n.timeZone,n.calendar)}function To(n,t){const e=new Yr(n),o=t.getOffsetNanosecondsFor(e);return[In(n.add(o)),o]}function Oo(n,t,e){const o=n.getISOFields(),r=function(n,t,e){const{calendar:o,timeZone:r}=n,i=o.dateAdd(Ir(n),_(t,rn),e);return yt(r,Ho({...n,...i.getISOFields()}))[vn].add(cn(t))}(o,t,e);return new Io(r,o.timeZone,o.calendar)}function Do(n,t){const e=n.getISOFields(),o=function(n,t,e){const{calendar:o,timeZone:r}=n;let i,s,a=un(n);return 6===e.smallestUnit?(i=on,s=e.roundingFunc(a/It(n))):(a=Xe(a,e),[i,s]=ln(a)),bt({...vt(n,s),...i,offsetNanoseconds:t,calendar:o,timeZone:r},!1,0)}(e,n.offsetNanoseconds,t);return new Io(o,e.timeZone,e.calendar)}function No(n,t,e,o){const r=T(o,5,0,0,9),{largestUnit:i}=r;if(i>=6&&n.timeZone.id!==t.timeZone.id)throw new Error("Must be same timeZone");return xo(Tr(n,t,vr(n,t),e,r))}function Yo(n){if(void 0===n)return;if(h(n))return n instanceof Io||n instanceof qo?n:N(void 0!==n.timeZone?Io:qo,n);if("symbol"==typeof n)throw new TypeError("Incorrect relativeTo type");const t=Lt(String(n));if(t)return void 0!==t.timeZone?Fo(te(t),!0):Ho(ne(t));throw new RangeError("Invalid value of relativeTo")}function Eo(n,t,e,o){return(e instanceof Sr?function(n,t,e,o){const r=e.add(n);return[o.dateUntil(e,r,{largestUnit:M[t]}),r]}(n,Math.max(6,t),e,o):Zo(n,t,e,o))[0]}function Zo(n,t,e,o,r){const i=!0!==r&&t>7&&n.weeks;i&&(n=_(n,{weeks:0}));let s=e.add(n),a=Dr(e,s,o,t);return i&&(a=_(a,{weeks:i}),s=s.add({weeks:i})),[a,s]}function Co(n,t,e,o){const r=b[t],{sign:i}=n;if(!i)return n;const s={};for(let e=9;e>=t;e--){const t=b[e];s[t]=n[t]}const a={[r]:i},c=e.add(s),u=c.add(a),d=Tn(c),l=Tn(u),h=Tn(o).sub(d).toNumber()/l.sub(d).toNumber()*i;return s[r]+=h,s}function Uo(n,t,o,r,s,a){const{largestUnit:c,smallestUnit:u,roundingIncrement:d,roundingFunc:l}=a;if(!i(c)){return dn(q(Tn(o).sub(Tn(t)).mult(s?-1:1),e[u]*d,l),c)}let h=Co(n,u,t,o);const f=b[u];function m(){const n=h[f];h[f]=k(n,d,l)}return l===Math.round&&m(),s&&(h=X(h)),l!==Math.round&&m(),u>0&&(h=s?X(Eo(X(h),c,t,r)):Eo(h,c,t,r)),h}mt(Io,"ZonedDateTime"),dt(Io,v),ft(Io,ht),at(Io),so(Io,_e({year:"numeric",month:"numeric",day:"numeric",weekday:void 0,hour:"numeric",minute:"2-digit",second:"2-digit"},{timeZoneName:"short"},{}));const[Po,Ro]=m();class ko extends E{constructor(n=0,t=0,e=0,o=0,r=0,i=0,s=0,a=0,c=0,u=0){super();const d=Ze({years:n,months:t,weeks:e,days:o,hours:r,minutes:i,seconds:s,milliseconds:a,microseconds:c,nanoseconds:u});Ro(this,function(n){const t=nn(n),{sign:e}=t;for(const n of b){const o=t[n],r=R(t[n]);if(r&&r!==e)throw new RangeError("All fields must be same sign");if(!Number.isInteger(o))throw new RangeError("Duration fields must be integers")}return t}(d))}static from(n){return xo("object"==typeof n?Ze(n):co(n))}static compare(n,t,e){return function(n,t,e){if(void 0===e&&en(n)<=6&&en(t)<=6)return G(an(n),an(t));if(!e)throw new RangeError("Need relativeTo");const o=e.add(n),r=e.add(t);return void 0!==e[vn]?jn(o,r):Rn(o,r)}(N(ko,n),N(ko,t),Yo(d(e).relativeTo))}get years(){return Po(this).years}get months(){return Po(this).months}get weeks(){return Po(this).weeks}get days(){return Po(this).days}get hours(){return Po(this).hours}get minutes(){return Po(this).minutes}get seconds(){return Po(this).seconds}get milliseconds(){return Po(this).milliseconds}get microseconds(){return Po(this).microseconds}get nanoseconds(){return Po(this).nanoseconds}get sign(){return Po(this).sign}get blank(){return!this.sign}with(n){return xo({...Po(this),...Ze(n)})}negated(){return xo(X(Po(this)))}abs(){return xo(w(Po(this),V,(n=>Math.abs(n))))}add(n,t){return jo(this,N(ko,n),t)}subtract(n,t){return jo(this,X(N(ko,n)),t)}round(n){const t="string"==typeof n?{smallestUnit:n}:n;if(!h(t))throw new TypeError("Must specify options");if(void 0===t.largestUnit&&void 0===t.smallestUnit)throw new RangeError("Must specify either largestUnit or smallestUnit");const o=T(t,en(this),0,0,9,!0),i=Yo(t.relativeTo);return xo(function(n,t,o,i){const{largestUnit:s,smallestUnit:a,roundingIncrement:c,roundingFunc:u}=t;if(void 0===o&&en(n)<=6&&r(s)&&r(a))return dn(q(an(n),e[a]*c,u),s);if(!o)throw new RangeError("Need relativeTo");const[d,l]=Zo(n,s,o,i);return Uo(d,o,l,i,!1,t)}(this,o,i,i?i.calendar:void 0))}total(n){const t=function(n){let t,e;return"string"==typeof n?e=n:(e=d(n).unit,t=n.relativeTo),{unit:F(e,void 0,0,9),relativeTo:t}}(n),o=Yo(t.relativeTo);return function(n,t,o,i){if(void 0===o&&en(n)<=6&&r(t))return an(n).toNumber()/e[t];if(!o)throw new RangeError("Need relativeTo");const[s,a]=Zo(n,t,o,i,!0);return Co(s,t,o,a)[b[t]]}(this,t.unit,o,o?o.calendar:void 0)}toString(n){const t=Vn(n,3);return function(n,t){const{smallestUnit:e,fractionalSecondDigits:o,roundingFunc:r}=t,{sign:i}=n,s=n.hours,a=n.minutes;let c=n.seconds,u="";if(e<=3){const t=st(n.milliseconds,n.microseconds,n.nanoseconds,o,r,e);u=t[0],c+=t[1]}const d=void 0!==o||u||!i;return(i<0?"-":"")+"P"+it([[n.years,"Y"],[n.months,"M"],[n.weeks,"W"],[n.days,"D"]])+(s||a||c||d?"T"+it([[s,"H"],[a,"M"],[e<=3?c:0,u+"S",d]]):"")}(Po(this),t)}toLocaleString(n,t){return this.toString()}}function xo(n){return new ko(n.years,n.months,n.weeks,n.days,n.hours,n.minutes,n.seconds,n.milliseconds,n.microseconds,n.nanoseconds)}function jo(n,t,e){const o=Yo(d(e).relativeTo);return xo(function(n,t,e,o){const r=Math.max(en(n),en(t));if(void 0===e&&r<=6)return dn(an(n).add(an(t)),r);if(!e)throw new RangeError("Need relativeTo");const i=e.add(n).add(t);return Dr(e,i,o,r)}(n,t,o,o?o.calendar:void 0))}mt(ko,"Duration");class qo extends U{constructor(n,t,e,o=0,r=0,i=0,s=0,a=0,c=0,u=gr()){const d=Ln({isoYear:n,isoMonth:t,isoDay:e,isoHour:o,isoMinute:r,isoSecond:i,isoMillisecond:s,isoMicrosecond:a,isoNanosecond:c},1),l=N(mr,u);Ke(d,l.toString()),super({...d,calendar:l})}static from(n,t){const e=s(t);return Ho(n instanceof qo?n.getISOFields():"object"==typeof n?Me(n,e,t):ne(xt(String(n))))}static compare(n,t){return Rn(N(qo,n),N(qo,t))}with(n,t){const e=s(t);return Ho(Oe(this,n,e,t))}withPlainDate(n){const t=N(Sr,n);return Ho({...this.getISOFields(),...t.getISOFields(),calendar:Mr(this,t)})}withPlainTime(n){return Ho({...this.getISOFields(),...mo(n).getISOFields()})}withCalendar(n){return Ho({...this.getISOFields(),calendar:N(mr,n)})}add(n,t){return Lo(this,N(ko,n),t)}subtract(n,t){return Lo(this,X(N(ko,n)),t)}until(n,t){return Bo(this,N(qo,n),!1,t)}since(n,t){return Bo(this,N(qo,n),!0,t)}round(n){const t=O(n,0,6);return Ho({...Je(this.getISOFields(),t),calendar:this.calendar})}equals(n){return Pn(this,N(qo,n))}toString(n){const t=Vn(n),e=Jn(n);return _n(Je(this.getISOFields(),t),t)+rt(this.calendar.toString(),e)}toZonedDateTime(n,t){const e=N(we,n),o=yt(e,this,Qn(t));return new Io(o.epochNanoseconds,e,this.calendar)}toPlainYearMonth(){return vo(this.getISOFields())}toPlainMonthDay(){return this.calendar.monthDayFromFields(this)}toPlainDate(){return Ir(this.getISOFields())}toPlainTime(){return fo(this.getISOFields())}}function Ho(n){return new qo(n.isoYear,n.isoMonth,n.isoDay,n.isoHour,n.isoMinute,n.isoSecond,n.isoMillisecond,n.isoMicrosecond,n.isoNanosecond,n.calendar)}function Lo(n,t,e){const o=function(n,t,e){const{calendar:o}=n;return In(Mn(o.dateAdd(Ir(n),_(t,rn),e).getISOFields()).add(un(n)).add(cn(t)))}(n.getISOFields(),t,e);return Ho({...o,calendar:n.calendar})}function Bo(n,t,e,o){const r=T(o,6,0,0,9);return xo(Tr(n,t,vr(n,t),e,r))}mt(qo,"PlainDateTime"),dt(qo,v),ft(qo,ht),so(qo,to({year:"numeric",month:"numeric",day:"numeric",weekday:void 0,hour:"numeric",minute:"2-digit",second:"2-digit"},{}));class $o extends U{constructor(n,t,e=gr(),o=pn){super({...Hn({isoYear:o,isoMonth:n,isoDay:t},1),calendar:N(mr,e)})}static from(n,t){if(s(t),n instanceof $o)return Ao(n.getISOFields());if("object"==typeof n)return Ie(n,t);const e=function(n){const t=At(n)||Bt(n);if(!t)throw _t("monthDay",n);return t}(String(n));return void 0===e.calendar&&(e.isoYear=pn),Ao(ne(e))}with(n,t){return Ye(this,n,t)}equals(n){return!Rn(this,N($o,n))}toString(n){const t=this.getISOFields(),e=t.calendar.toString(),o=Jn(n);return("iso8601"===e?function(n){return L(n.isoMonth,2)+"-"+L(n.isoDay,2)}(t):nt(t))+rt(e,o)}toPlainDate(n){return this.calendar.dateFromFields({year:n.year,monthCode:this.monthCode,day:this.day},{overflow:"reject"})}}function Ao(n){return new $o(n.isoMonth,n.isoDay,n.calendar,n.isoYear)}function zo(n){return n instanceof Sr||n instanceof qo||n instanceof Io||n instanceof po||n instanceof $o}function Wo(n,t,e){let o;if(n instanceof Sr)o=n;else if(zo(n)){if(e&&n instanceof $o)throw new TypeError("PlainMonthDay not allowed");o=Ir(n.getISOFields())}else o=Sr.from(n);return br(o.calendar,t),o}function Ko(n,t,e){if(zo(n))return n.getISOFields();let{era:o,eraYear:r,year:i,month:a,monthCode:c,day:u}=n;const d=void 0!==r&&void 0!==o?mn(t.id,r,o):void 0;if(void 0===i){if(void 0===d)throw new TypeError("Must specify either a year or an era & eraYear");i=d}else if(void 0!==d&&d!==i)throw new RangeError("year and era/eraYear must match");if(void 0===u)throw new TypeError("Must specify day");const l=s(e);if(void 0!==c){const[n,e]=t.convertMonthCode(c,i);if(void 0!==a&&a!==n)throw new RangeError("Month doesnt match with monthCode");if(a=n,e){if(1===l)throw new RangeError("Month code out of range");u=t.daysInMonth(i,a)}}else if(void 0===a)throw new TypeError("Must specify either a month or monthCode");return[i,a,u]=qn(i,a,u,t,l),Fn(t.epochMilliseconds(i,a,u))}function Go(n,t){if(zo(n)){if(t&&n instanceof $o)throw new TypeError("PlainMonthDay not allowed");return n.getISOFields()}return Sr.from(n).getISOFields()}function Jo(n,t){return Cn(n.epochMilliseconds(t,1,1),n.epochMilliseconds(t+1,1,1))}function Qo(n,t,e,o){return Cn(n.epochMilliseconds(t,1,1),n.epochMilliseconds(t,e,o))+1}mt($o,"PlainMonthDay"),dt($o),ft($o,["monthCode","day"]),so($o,to({month:"numeric",day:"numeric"},{weekday:void 0,year:void 0,hour:void 0,minute:void 0,second:void 0},!0));const Vo={hebrew:6,chinese:0,dangi:0};class Xo extends fn{constructor(n){const t=_o(n);if(e=n,o=t.resolvedOptions().calendar,gn(e)!==gn(o))throw new RangeError("Invalid calendar: "+n);var e,o;super(n),this.format=t,this.yearCorrection=this.computeFieldsDumb(0).year-1970,this.monthCacheByYear={}}epochMilliseconds(n,t,e){return Un(this.queryMonthCache(n)[0][t-1],e-1)}daysInMonth(n,t){const e=this.queryMonthCache(n)[0],o=e[t-1];t>=e.length&&(n++,t=0);return Cn(o,this.queryMonthCache(n)[0][t])}monthsInYear(n){return this.queryMonthCache(n)[0].length}monthCode(n,t){const e=this.queryLeapMonthByYear(t);return!e||n<e?super.monthCode(n,t):super.monthCode(n-1,t)+(n===e?"L":"")}convertMonthCode(n,t){const e=this.queryLeapMonthByYear(t);let o=/L$/.test(n),r=parseInt(n.substr(1)),i=!1;if(o){const n=Vo[this.id];if(void 0===n)throw new RangeError("Calendar system doesnt support leap months");if(n){if(r!==n-1)throw new RangeError("Invalid leap-month month code")}else if(r<=1||r>=12)throw new RangeError("Invalid leap-month month code")}return!o||e&&r===e-1||(i=!0,o=!1),(o||e&&r>=e)&&r++,[r,i]}inLeapYear(n){const t=Jo(this,n);return t>Jo(this,n-1)&&t>Jo(this,n+1)}guessYearForMonthDay(n,t){let e=1970+this.yearCorrection;const o=e+100;for(;e<o;e++){const[o,r]=this.convertMonthCode(n,e);if(!r&&o<=this.monthsInYear(e)&&t<=this.daysInMonth(e,o))return e}throw new Error("Could not guess year")}normalizeISOYearForMonthDay(n){return n}computeFields(n){const t=this.computeFieldsDumb(n),e=this.queryMonthCache(t.year)[2];return{...t,month:e[t.month]}}computeFieldsDumb(n){const t=re(this.format,n);let e,o,r=parseInt(t.relatedYear||t.year);var i;return t.era&&(i=this.id,void 0!==hn[gn(i)])&&(e=se(t.era),o=r,r=mn(this.id,o,e,!0)),{era:e,eraYear:o,year:r,month:t.month,day:parseInt(t.day)}}queryLeapMonthByYear(n){const t=this.queryMonthCache(n),e=this.queryMonthCache(n-1),o=this.queryMonthCache(n+1);if(t[0].length>e[0].length&&t[0].length>o[0].length){const n=t[1],o=e[1];for(let t=0;t<o.length;t++)if(o[t]!==n[t])return t+1}}queryMonthCache(n){const{monthCacheByYear:t}=this;return t[n]||(t[n]=this.buildMonthCache(n))}buildMonthCache(n){const t=[],e=[],o={};let r=Sn(this.guessISOYear(n),1,1);for(r=Un(r,400);;){const o=this.computeFieldsDumb(r);if(o.year<n)break;r=Un(r,1-o.day),o.year===n&&(t.unshift(r),e.unshift(o.month)),r=Un(r,-1)}for(let n=0;n<e.length;n++)o[e[n]]=n+1;return[t,e,o]}guessISOYear(n){return n-this.yearCorrection}}function _o(n){return new ae("en-US",{calendar:n,era:"short",year:"numeric",month:"short",day:"numeric",timeZone:"UTC"})}const nr=Sn(1868,9,8);const tr={gregory:Gn,japanese:class extends Gn{constructor(){super(...arguments),this.format=_o("japanese")}computeFields(n){const t=super.computeFields(n);if(n>=nr){const e=re(this.format,n);t.era=se(e.era),t.eraYear=parseInt(e.relatedYear||e.year)}return t}},islamic:class extends Xo{guessISOYear(n){return Math.ceil(32*n/33+622)}}},er={iso8601:wn};function or(n){const t=(n=String(n)).toLocaleLowerCase();return er[t]||(er[t]=new(tr[gn(t)]||Xo)(n))}const rr=Sn(1582,10,15),ir=Sn(622,7,18),sr={buddhist:rr,japanese:rr,roc:rr,islamic:ir,"islamic-rgsa":ir,indian:0},ar={};function cr(n,t){return ur(n.div(1e6).toNumber(),t)}function ur(n,t){if(function(n,t){return function(n){let t=ar[n];if(void 0===t){const e=sr[n];if(void 0===e)t=!1;else{let o=or(n);o instanceof Xo||(o=new Xo(n));const r=e-864e5,i=o.computeFields(r);t=r!==o.epochMilliseconds(i.year,i.month,i.day)}ar[n]=t}return t}(t)&&n<sr[t]}(n,t))throw new RangeError("Invalid timestamp for calendar")}function dr(n,t,e){const o=7+t-e;return-H(Nn(n,1,o)-t,7)+o-1}function lr(n,t,e){const o=dr(n,t,e),r=dr(n+1,t,e);return(Jo(wn,n)-o+r)/7}const[hr,fr]=m();class mr extends Y{constructor(n){super(),"islamicc"===n&&(n="islamic-civil"),fr(this,or(n))}static from(n){if(h(n))return function(n){const t=n.calendar;if(void 0===t)return n;if(h(t)&&void 0===t.calendar)return t;return new mr(t)}(n);const t=Bt(String(n),!1,!0);return new mr(t?t.calendar||"iso8601":String(n))}get id(){return this.toString()}era(n){const t=Go(n,!0);return wr(hr(this),t.isoYear,t.isoMonth,t.isoDay).era}eraYear(n){const t=Go(n,!0);return wr(hr(this),t.isoYear,t.isoMonth,t.isoDay).eraYear}year(n){const t=Go(n,!0);return wr(hr(this),t.isoYear,t.isoMonth,t.isoDay).year}month(n){const t=Go(n,!0);return wr(hr(this),t.isoYear,t.isoMonth,t.isoDay).month}monthCode(n){const t=Wo(n,this);return hr(this).monthCode(t.month,t.year)}day(n){const t=Go(n);return wr(hr(this),t.isoYear,t.isoMonth,t.isoDay).day}dayOfWeek(n){const t=Go(n,!0);return Nn(t.isoYear,t.isoMonth,t.isoDay)}dayOfYear(n){const t=Wo(n,this,!0);return Qo(hr(this),t.year,t.month,t.day)}weekOfYear(n){const t=Go(n,!0);return function(n,t,e,o,r){const i=dr(n,o,r),s=Math.floor((Qo(wn,n,t,e)-i-1)/7)+1;if(s<1)return s+lr(n-1,o,r);const a=lr(n,o,r);return s>a?s-a:s}(t.isoYear,t.isoMonth,t.isoDay,1,4)}daysInWeek(n){return Go(n,!0),7}daysInMonth(n){const t=Wo(n,this,!0);return hr(this).daysInMonth(t.year,t.month)}daysInYear(n){const t=Wo(n,this,!0);return Jo(hr(this),t.year)}monthsInYear(n){const t=Wo(n,this,!0);return hr(this).monthsInYear(t.year)}inLeapYear(n){return hr(this).inLeapYear(this.year(n))}dateFromFields(n,t){const e=Ko(u(n,An),hr(this),t);return new Sr(e.isoYear,e.isoMonth,e.isoDay,this)}yearMonthFromFields(n,t){const e=Ko({...u(n,$n),day:1},hr(this),t);return new po(e.isoYear,e.isoMonth,this,e.isoDay)}monthDayFromFields(n,t){const e=hr(this);let{era:o,eraYear:r,year:i,month:s,monthCode:a,day:c}=u(n,Wn);if(void 0===c)throw new TypeError("required property 'day' missing or undefined");if(void 0!==a?i=pn:void 0!==o&&void 0!==r&&(i=mn(e.id,r,o)),void 0===i){if(void 0===a)throw new TypeError("either year or monthCode required with month");i=e.guessYearForMonthDay(a,c)}const d=Ko({year:i,month:s,monthCode:a,day:c},e,t);return new $o(d.isoMonth,d.isoDay,this,e.normalizeISOYearForMonthDay(d.isoYear))}dateAdd(n,e,o){const r=hr(this),i=function(n,e,o,r){n=pt(n=wt(n,e.years,o,r),e.months,o,r);let i=o.epochMilliseconds(n.year,n.month,n.day);const s=Math.trunc(cn(e).div(t).toNumber());return i=Un(i,7*e.weeks+e.days+s),Fn(i)}(N(Sr,n,o),N(ko,e),r,s(o));return new Sr(i.isoYear,i.isoMonth,i.isoDay,this)}dateUntil(n,t,e){const o=hr(this),r=N(Sr,n),i=N(Sr,t),s=d(e).largestUnit,a="auto"===s?6:F(s,6,6,9);return br(this,vr(r,i)),xo(function(n,t,e,o){let r=0,i=0,s=0,a=0;switch(o){case 9:r=function(n,t,e){const[,o,r]=qn(t.year,n.month,n.day,e,0),i=xn(t,n),s=P(t.month,o)||P(t.day,r);return t.year-n.year-(s&&i&&s!==i?i:0)}(n,t,e),n=wt(n,r,e,0);case 8:i=function(n,t,e){let o=0;const r=xn(t,n);if(r){let{year:i}=n;for(;i!==t.year;)o+=e.monthsInYear(i)*r,i+=r;const[,s,a]=qn(t.year,n.month,n.day,e,0);o+=t.month-s;const c=P(t.day,a);c&&r&&c!==r&&(o-=r)}return o}(n,t,e),n=pt(n,i,e,0)}a=Cn(e.epochMilliseconds(n.year,n.month,n.day),e.epochMilliseconds(t.year,t.month,t.day)),7===o&&(s=Math.trunc(a/7),a%=7);return nn({years:r,months:i,weeks:s,days:a,hours:0,minutes:0,seconds:0,milliseconds:0,microseconds:0,nanoseconds:0})}(r,i,o,a))}fields(n){return n.slice()}mergeFields(n,t){return yr(n,t)}toString(){return hr(this).id}}function gr(){return new mr("iso8601")}function yr(n,t){var e;const o={...n,...t};if(void 0!==n.year){delete o.era,delete o.eraYear,delete o.year;let e=!1;void 0===t.era&&void 0===t.eraYear||(o.era=t.era,o.eraYear=t.eraYear,e=!0),void 0!==t.year&&(o.year=t.year,e=!0),e||(o.year=n.year)}if(void 0!==n.monthCode){delete o.monthCode,delete o.month;let e=!1;void 0!==t.month&&(o.month=t.month,e=!0),void 0!==t.monthCode&&(o.monthCode=t.monthCode,e=!0),e||(o.monthCode=n.monthCode)}return void 0!==n.day&&(o.day=null!=(e=t.day)?e:n.day),o}function wr(n,t,e,o){const r=Sn(t,e,o);return ur(r,n.id),n.computeFields(r)}function pr(n){return void 0===n.calendar?gr():N(mr,n.calendar)}function vr(n,t){const{calendar:e}=n;return br(e,t.calendar),e}function Mr(n,t){const e=n.calendar,o=t.calendar;if("iso8601"===e.id)return o;if("iso8601"===o.id)return e;if(e.id!==o.id)throw new RangeError("Non-ISO calendars incompatible");return e}function br(n,t){if(n.toString()!==t.toString())throw new RangeError("Calendars must match")}mt(mr,"Calendar");class Sr extends U{constructor(n,t,e,o=gr()){const r=Hn({isoYear:n,isoMonth:t,isoDay:e},1),i=N(mr,o);!function(n,t){const e=Mn(n);Ge(e.add(e.sign()<0?86399999999999:0)),cr(e,t)}(r,i.toString()),super({...r,calendar:i})}static from(n,t){return s(t),n instanceof Sr?Ir(n.getISOFields()):"object"==typeof n?be(n,t):Ir(ne(xt(String(n))))}static compare(n,t){return Rn(N(Sr,n),N(Sr,t))}with(n,t){return De(this,n,t)}withCalendar(n){const t=this.getISOFields();return new Sr(t.isoYear,t.isoMonth,t.isoDay,n)}add(n,t){return this.calendar.dateAdd(this,n,t)}subtract(n,t){return this.calendar.dateAdd(this,N(ko,n).negated(),t)}until(n,t){return Fr(this,N(Sr,n),!1,t)}since(n,t){return Fr(this,N(Sr,n),!0,t)}equals(n){return!Rn(this,N(Sr,n))}toString(n){const t=Jn(n),e=this.getISOFields();return nt(e)+rt(e.calendar.toString(),t)}toZonedDateTime(n){const t=function(n){let t,e;if("string"==typeof n)e=n;else{if("object"!=typeof n)throw new TypeError("Invalid options/timeZone argument");if(void 0!==n.id?e=n:(e=n.timeZone,t=n.plainTime),void 0===e)throw new TypeError("Invalid timeZone argument")}return{plainTime:t,timeZone:e}}(n),e=N(we,t.timeZone),o=void 0===t.plainTime?void 0:N(ho,t.plainTime);return Fo({...this.getISOFields(),...o?o.getISOFields():on,timeZone:e})}toPlainDateTime(n){return Ho({...this.getISOFields(),...mo(n).getISOFields()})}toPlainYearMonth(){return vo(this.getISOFields())}toPlainMonthDay(){return this.calendar.monthDayFromFields(this)}}function Ir(n){return new Sr(n.isoYear,n.isoMonth,n.isoDay,n.calendar)}function Fr(n,t,e,o){return xo(Or(n,t,vr(n,t),e,T(o,6,6,6,9)))}function Tr(n,t,e,o,r){return Uo(Dr(n,t,e,r.largestUnit),n,t,e,o,r)}function Or(n,t,e,o,r){return Uo(e.dateUntil(n,t,{largestUnit:M[r.largestUnit]}),n,t,e,o,r)}function Dr(n,t,e,o){if(!i(o))return Nr(n,t,o);const r=Ir({...n.getISOFields(),calendar:e});let s,a,c,u,d,l=Ir({...t.getISOFields(),calendar:e});do{a=e.dateUntil(r,l,{largestUnit:M[o]}),s=n.add(a),c=Nr(s,t,5),u=a.sign,d=c.sign}while(u&&d&&u!==d&&(l=l.add({days:d})));return f=c,{sign:(h=a).sign||f.sign,years:h.years+f.years,months:h.months+f.months,weeks:h.weeks+f.weeks,days:h.days+f.days,hours:h.hours+f.hours,minutes:h.minutes+f.minutes,seconds:h.seconds+f.seconds,milliseconds:h.milliseconds+f.milliseconds,microseconds:h.microseconds+f.microseconds,nanoseconds:h.nanoseconds+f.nanoseconds};var h,f}function Nr(n,t,e){return dn(Tn(t).sub(Tn(n)),e)}mt(Sr,"PlainDate"),dt(Sr),ft(Sr,ht),so(Sr,to({year:"numeric",month:"numeric",day:"numeric",weekday:void 0},{hour:void 0,minute:void 0,second:void 0}));class Yr extends E{constructor(n){super();const t=K(n,!0);!function(n){-1!==G(n,Ae)&&1!==G(n,$e)||Zn()}(t),this[vn]=t}static from(n){if(n instanceof Yr)return new Yr(n.epochNanoseconds);const t=kt(String(n)),e=t.offsetNanoseconds;if(void 0===e)throw new RangeError("Must specify an offset");return new Yr(Mn(Ln(t,1)).sub(e))}static fromEpochSeconds(n){return new Yr(K(n).mult(1e9))}static fromEpochMilliseconds(n){return new Yr(K(n).mult(1e6))}static fromEpochMicroseconds(n){return new Yr(n*BigInt(1e3))}static fromEpochNanoseconds(n){return new Yr(n)}static compare(n,t){return jn(N(Yr,n),N(Yr,t))}add(n){return new Yr(Mt(this[vn],N(ko,n)))}subtract(n){return new Yr(Mt(this[vn],X(N(ko,n))))}until(n,t){return Er(this,N(Yr,n),t)}since(n,t){return Er(N(Yr,n),this,t)}round(n){const t=O(n,0,5,!0);return new Yr(Ve(this[vn],t))}equals(n){return!jn(this,N(Yr,n))}toString(n){const t=d(n).timeZone;return this.toZonedDateTimeISO(null!=t?t:"UTC").toString({...n,offset:void 0===t?"never":"auto",timeZoneName:"never"})+(void 0===t?"Z":"")}toZonedDateTimeISO(n){return new Io(this.epochNanoseconds,n)}toZonedDateTime(n){if(!h(n))throw new TypeError("Must specify options");if(void 0===n.calendar)throw new TypeError("Must specify a calendar");if(void 0===n.timeZone)throw new TypeError("Must specify a timeZone");return new Io(this.epochNanoseconds,n.timeZone,n.calendar)}}function Er(n,t,o){const r=T(o,3,0,0,5);return xo(function(n,t,o){return dn(q(t.sub(n),e[o.smallestUnit]*o.roundingIncrement,o.roundingFunc),o.largestUnit)}(n[vn],t[vn],r))}mt(Yr,"Instant"),at(Yr),so(Yr,_e({year:"numeric",month:"numeric",day:"numeric",weekday:void 0,hour:"numeric",minute:"2-digit",second:"2-digit"},{timeZoneName:void 0},{}));const Zr=Symbol(),Cr=Symbol(),Ur=Symbol();class Pr extends Intl.DateTimeFormat{constructor(n,t){const e=ce(n),o=function(n){const t={};for(const e in n){let o=n[e];h(o)&&(o=o.toString()),t[e]=o}return t}(t||{});super(e,o),this[Zr]=e,this[Cr]=o,this[Ur]=new Map}format(n){const t=kr(this,n);return t[0]===this?super.format(t[1]):t[0].format(t[1])}formatToParts(n){return super.formatToParts.call(...kr(this,n))}formatRange(n,t){return super.formatRange.call(...xr(this,n,t))}formatRangeToParts(n,t){return super.formatRangeToParts.call(...xr(this,n,t))}}const Rr=Pr;function kr(n,t){const e=ao(t);if(e){const o=jr(n,e);return[o.buildFormat(t),o.buildEpochMilli(t)]}return[n,t]}function xr(n,t,e){const o=ao(t);if(o!==ao(e))throw new TypeError("Mismatch of types");if(o){const r=jr(n,o);return[r.buildFormat(t,e),new Date(r.buildEpochMilli(t)),new Date(r.buildEpochMilli(e))]}return[n,t,e]}function jr(n,t){const e=n[Ur];let o=e.get(t);return o||(o=function(n){const t={};return{buildFormat:function(e,o){const r=n.buildKey(e,o),i=r.join("|");return t[i]||(t[i]=n.buildFormat(...r))},buildEpochMilli:n.buildEpochMilli}}(t(n[Zr],n[Cr])),e.set(t,o)),o}const qr={zonedDateTimeISO:function(n){return Fo(Lr("iso8601",n))},zonedDateTime:function(n,t){return Fo(Lr(n,t))},plainDateTimeISO:function(n){return Ho(Lr("iso8601",n))},plainDateTime:function(n,t){return Ho(Lr(n,t))},plainDateISO:function(n){return Ir(Lr("iso8601",n))},plainDate:function(n,t){return Ir(Lr(n,t))},plainTimeISO:function(n){return fo(Lr("iso8601",n))},instant:function(){return new Yr(Br())},timeZone:Hr};mt(qr,"Now");function Hr(){return new we((new ae).resolvedOptions().timeZone)}function Lr(n,t=Hr()){const e=N(we,t);return{...To(Br(),e)[0],timeZone:e,calendar:N(mr,n)}}function Br(){return K(Date.now()).mult(1e6)}const $r={PlainYearMonth:po,PlainMonthDay:$o,PlainDate:Sr,PlainTime:ho,PlainDateTime:qo,ZonedDateTime:Io,Instant:Yr,Calendar:mr,TimeZone:we,Duration:ko,Now:qr,[Symbol.toStringTag]:"Temporal"};exports.DateTimeFormat=Rr,exports.Temporal=$r,exports.getGlobalThis=function(){return"undefined"!=typeof globalThis?globalThis:window},exports.toTemporalInstant=function(){return Yr.fromEpochMilliseconds(this.valueOf())};


},{}],148:[function(require,module,exports){
Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./common-c8d51eca.cjs");const t=e.Temporal,o={...e.getGlobalThis().Intl,DateTimeFormat:e.DateTimeFormat},r=e.toTemporalInstant;exports.Intl=o,exports.Temporal=t,exports.toTemporalInstant=r;


},{"./common-c8d51eca.cjs":147}],149:[function(require,module,exports){
Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./common-c8d51eca.cjs"),t=require("./impl.cjs");const o=e.getGlobalThis(),r=o.Temporal,a=r||t.Temporal,l=r?o.Intl:t.Intl,p=r?o.Date.prototype.toTemporalInstant:t.toTemporalInstant;exports.Intl=l,exports.Temporal=a,exports.toTemporalInstant=p;


},{"./common-c8d51eca.cjs":147,"./impl.cjs":148}]},{},[4]);
