import { Component, Input } from  '@angular/core';


@Component({
    templateUrl: './post.component.html',
    selector: 'post'
})
export class PostComponent {

    @Input() author: { id: number, name: string} | null = null;
    @Input() content: string = '';
    @Input() time: string = ''
}