const { 
  SQSService
} = require("avatarbox.sdk/Release/Services/sqs.service");

class ProcessIcons {
  constructor(icons){
    this.icons = icons;
    this.sqs = new SQSService();
  }
  process(icons){
    return this.sqs.touch(...icons);
  }
  partition(collection){
    const batchSize = 10;
    let start = 0;
    let end = batchSize;
    const result = [];
    while(start < collection.length){
      result.push(collection.slice(start, end));
      start += batchSize;
      end += batchSize;
    }
    return result;
  }
  async execute(){
    const { icons } = this;
    if(!icons || !icons.length) {
      console.info("found 0 Gravatars");
      return;
    }

    if(icons.length <= 10){
      await this.process(icons);
    } else {
      const batches = this.partition(icons);
      await Promise.all(
        batches.map(this.process.bind(this))
      );
    }
  }
}

module.exports = { ProcessIcons }