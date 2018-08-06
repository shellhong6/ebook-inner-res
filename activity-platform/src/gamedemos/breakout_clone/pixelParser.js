const maxBitLength = 32;
class PixelWord{
  constructor(){
    this.content = '';
    this.bufCount = 0;
    this.width = 0;
    this.height = 0;
  }
/**
 *
 * @param {*} count <= 127
 * @param {int} flag 字节的首位是1还是0,1表示要填充，0表示不填充
 */
  append(count, flag){
    this.content += toByte(count, flag);
    this.bufCount += count;
    return this;
  }
  lineEnd(flag = 0){
    let remain = this.bufCount % this.width,
        appendCount;

    if(!remain)
      return;

    appendCount = this.width - remain;
    this.content += toByte(appendCount, flag);
    this.bufCount += appendCount;

    return this;
  }
  toBinary(){
    let w = toByte(this.width),
        h = toByte(this.height);

    return w + h + this.content;
  }
/**
 * 将数据内容转成二进制后再按最大位长度转成整数数组
 */
  toBigInt(){
    let data = this.toBinary(),
        len = data.length,
        ret = [];

    for(let i=0; i < len; ){
      ret.push(toInt(data.substr(i,maxBitLength)));

      //存储最后一段的位长度
      if(len - i <= maxBitLength)
        ret.push(len - i);

      i += maxBitLength;
    }

    return ret;
  }

/**
 * 解压数据内容，转成像素数组
 * @param {int Array|int} datas
 * 第一个整数首字节是宽度，第二字节是长度
 * return 返回解析后的数组，1表示要填充像素，0是不填充
 */
  static parseData(datas){

    datas = [].concat(datas);

    let firstData = datas[0],
        firstLen = datas.length == 2 ? datas[1] : maxBitLength;

    let firstBinaryData = preAppend(firstData.toString(2), firstLen),
        ret = [],
        len = datas.length;

    const width = toInt(firstBinaryData.substr(0,8)),
          height = toInt(firstBinaryData.substr(8,8));

    firstBinaryData = firstBinaryData.substr(16);
    ret = resolveContent(firstBinaryData);

    for(let i = 1; i < len - 1; i++){
      let itemCount = maxBitLength,
          item;

      if(len-2 === i)
        itemCount = datas[len-1];

      item = preAppend(datas[i].toString(2), itemCount);
      ret = ret.concat(resolveContent(item));
    }

    return ret;

    function resolveContent(item){
      let len = item.length,
          ret = [];

      for(let i=0; i < len;){
        let temp = item.substr(i,8);

        ret = ret.concat(fillArray(temp.charAt(0), toInt(temp.substr(1))));
        i += 8;
      }

      return ret;
    }
  }
}

function toInt(value){
  return parseInt(value,2);
}
function toByte(val,flag){
  let data = (val*1).toString(2);

  data = '00000000' + data;

  if(typeof flag == 'undefined')
    return data.substr(-8);

  return flag + data.substr(-7);
}
function fillArray(val,count){
  return new Array(count+1).join(val).split('');
}
function preAppend(val,count){
  if(val.length >= count)
    return val;

  let distance = count - val.length + 1;

  return new Array(distance).join(0) + val;
}

export default PixelWord;
