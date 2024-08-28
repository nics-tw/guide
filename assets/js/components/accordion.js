
document.addEventListener('DOMContentLoaded', () => {
  function handleAccordionBehavior(accordionElement, behavior) {
    const checkboxes = accordionElement.querySelectorAll('.accordion-item input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
      const accordionItem = checkbox.closest('.accordion-item');
      const content = accordionItem.querySelector('.accordion-body');
      const label = accordionItem.querySelector(`label[for="${checkbox.id}"]`);

      if (label) {
        label.addEventListener('click', (event) => {
          event.preventDefault();
          if (behavior === 'single') {
            // Ensure only one item is open
            checkboxes.forEach(cb => {
              if (cb !== checkbox) {
                cb.checked = false;
                const otherContent = cb.closest('.accordion-item').querySelector('.accordion-body');
                if (otherContent) {
                  otherContent.classList.remove('show');
                }
              }
            });
          }
          // Toggle the clicked checkbox
          checkbox.checked = !checkbox.checked;
          if (checkbox.checked) {
            content.classList.add('show');
          } else {
            content.classList.remove('show');
          }
        });
      }
    });
  }

  // Handle behavior for all accordions
  document.querySelectorAll('.accordion').forEach(accordion => {
    const behavior = accordion.dataset.behavior || 'single'; // Default to single open
    handleAccordionBehavior(accordion, behavior);
  });

  // Toggle all functionality for accordions
  document.querySelectorAll('.btn-toggle').forEach(button => {
    button.addEventListener('click', (event) => {
      for (const accordion of document.querySelectorAll('.accordion')) {
        if (accordion.getAttribute('data-behavior') != 'multiple') continue;
        const checkboxes = accordion.querySelectorAll('.accordion-item input[type="checkbox"]');
        const allOpen = Array.from(checkboxes).every(checkbox => checkbox.checked);

        checkboxes.forEach(checkbox => {
          checkbox.checked = !allOpen;
          const content = checkbox.closest('.accordion-item').querySelector('.accordion-body');
          if (content) {
            if (checkbox.checked) {
              content.classList.add('show');
            } else {
              content.classList.remove('show');
            }
          }
        });
      }
    });
  });
});
