export {};

declare global {
  interface Window {
    YT: {
      Player: new (id: string, options: object) => any;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}
