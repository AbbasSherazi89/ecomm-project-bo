import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  template: `
    <div class="mt-4">
      <button class="btn btn-primary">Primary Button</button>
      <button class="btn btn-success ms-2">Success Button</button>
      <button class="btn btn-danger ms-2">Danger Button</button>

      <div class="alert alert-info mt-3">Bootstrap is working!</div>

      <div class="row mt-3">
        <div class="col-md-6 bg-light p-3">Column 1</div>
        <div class="col-md-6 bg-secondary text-white p-3">Column 2</div>
      </div>
    </div>
  `,
  styles: ``,
})
export class Home {}
