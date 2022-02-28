import {Component, OnInit, ViewChild} from '@angular/core';
import {SeoService} from "../service/seo.service";
import {GlobalService} from "../service/global.service";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  @ViewChild('newTitle') newTitle;
  public content: any;
  submitted: boolean = true;

  constructor(
    private seo: SeoService,
    private global: GlobalService
  ) {

  }

  ngOnInit(): void {

  }

  getInfo() {
    this.global.getData().subscribe(data => {
      this.content = data['content']
      this.seo.generateTags(data['title'])
      if (this.submitted) {
        data['hreflangs'].map(e => {
          this.seo.setCanonicalURL(e)
        })
        this.submitted = false;
      }
    })
  }

  changeTitle() {
    this.seo.generateTags(this.newTitle.nativeElement.value)
  }
}
