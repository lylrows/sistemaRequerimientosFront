import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from '../models/user';
import { Role } from '../models/role';

const users: User[] = [
  /*{
    id: 1,
    img: 'assets/images/user/admin.png',
    username: 'admin@efitec.pe',
    password: 'admin@123',
    firstName: 'Admin',
    lastName: 'Efitec',
    role: Role.Admin,
    token: 'admin-token',
    nombres: 'nombres',
    apellidos: 'apellidos',
  },
  {
    id: 2,
    img: 'assets/images/user/client.png',
    username: 'cliente@efitec.pe',
    password: 'cliente@123',
    firstName: 'Cliente',
    lastName: 'Efitec',
    role: Role.Cliente,
    token: 'cliente-token',
    nombres: 'nombres',
    apellidos: 'apellidos',
  },
  {
    id: 3,
    img: 'assets/images/user/support.png',
    username: 'soporte@efitec.pe',
    password: 'soporte@123',
    firstName: 'Soporte',
    lastName: 'Efitec',
    role: Role.Soporte,
    token: 'soporte-token',
    nombres: 'nombres',
    apellidos: 'apellidos',
  },*/
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;
    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(handleRoute));

    function handleRoute() {
      switch (true) {
        case url.endsWith('/authenticate') && method === 'POST':
          return authenticate();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function authenticate() {
      const { username, password } = body;
      const user = users.find(
        (x) => x.username === username && x.password === password
      );
      if (!user) {
        return error('Nombre de usuario o contraseña incorrectos');
      }
      return ok({
        id: user.id,
        img: user.img,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        token: user.token,
      });
    }

    // helper functions

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
