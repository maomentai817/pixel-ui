export default function () {
  if (PROD) {
    const logo = `
____________________________________________________________________________________

              _____       _____    ___________   ______  _____________
              /     \\     /     \\   \\__    ___/  /  __  \\/_   \\______  \\
            /  \\ /  \\   /  \\ /  \\    |    |     >      < |   |   /    /
            /    Y    \ /    Y    \   |    |    /   --   \|   |  /    /
            \\____|__  / \\____|__  /   |____|    \\______  /|___| /____/
                    \\/          \\/                     \\/
____________________________________________________________________________________
                              author:mmt817🐱
`;

    const rainbowGradient = `
background: linear-gradient(135deg, orange 60%, cyan);
background-clip: text;
color: transparent;
font-size: 16px; 
line-height: 1;
font-family: monospace;
font-weight: 600;
`;

    console.info(`%c${logo}`, rainbowGradient);
  } else if (DEV) {
    console.log("[PixelUI]:dev mode...");
  }
}