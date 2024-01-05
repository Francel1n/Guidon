///////////////////////////////////////////////////////////////////////////////////////////////////
// In this section, we set the user authentication, user and app ID, model details, and the URL
// of the image we want as an input. Change these strings to run your own example.
//////////////////////////////////////////////////////////////////////////////////////////////////

const PAT = 'e3fbcdfee7404e4c840a75905bda273d';
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = 'clarifai';
const APP_ID = 'main';
// Change these to whatever model and image URL you want to use
const MODEL_ID__COLOR = 'color-recognition';
const MODEL_VERSION_ID__COLOR = 'dd9458324b4b45c2be1a7ba84d27cd04';

const MODEL_ID__TYPE = 'apparel-detection';
const MODEL_VERSION_ID__TYPE = '1ed35c3d176f45d69d2aa7971e6ab9fe';

const IMAGE_URL =
  'https://www.pull-in.com/media/catalog/product/d/n/dng-cargobgarden-6.jpg';

const w = {
  _bodyBlob: {
    _data: {
      __collector: [Object],
      blobId: '4A1EFEBF-5D73-4F1F-B1A1-59B76D924D6E',
      name: 'outputs.json',
      offset: 0,
      size: 205,
      type: 'application/json',
    },
  },
  _bodyInit: {
    _data: {
      __collector: [Object],
      blobId: '4A1EFEBF-5D73-4F1F-B1A1-59B76D924D6E',
      name: 'outputs.json',
      offset: 0,
      size: 205,
      type: 'application/json',
    },
  },
  bodyUsed: false,
  headers: {
    map: {
      'access-control-allow-headers':
        'Content-Type,Accept,X-Requested-With,Content-Type,Referer,Accept-Encoding,X-CSRF-Token,Authorization,X-Clarifai-Application-Id,X-Clarifai-REST-API-Key,X-Clarifai-Session-Token,X-Clarifai-Client,X-Clarifai-Site,X-RapidAPI-User,x-clarifai-request-id-prefix,x-request-id',
      'access-control-allow-methods': 'GET,HEAD,POST,PUT,PATCH,OPTIONS,DELETE',
      'access-control-allow-origin': '*',
      'content-length': '205',
      'content-type': 'application/json; charset=UTF-8',
      date: 'Thu, 04 Jan 2024 15:16:53 GMT',
      'grpc-metadata-content-type': 'application/grpc',
      'strict-transport-security': 'max-age=15724800; includeSubDomains',
      'x-clarifai-request-id': 'ba766cbb8175dafde39d525f7d9761f9',
    },
  },
  ok: false,
  status: 400,
  statusText: '',
  type: 'default',
  url: 'https://api.clarifai.com/v2/models/eeed0b6733a644cea07cf4c60f87ebb7/outputs',
};

const x = {
  _bodyBlob: {
    _data: {
      __collector: [Object],
      blobId: '52E1C49D-5CCE-41C8-B239-F3010363D0D3',
      name: 'outputs.json',
      offset: 0,
      size: 1234,
      type: 'application/json',
    },
  },
  _bodyInit: {
    _data: {
      __collector: [Object],
      blobId: '52E1C49D-5CCE-41C8-B239-F3010363D0D3',
      name: 'outputs.json',
      offset: 0,
      size: 1234,
      type: 'application/json',
    },
  },
  bodyUsed: false,
  headers: {
    map: {
      'access-control-allow-headers':
        'Content-Type,Accept,X-Requested-With,Content-Type,Referer,Accept-Encoding,X-CSRF-Token,Authorization,X-Clarifai-Application-Id,X-Clarifai-REST-API-Key,X-Clarifai-Session-Token,X-Clarifai-Client,X-Clarifai-Site,X-RapidAPI-User,x-clarifai-request-id-prefix,x-request-id',
      'access-control-allow-methods': 'GET,HEAD,POST,PUT,PATCH,OPTIONS,DELETE',
      'access-control-allow-origin': '*',
      'content-length': '1234',
      'content-type': 'application/json; charset=UTF-8',
      date: 'Thu, 04 Jan 2024 16:35:20 GMT',
      'grpc-metadata-content-type': 'application/grpc',
      'strict-transport-security': 'max-age=15724800; includeSubDomains',
      'x-clarifai-request-id': 'db3c5f11bd2147209ca116105f6b8aae',
    },
  },
  ok: true,
  status: 200,
  statusText: '',
  type: 'default',
  url: 'https://api.clarifai.com/v2/models/color-recognition/versions/dd9458324b4b45c2be1a7ba84d27cd04/outputs',
};

export const fetchClarif = async (image_url: string) => {
  // const color = await fetchColorData(image_url);
  // Your PAT (Personal Access Token) can be found in the portal under Authentification

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
          MODEL_ID__TYPE +
          '/versions/' +
          MODEL_VERSION_ID__TYPE +
          '/outputs',
        requestOptions,
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(response, 'yoo');
      const result = await response.json();
      const output = result.outputs[0];
      console.log('Vêtement: ', output.data.regions[0].data.concepts[0]);
      const clothingType = output.data.regions[0].data.concepts[0].name;
      console.log('yooo', clothingType);

      return clothingType; // Vous pouvez retourner la variable si nécessaire
    } catch (error) {
      console.error('error', error);
      throw error; // Vous pouvez gérer l'erreur ici ou la propager à l'appelant
    }
  }

  async function fetchColorData() {
    const response = await fetch(
      'https://api.clarifai.com/v2/models/' +
        MODEL_ID__COLOR +
        '/versions/' +
        MODEL_VERSION_ID__COLOR +
        '/outputs',
      requestOptions,
    );

    const result = await response.json();

    console.log('COLOR', result.outputs[0].data.colors[0].raw_hex);
    return result;
  }

  // Utilisez la fonction fetchData
  const cloth = await fetchData();
  const color = await fetchColorData();

  return {cloth, color};
};
