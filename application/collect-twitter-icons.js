const { AvbxTwitterClient } = require("avatarbox.sdk");

class CollectTwitterIcons {
  constructor(){
    this.client = new AvbxTwitterClient()
  }
  async execute(){
    return await this.client.collect() || [];
  }
}

module.exports = { CollectTwitterIcons }