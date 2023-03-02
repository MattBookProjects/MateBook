import { ErrorComponent } from "./error.component";
import { TestBed, ComponentFixture } from '@angular/core/testing'

describe('Tests for error component', () => {
    it('message to be null after creating component', () => {
        let errorComponent = new ErrorComponent();
        expect(errorComponent.message).toBe(null);
    });
    it('DOM element to reflect message', () => {
        TestBed.configureTestingModule({declarations: [ErrorComponent]});
        const fixture = TestBed.createComponent(ErrorComponent);
        fixture.componentInstance.message = 'error';
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.error').textContent).toBe('error');
    });
    it('DOM element to be empty when message changed to null', () => {
        TestBed.configureTestingModule({declarations: [ErrorComponent]});
        const fixture = TestBed.createComponent(ErrorComponent);
        fixture.componentInstance.message = 'error';
        fixture.detectChanges();
        fixture.componentInstance.message = null;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.error').textContent).toBe('');
    })
})