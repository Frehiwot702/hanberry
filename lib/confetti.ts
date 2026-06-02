import confetti from "canvas-confetti"

export const launchSuccessConfetti = () => {
    confetti({
        particleCount: 80,
        spread: 70,
        origin: {
            x: 0.3, y: 0.7,
        },
        colors: ["#E7C9B6", "#000000", "#FFFFFF",],
        shapes: ["circle"], // circle, square
     })

     confetti({
      particleCount: 80,
      spread: 70,

      origin: {
        x: 0.7, y: 0.7,
      },
      colors: [ "#D4A373", "#F5E6DA", "#000000",],
      shapes: ["circle"],
    });
}