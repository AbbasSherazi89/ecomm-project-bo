import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <div class="footer">
      <ul>
        <li><a href="#">Become a seller</a></li>
        <li><a href="#">Policies</a></li>
        <li><a href="#">Terms and Conditions</a></li>
        <li><a href="#">Help Centers</a></li>
        <li><a href="#">Help Center</a></li>
        <li><a href="#">News</a></li>
        <li><a href="#">Facebook</a></li>
        <li><a href="#">Youtube</a></li>
        <li><a href="#">FAQs</a></li>
      </ul>
    </div>
  `,
  styles: `
  
  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    width:100%;
    display: flex;
    background-COlor: rgba(0, 0, 0, 0.1);
    justify-content: center;
    align-items: center;
      ul{
        padding:0px 5%;
        margin-bottom:0px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        list-style-type: none;
        width: -webkit-fill-available;
  }
  a{
      text-decoration: none;
  }
  a:hover{
    color:blueviolet;
  }
}
  `,
})
export class Footer {}
