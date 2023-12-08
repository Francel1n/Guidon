///////////////////////////////////////////////////////////////////////////////////////////////////
// In this section, we set the user authentication, user and app ID, model details, and the URL
// of the image we want as an input. Change these strings to run your own example.
//////////////////////////////////////////////////////////////////////////////////////////////////
export const fetchClarif = () => {
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
    'https://tbs-tbs-storage.omn.proximis.com/Imagestorage/imagesSynchro/740/740/f8a9c07229d748a211bb136312d35774d95f7dd3_circepul19622_2_2_.jpg';

//   const x = {
//     status: {
//       code: 10000,
//       description: 'Ok',
//       req_id: 'e8f093371c6b29ca23fb9c8205364c91',
//     },
//     outputs: [
//       {
//         id: 'df297493e1f24966b7eaf1fdf468923f',
//         status: {code: 10000, description: 'Ok'},
//         created_at: '2023-12-04T20:40:13.526378184Z',
//         model: {
//           id: 'apparel-detection',
//           name: 'apparel',
//           created_at: '2019-11-18T16:42:51.109295Z',
//           modified_at: '2023-03-14T15:14:05.852885Z',
//           app_id: 'main',
//           model_version: {
//             id: '1ed35c3d176f45d69d2aa7971e6ab9fe',
//             created_at: '2019-11-18T16:42:51.233234Z',
//             status: {code: 21100, description: 'Model is trained and ready'},
//             visibility: {gettable: 50},
//             app_id: 'main',
//             user_id: 'clarifai',
//             metadata: {},
//           },
//           user_id: 'clarifai',
//           model_type_id: 'visual-detector',
//           visibility: {gettable: 50},
//           toolkits: [],
//           use_cases: [],
//           languages: [],
//           languages_full: [],
//           check_consents: [],
//           workflow_recommended: false,
//         },
//         input: {
//           id: '74c8ee5991c24129b051778339173f5a',
//           data: {
//             image: {
//               url: 'https://tbs-tbs-storage.omn.proximis.com/Imagestorage/imagesSynchro/740/740/f8a9c07229d748a211bb136312d35774d95f7dd3_circepul19622_2_2_.jpg',
//             },
//           },
//         },
//         data: {
//           regions: [
//             {
//               id: '18e44dbed2e800bac258feff354d33b6',
//               region_info: {
//                 bounding_box: {
//                   top_row: 0.12611839,
//                   left_col: 0.036472775,
//                   bottom_row: 0.84677774,
//                   right_col: 0.9603288,
//                 },
//               },
//               data: {
//                 concepts: [
//                   {
//                     id: 'ai_nrTL5JlX',
//                     name: 'top',
//                     value: 0.99808073,
//                     app_id: 'main',
//                   },
//                 ],
//               },
//               value: 0.99808073,
//             },
//           ],
//         },
//       },
//     ],
//   };

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
            url: IMAGE_URL,
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

  fetch(
    'https://api.clarifai.com/v2/models/' +
      MODEL_ID +
      '/versions/' +
      MODEL_VERSION_ID +
      '/outputs',
    requestOptions,
  )
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};
