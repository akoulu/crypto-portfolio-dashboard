import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  imports: [RouterLink, MatIcon],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {}
