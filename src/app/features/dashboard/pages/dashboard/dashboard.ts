import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { StatsCards } from '../../components/stats-cards/stats-cards';

@Component({
  selector: 'app-dashboard',
  imports: [StatsCards, MatIcon],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {}
