const { 
  CollectGravatarIcons,
  CollectTwitterIcons,
  ProcessIcons
} = require("./application");

const collectGravatarIcons = new CollectGravatarIcons();
const collectTwitterIcons = new CollectTwitterIcons();

const handler = async () => {
  try {    
    const gravatarIcons = await collectGravatarIcons.execute();
    const twitterIcons = await collectTwitterIcons.execute();
    const processIcons = new ProcessIcons([
      ...gravatarIcons, ...twitterIcons
    ]);
    await processIcons.execute();
  } catch (error) {
    console.error("publish failed: ", error);
    throw error;
  }
};

exports.handler = handler;
