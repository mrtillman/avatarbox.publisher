const { AvbxGravatarClient } = require('avatarbox.sdk');

const handler = async () => {

  try {
    
    const client = new AvbxGravatarClient();

    const emails = await client.collect();

    if(!emails || !emails.length){
      console.info('no Gravatars found');
      return;
    }

    await Promise.all(
      emails.map(email => client.touch(email))
    );
    
    console.info(`found ${emails.length} Gravatars`);
    
  } catch (err) {
    console.error("publish failed: ", err);
    throw err;
  }

};

exports.handler = handler;
