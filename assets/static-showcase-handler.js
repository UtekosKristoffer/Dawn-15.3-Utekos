class StaticShowcaseHandler {
  constructor(sectionElement) {
    this.sectionElement = sectionElement;
    if (!this.sectionElement) {
      return;
    }

    this.modal = document.getElementById('product-quick-view-modal');
    this.closeModalButton = document.getElementById('close-modal-button');
    this.modalContentArea = document.getElementById('modal-content-area');

    this.initAnimatedCards();
    this.initQuickViewModal();
  }

  initAnimatedCards() {
    const animatedCards = this.sectionElement.querySelectorAll('.showcase-product-card');

    if (animatedCards.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            entry.target.classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      animatedCards.forEach(card => observer.observe(card));
    }
  }

  initQuickViewModal() {
    if (!this.modal || !this.closeModalButton || !this.modalContentArea) {
      return;
    }

    const openModal = (url) => {
      if (!url || url === '#') { // Ikke åpne modal hvis URL mangler
        console.warn('StaticShowcaseHandler: Quick view URL is missing or invalid for a plus button.');
        return;
      }
      this.modalContentArea.innerHTML = `<iframe src="${url}?view=quick_view" class="w-full h-[75vh] border-0 rounded-md" title="Produktvisning"></iframe>`;
      this.modal.classList.remove('hidden');
      this.modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      this.modal.classList.add('hidden');
      this.modal.classList.remove('flex');
      this.modalContentArea.innerHTML = '';
      document.body.style.overflow = '';
    };

    this.sectionElement.querySelectorAll('.plus-button-showcase').forEach(btn => {
      if (!btn.dataset.modalListenerAttachedSc) { // Unikt dataset-attributt for denne handleren
        btn.addEventListener('click', function () { openModal(this.dataset.productUrl); });
        btn.dataset.modalListenerAttachedSc = 'true';
      }
    });

    if (!this.closeModalButton.dataset.globalModalListenerAttachedSc) {
      this.closeModalButton.addEventListener('click', closeModal);
      this.closeModalButton.dataset.globalModalListenerAttachedSc = 'true';
    }
    if (!this.modal.dataset.globalModalListenerAttachedSc) {
      this.modal.addEventListener('click', e => { if (e.target === this.modal) closeModal(); });
      this.modal.dataset.globalModalListenerAttachedSc = 'true';
    }
    if (!document.body.dataset.globalEscListenerAttachedModalSc) { // Unikt dataset-attributt
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && this.modal && !this.modal.classList.contains('hidden')) closeModal();
      });
      document.body.dataset.globalEscListenerAttachedModalSc = 'true';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.static-product-showcase-wrapper[data-section-id]').forEach(sectionEl => {
    new StaticShowcaseHandler(sectionEl);
  });
});
