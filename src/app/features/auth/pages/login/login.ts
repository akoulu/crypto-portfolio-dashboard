import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [RouterLink, MatIcon],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {}
