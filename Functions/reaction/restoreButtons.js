module.exports = (message, buttons) => {
    const buttonProperties = [
      'inputButton',
      'confirmButton',
      'attackButton',
      'claimButton',
      'rollLeft',
      'playButton',
      'historyButton',
      'previousButton',
      'nextButton',
      'energyButton',
    ];
  
    for (const property of buttonProperties) {
      const button = message[property];
      add(button, buttons);
    }
  };
  
  function add(button, buttons) {
    if (button) {
      buttons.addComponents(button);
    }
  }