import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(key: string, token: string) {
    return localStorage.setItem(key, token);
  }

  deleteToken(key: string) {
    localStorage.removeItem(key)
  }

  getToken(key: string) {
    return localStorage.getItem(key) ?? '';
  }

  hasToken(key: string) {
    if (typeof localStorage == 'undefined') return false;
    return !!this.getToken(key);

  }

  getRole(key: string) : string {
    if(this.getToken(key) != '') {
      return JSON.parse(this.getToken(key)).role;
    } 
    else{
      return '';}
    }

    hasValidToken(): boolean {
      const token = this.getToken('user'); // Supondo que o token esteja salvo como 'accessToken'
      if (!token) return false; // Se não houver token, já retornamos falso
  
      try {
        const tokenPayload = JSON.parse(atob(token.split('.')[1])); // Decodifica a parte do payload do JWT
        const expiration = tokenPayload.exp * 1000; // Converter de segundos para milissegundos
        return expiration > Date.now(); // Retorna verdadeiro se o token ainda não expirou
      } catch (error) {
        return false; // Se houver erro ao decodificar o token, ele é inválido
      }
    }
  
}
