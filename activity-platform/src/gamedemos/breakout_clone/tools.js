let tools = {
  formatCounter(second){
    let min = Math.floor(second /60),
        sec = second % 60

    min = ('00' + min).substr(-2);
    sec = ('00' + sec).substr(-2);
    return min + ':' + sec;
  }
};



module.exports = tools;