var Module = Module || {}; Module["wasmBinary"] = (function(source, uncompressedSize) {function base64DecToArr (sBase64) {
function b64ToUint6 (nChr) {

  return nChr > 64 && nChr < 91 ?
      nChr - 65
    : nChr > 96 && nChr < 123 ?
      nChr - 71
    : nChr > 47 && nChr < 58 ?
      nChr + 4
    : nChr === 43 ?
      62
    : nChr === 47 ?
      63
    :
      0;

}

  var
    nInLen = sBase64.length,
    nOutLen = nInLen * 3 + 1 >> 2, taBytes = new Uint8Array(nOutLen);

  for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
    nMod4 = nInIdx & 3;
    nUint24 |= b64ToUint6(sBase64.charCodeAt(nInIdx)) << 6 * (3 - nMod4);
    if (nMod4 === 3 || nInLen - nInIdx === 1) {
      for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
        taBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255;
      }
      nUint24 = 0;

    }
  }

  return taBytes;
}
function uncompress(source, uncompressedSize) {
function uncompressBlock (input, output, sIdx, eIdx) {
 sIdx = sIdx || 0
 eIdx = eIdx || (input.length - sIdx)

 for (var i = sIdx, n = eIdx, j = 0; i < n;) {
  var token = input[i++]


  var literals_length = (token >> 4)
  if (literals_length > 0) {

   var l = literals_length + 240
   while (l === 255) {
    l = input[i++]
    literals_length += l
   }


   var end = i + literals_length
   while (i < end) output[j++] = input[i++]


   if (i === n) return j
  }



  var offset = input[i++] | (input[i++] << 8)


  if (offset === 0) return j
  if (offset > j) return -(i-2)


  var match_length = (token & 0xf)
  var l = match_length + 240
  while (l === 255) {
   l = input[i++]
   match_length += l
  }

  var pos = j - offset
  var end = j + match_length + 4
  while (j < end) output[j++] = output[pos++]
 }

 return j
}
var result = new ArrayBuffer(uncompressedSize);
var sourceIndex = 0;
var destIndex = 0;
var blockSize;
while((blockSize = (source[sourceIndex] | (source[sourceIndex + 1] << 8) | (source[sourceIndex + 2] << 16) | (source[sourceIndex + 3] << 24))) > 0)
{
 sourceIndex += 4;
 if (blockSize & 0x80000000)
 {
  blockSize &= 0x7FFFFFFFF;
  for (var i = 0; i < blockSize; i++) {
   result[destIndex++] = source[sourceIndex++];
  }
 }
 else
 {
  destIndex += uncompressBlock(source, new Uint8Array(result, destIndex, uncompressedSize - destIndex), sourceIndex, sourceIndex + blockSize);
  sourceIndex += blockSize;
 }
}
return new Uint8Array(result, 0, uncompressedSize);
}
return uncompress(base64DecToArr(source), uncompressedSize);})(