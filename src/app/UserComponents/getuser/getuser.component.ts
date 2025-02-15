import { Component } from '@angular/core';
import { UserAuth } from '../../Models/user-auth';
import { UserService } from '../../Services/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-getuser',
  standalone: true,
  imports: [NgIf],
  templateUrl: './getuser.component.html',
  styleUrl: './getuser.component.css'
})
export class GetuserComponent {
  user: UserAuth | null = null; // 🔹 Corrigido para o tipo correto
  errorMessage = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUserInfo();
  }

  // 🔹 Corrige o tipo do parâmetro recebido pela função next
  loadUserInfo(): void {
      this.userService.getUserInfo().subscribe({
      next: (data: UserAuth) => { // ✅ Alinhado com o retorno correto da API
        this.user = data;
      },
      error: (err) => {
        console.error('Erro ao carregar os dados do utilizador:', err);
        this.errorMessage = 'Erro ao obter os dados do utilizador. Tente novamente mais tarde.';
      }
    });
  }
}