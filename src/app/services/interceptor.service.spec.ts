import { HttpHandler, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { InterceptorService } from "./interceptor.service";

describe('Interceptor class ', () => {
    let interceptor: InterceptorService;
    let next: HttpHandler;
    //interceptor = new InterceptorService();
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [InterceptorService]
        });
        interceptor = TestBed.inject(InterceptorService);
    });
    it('should be created. ', () => {
        expect(interceptor).toBeTruthy();
    });
    it('should call intercept. ', () => {
        //HttpRequest<any>, next: HttpHandler
        let req: HttpRequest<any>;
        next = jasmine.createSpyObj('HttpHandler', ['handle']);
        //spyOn(next, 'handle');
        interceptor.intercept(req, next);
        //const spy = jasmine.createSpyObj('InterceptorService', ['intercept']);
        expect(next.handle).toHaveBeenCalled();
    });
});