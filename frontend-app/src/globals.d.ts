declare var __webpack_public_path__: string;
declare var __API_HOST__: string;

interface IPHPApp {
  user: {
    name: string;
    email: string;
  };
  logged: boolean;
}
declare const PHPApp: IPHPApp;

interface Window {
  STATIC_URL: string;
  PHPApp: IPHPApp;
}
