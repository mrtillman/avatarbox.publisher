const { AvbxGravatarClient } = require("avatarbox.sdk");

class CollectGravatarIcons {
  constructor(){
    this.client = new AvbxGravatarClient()
  }
  async execute(){
    return await this.client.collect() || [];
  }
}

module.exports = { CollectGravatarIcons }