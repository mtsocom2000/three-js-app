import TetrisApp from './tetrisApp';
export function startApp() {
  const tetrisApp = new TetrisApp();
  tetrisApp.init();
  tetrisApp.hookEvents();
}
