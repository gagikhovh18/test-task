import {Injectable, Inject} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser'
import {DOCUMENT} from '@angular/common';
import {LogicalFileSystem} from "@angular/compiler-cli";

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(@Inject(DOCUMENT) private dom, private meta: Meta, private titleService: Title) {

  }

  generateTags(title: string) {
    this.titleService.setTitle(title)
    this.meta.addTags([
      {
        name: 'needed_name',
        content: 'content',
      }
    ])
  }

  setCanonicalURL(data) {
    console.log(data)
    if (data) {
      for (let key in data) {
        const canURL = data ? this.dom.URL : data[key];
        const link: HTMLLinkElement = this.dom.createElement('link');
        link.setAttribute('rel', 'canonical');
        link.setAttribute('hreflang', key)
        this.dom.head.appendChild(link);
        link.setAttribute('href', canURL);
      }
    }

  }

}
