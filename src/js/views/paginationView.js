import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _curPage;
  _numPages;

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      console.log(btn);

      const goToPage = +btn.dataset.goto;
      console.log(goToPage);

      handler(goToPage);
    });
  }

  _generateMarkup() {
    this._curPage = this._data.page;
    this._numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(this._numPages, this._curPage);
    // Page 1, and there are other pages
    if (this._curPage === 1 && this._numPages > 1) {
      return this._generateMarkupNext();
    }
    // Last page
    if (this._curPage === this._numPages && this._numPages > 1) {
      return this._generateMarkupPrev();
    }
    // Other page
    if (this._curPage < this._numPages) {
      return [this._generateMarkupNext(), this._generateMarkupPrev()].join('');
    }

    // Page 1, and there are NO other pages
    return '';
  }

  _generateMarkupNext() {
    return `
    <button data-goto="${
      this._curPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${this._curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
      `;
  }

  _generateMarkupPrev() {
    return `
    <button data-goto="${
      this._curPage - 1
    }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
       <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${this._curPage - 1}</span>
   </button>
    `;
  }
}

export default new PaginationView();
