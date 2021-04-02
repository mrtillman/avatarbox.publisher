const { AvbxGravatarClient } = require('avatarbox.sdk');
const { partition } = require('./partition');

const handler = async () => {

  try {
    
    const avbx = new AvbxGravatarClient();
    const icons = await avbx.collect();
    const process = icons => (
      avbx.touch(...icons.map(icon => icon.id))
    );

    if(!icons || !icons.length) {
      console.info("found 0 Gravatars");
      return;
    }

    if(icons.length <= 10){
      await process(icons);
    } else {
      const batches = partition(icons);
      await Promise.all(
        batches.map(process)
      );
    }
    
    console.info(`found ${icons.length} Gravatars`);
    
  } catch (err) {
    console.error("publish failed: ", err);
    throw err;
  }

};

exports.handler = handler;
