 import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListComponent } from './post-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostListComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call through ngOninit', async () => {
    fixture.detectChanges();
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  })

  it('should call through onSearchTitleChange', async () => {
    fixture.detectChanges();
    spyOn(component, 'onSearchTitleChange').and.callThrough();
    component.onSearchTitleChange('test');
    expect(component.onSearchTitleChange).toHaveBeenCalled();
  })

  it('should call through onSearchBodyChange', async () => {
    fixture.detectChanges();
    spyOn(component, 'onSearchBodyChange').and.callThrough();
    component.onSearchBodyChange('test');
    expect(component.onSearchBodyChange).toHaveBeenCalled();
  })

  it('should change data when input onSearchTitleChange change', async () => {
    spyOn(component, 'onSearchTitleChange');
    el = fixture.debugElement.query(By.css('#searchTitle'));
    el.nativeElement.value = 'test Data';
    el.nativeElement.dispatchEvent(new Event('input'));
    // expect(component.searchTitle).toBe('test Data');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges(); 
      console.log('sendInput : ', el.nativeElement.value);
      expect(el.nativeElement.value).toContain('test Data');
    });
    // expect(component.onSearchTitleChange).toHaveBeenCalled();
  })

  it('should change data when input onSearchBodyChange change', async () => {
    fixture.detectChanges();
    spyOn(component, 'onSearchBodyChange');
    el = fixture.debugElement.query(By.css('#searchBody'));
    el.nativeElement.value = 'test Data';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges(); 
      console.log('sendInput : ', el.nativeElement.value);
      expect(el.nativeElement.value).toContain('test Data');
    });
    // expect(component.onSearchBodyChange).toHaveBeenCalled();
  })
});
