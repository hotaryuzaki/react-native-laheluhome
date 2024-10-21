# Welcome to your Lahelu Home App 👋

Create and build a React Native app for Lahelu home page (https://lahelu.com/). You should provide a Github link and the .apk after finishing this assignment. Extra point if you could make the application deployable as a website (react-native-web).

### Navigation:
This page consists of top tabs (Home, Fresh, Trending), sidebar ("Meme lain", "Jelajah", etc), and bottom tabs (5 buttons below). You could implement blank pages for all the routes other than the home page.

### Feature:
- The home page consists of a virtualized infinite scroll containing posts (you need to simulate post fetching). A post could be an image or video where both must have a fixed aspect ratio to prevent layout shifting when loading the media.
- Videos should be autoplayed once entering the viewport, they also have a pause/play button, mute button, and slider to control the timeline.
- Extra point if you could zoom in the image/video through pinching motion. Behaviour would be similar to Instagram's posts.
- Each post has a user avatar, user username, create date, hashtags, and some necessary buttons. We suggest that you could mimic the layout based on our app.

### Code quality:
We assess the feature functionality, UI accuracy (colors, paddings, sizes, etc), and most importantly code quality. Here are some criteria that we are looking towards:
- Everything must be strongly typed through Typescript
- Hardcoded colors, numbers, or other variables should be avoided
- Unify components such as icons and buttons. Make sure to reuse and prevent redundant components
- Styles and components must not be nested into a single file, split them into different files (Component/index.tsx & Component/style.ts)
- Extra points if you use Eslint (preferably AirBnB style) & Prettier
- Use comments // Code comment on codes that are not straight forward

### Deadline: 7 Days