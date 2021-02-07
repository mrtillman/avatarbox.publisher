const { AvbxGravatarClient } = require('avatarbox.sdk');

const handler = async () => {

  try {
    
    const client = new AvbxGravatarClient();

    const emails = await client.collect();

    if(!emails || !emails.length){
      console.info('no Gravatars found');
      return;
    }

    Promise.all(
      emails.map(email => client.touch(email))
    ).then(() => {
      console.info(`found ${emails.length} Gravatars`);
    }).catch(() => {
      console.error('publish failed.');
    })

  } catch (err) {
    console.error(err);
    throw err;
  }

};

exports.handler = handler;
