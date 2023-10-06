# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

```
frontend
├─ .babelrc
├─ .gitignore
├─ .prettierrc
├─ Dockerfile
├─ jsconfig.json
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.ico
│  ├─ index.html
│  ├─ manifest.json
│  ├─ robots.txt
│  └─ video
│     └─ aurora.mp4
├─ README.md
├─ src
│  ├─ api
│  │  ├─ api.js
│  │  └─ index.js
│  ├─ App.js
│  ├─ asset
│  │  └─ images
│  │     ├─ coala.png
│  │     ├─ colorado.png
│  │     ├─ ENFJ.png
│  │     ├─ ENFP.png
│  │     ├─ ENTJ.png
│  │     ├─ ENTP.png
│  │     ├─ errorpanda.png
│  │     ├─ ESFJ.png
│  │     ├─ ESFP.png
│  │     ├─ ESTJ.png
│  │     ├─ ESTP.png
│  │     ├─ fcon1.png
│  │     ├─ fcon2.png
│  │     ├─ fcon3.png
│  │     ├─ green-sea-turtle-8199770_1280.jpg
│  │     ├─ INFJ.png
│  │     ├─ INFP.png
│  │     ├─ INTJ.png
│  │     ├─ INTP.png
│  │     ├─ ISFJ.png
│  │     ├─ ISFP.png
│  │     ├─ ISTJ.png
│  │     ├─ ISTP.png
│  │     ├─ loading.gif
│  │     ├─ loading1.gif
│  │     ├─ logo.png
│  │     ├─ main-stamp.png
│  │     ├─ mbti-main.png
│  │     ├─ MBTI.png
│  │     ├─ mountain-8207212_1280.jpg
│  │     ├─ opening1.gif
│  │     ├─ pabicon.png
│  │     ├─ paris.png
│  │     ├─ passport-background1.png
│  │     ├─ passport-background2.png
│  │     ├─ passport-background3.png
│  │     ├─ pink-8053329_1280.jpg
│  │     ├─ profile.png
│  │     ├─ rainbow-8221835_1280.jpg
│  │     ├─ rose-8200460_1280.jpg
│  │     ├─ SignGoogle.png
│  │     ├─ SignKaKao.png
│  │     ├─ squirrel-8219439_1280.jpg
│  │     ├─ stamp2.png
│  │     ├─ stamp3.png
│  │     ├─ swan-8174925_1280.jpg
│  │     └─ troms.png
│  ├─ components
│  │  ├─ common
│  │  │  ├─ ErrorCom.jsx
│  │  │  ├─ LoadingCom.jsx
│  │  │  ├─ LoginButton.jsx
│  │  │  ├─ LoginModal.jsx
│  │  │  ├─ LoginSuccess.jsx
│  │  │  ├─ Modal.jsx
│  │  │  └─ TopTab.jsx
│  │  ├─ diary
│  │  │  ├─ AlbumList.jsx
│  │  │  ├─ countries.json
│  │  │  ├─ CountryContext.jsx
│  │  │  ├─ CountryList.jsx
│  │  │  ├─ DetailAlbum.jsx
│  │  │  ├─ WorldMap.jsx
│  │  │  └─ WorldMap0922.jsx
│  │  ├─ index.js
│  │  ├─ landing
│  │  │  ├─ LandingCard.jsx
│  │  │  ├─ LocationCard.jsx
│  │  │  └─ Opening.jsx
│  │  ├─ layout
│  │  │  └─ Layout.jsx
│  │  ├─ mypage
│  │  │  ├─ CollectedStamp.jsx
│  │  │  ├─ EmptyStamp.jsx
│  │  │  ├─ MyProfile.jsx
│  │  │  └─ MyStamps.jsx
│  │  ├─ preview
│  │  │  ├─ LocationDetail.jsx
│  │  │  └─ LocationPreview.jsx
│  │  └─ recommend
│  │     ├─ Calendar.css
│  │     ├─ Calendar.jsx
│  │     └─ CityRecommendation.jsx
│  ├─ hooks
│  │  ├─ index.js
│  │  └─ useStore.js
│  ├─ index.js
│  ├─ pages
│  │  ├─ cart
│  │  │  ├─ Cart.jsx
│  │  │  └─ Compare.jsx
│  │  ├─ common
│  │  │  ├─ Error.jsx
│  │  │  └─ Loading.jsx
│  │  ├─ detail
│  │  │  └─ Detail.jsx
│  │  ├─ diary
│  │  │  └─ Diary.jsx
│  │  ├─ index.js
│  │  ├─ landing
│  │  │  └─ Landing.jsx
│  │  ├─ mbti
│  │  │  ├─ Mbti.jsx
│  │  │  ├─ MbtiResult.jsx
│  │  │  └─ MbtiTest.jsx
│  │  ├─ mypage
│  │  │  └─ MyPage.jsx
│  │  └─ recommend
│  │     └─ Recommend.jsx
│  ├─ reportWebVitals.js
│  ├─ setupProxy.js
│  ├─ style
│  │  ├─ Globalstyles.js
│  │  ├─ index.js
│  │  └─ Theme.js
│  └─ utils
│     ├─ index.js
│     ├─ utilsApi.js
│     └─ utilsConstant.js
├─ webpack.config.js
└─ yarn.lock

```