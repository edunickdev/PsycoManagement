export const MainLogo = () => (
  <img className="h-8 w-8 mx-2" src="data:image/png;base64,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" />
);
