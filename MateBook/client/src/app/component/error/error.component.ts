import { Component, Input } from '@angular/core';

@Component({
    selector: 'error',
    templateUrl: './error.component.html'
})
export class ErrorComponent {
    @Input() message: string | null = null;
}