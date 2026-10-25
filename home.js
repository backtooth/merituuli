function updateExhibitions(now = new Date()) {
  const section = document.querySelector('[data-exhibitions]');
  if (!section) return;

  let activeExhibitions = 0;

  section.querySelectorAll('[data-exhibition-end]').forEach((card) => {
    const endTime = new Date(card.dataset.exhibitionEnd);
    const hasEnded = Number.isNaN(endTime.getTime()) || now.getTime() > endTime.getTime();

    if (hasEnded) {
      card.remove();
      return;
    }

    card.hidden = false;
    activeExhibitions += 1;
  });

  section.hidden = activeExhibitions === 0;
}

updateExhibitions();
