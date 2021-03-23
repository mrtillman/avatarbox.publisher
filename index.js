const { AvbxGravatarClient } = require('avatarbox.sdk');

const handler = async () => {

  try {
    
    const avbx = new AvbxGravatarClient();

    const icons = await avbx.collect();

    if(!icons || !icons.length) {
      console.info("found 0 Gravatars");
      return;
    }

    await Promise.all(
      icons.map(icon => avbx.touch(icon.id))
    );
    
    console.info(`found ${icons.length} Gravatars`);
    
  } catch (err) {
    console.error("publish failed: ", err);
    throw err;
  }

};

exports.handler = handler;
