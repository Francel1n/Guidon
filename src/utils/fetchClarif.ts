///////////////////////////////////////////////////////////////////////////////////////////////////
// In this section, we set the user authentication, user and app ID, model details, and the URL
// of the image we want as an input. Change these strings to run your own example.
//////////////////////////////////////////////////////////////////////////////////////////////////
export const fetchClarif = async (image_url: string) => {
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = 'e3fbcdfee7404e4c840a75905bda273d';
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = 'clarifai';
  const APP_ID = 'main';
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = 'apparel-detection';
  const MODEL_VERSION_ID = '1ed35c3d176f45d69d2aa7971e6ab9fe';
  const IMAGE_URL =
    'https://www.pull-in.com/media/catalog/product/d/n/dng-cargobgarden-6.jpg';

  ///////////////////////////////////////////////////////////////////////////////////
  // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
  ///////////////////////////////////////////////////////////////////////////////////

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: image_url,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: 'Key ' + PAT,
    },
    body: raw,
  };

  // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
  // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
  // this will default to the latest version_id

  async function fetchData() {
    try {
      const response = await fetch(
        'https://api.clarifai.com/v2/models/' +
          MODEL_ID +
          '/versions/' +
          MODEL_VERSION_ID +
          '/outputs',
        requestOptions,
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      const output = result.outputs[0];
      console.log('Vêtement: ', output.data.regions[0].data.concepts[0].name);
      const clothingType = output.data.regions[0].data.concepts[0].name;

      return clothingType; // Vous pouvez retourner la variable si nécessaire
    } catch (error) {
      console.error('error', error);
      throw error; // Vous pouvez gérer l'erreur ici ou la propager à l'appelant
    }
  }

  // Utilisez la fonction fetchData
  return fetchData()
    .then(result => {
      // Faites quelque chose avec le résultat si nécessaire
      return result;
    })
    .catch(error => {
      // Gérez l'erreur si nécessaire
      throw error;
    });
};
