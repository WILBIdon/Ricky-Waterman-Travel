document.addEventListener("DOMContentLoaded", () => {
  const swapImages = document.querySelectorAll("img[data-hover]");
  swapImages.forEach(img => {
    const orig = img.src;
    const hover = img.getAttribute("data-hover");
    img.addEventListener("mouseenter", () => img.src = hover);
    img.addEventListener("mouseleave", () => img.src = orig);
  });
});
