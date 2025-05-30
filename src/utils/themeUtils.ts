// src/utils/themeUtils.ts
export const resolveBackground = (bg: string): string => {
    switch (bg) {
      case 'bw-gradient':
        return 'linear-gradient(135deg, white, black)';
      case 'rainbow-gradient':
        return `repeating-linear-gradient(
          135deg,
          red 0% 5%,
          orange 5% 10%,
          yellow 10% 15%,
          green 15% 20%,
          blue 20% 25%,
          indigo 25% 30%,
          violet 30% 35%
        )`;
      default:
        return bg;
    }
  };
  