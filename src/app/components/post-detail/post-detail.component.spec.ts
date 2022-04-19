import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailComponent } from './post-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'

describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostDetailComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call through ngOninit',async () => {
    fixture.detectChanges();
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  })

  it('should call through getPost',async () => {
    fixture.detectChanges();
    spyOn(component, 'getPost').and.callThrough();
    component.getPost();
    expect(component.getPost).toHaveBeenCalled();
  })

  it('should call through getUser',async () => {
    fixture.detectChanges();
    spyOn(component, 'getUser').and.callThrough();
    component.getUser();
    expect(component.getUser).toHaveBeenCalled();
  })
});
