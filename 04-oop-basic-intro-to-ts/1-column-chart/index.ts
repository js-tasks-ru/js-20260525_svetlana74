import { createElement } from "../../shared/utils/create-element";
// const randomData = Array.from(
//   { length: 10 },
//   () => Math.floor(Math.random() * 100) + 1
//);
interface Options {
  data?: number[];
  label?: string;
  value?: number;
  link?: string;
  formatHeading?: (value: number) => string;
}

export default class ColumnChart {
  element: HTMLElement;
  subElements: Record<string, HTMLElement> = {};
  chartHeight = 50;
  constructor({
    data = [],
    label = '',
    value = 0,
    link = '',
    formatHeading = value => String(value),
  }
  : Options = {}) {
    this.element = createElement(`
      <div class="column-chart ${data.length === 0 ? 'column-chart_loading' : ''}" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
          Total ${label}
          ${link ? `<a href="${link}" class="column-chart__link">View all</a>` : ''}
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">
            ${formatHeading(value)}
          </div>
          <div data-element="body" class="column-chart__chart">
            ${this.getColumnBody(data)}
          </div>
        </div>
      </div>
    `);
    this.subElements = this.getSubElements();
  }
  getColumnBody(data: number[]): string {
    if (data.length === 0) {
      return '';
    }
  
    const maxValue = Math.max(...data);
    const scale = this.chartHeight / maxValue;
  
    return data
      .map(item => {
        const value = Math.floor(item * scale);
        const percent = ((item / maxValue) * 100).toFixed(0);
  
        return `<div style="--value: ${value}" data-tooltip="${percent}%"></div>`;
      })
      .join('');
  }  
  getSubElements(): Record<string, HTMLElement> {
    const result: Record<string, HTMLElement> = {};
    const elements = this.element.querySelectorAll('[data-element]');

    elements.forEach(element => {
      const name = element.getAttribute('data-element');

      if (name) {
        result[name] = element as HTMLElement;
      }
    });

    return result;
  }

  update(data: number[]): void {
    this.subElements.body.innerHTML = this.getColumnBody(data);

    if (data.length === 0) {
      this.element.classList.add('column-chart_loading');
    } else {
      this.element.classList.remove('column-chart_loading');
    }
  }

  remove(): void {
    this.element.remove();
  }

  destroy(): void {
    this.remove();
    this.subElements = {};
  }
}
