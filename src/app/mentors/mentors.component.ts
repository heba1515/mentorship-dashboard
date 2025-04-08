import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { mentor } from '../interfaces/mentor';
import { MentorsService } from '../services/mentors.service';

@Component({
  selector: 'app-mentors',
  imports: [CommonModule, FormsModule],
  templateUrl: './mentors.component.html',
  styleUrl: './mentors.component.css'
})

export class MentorsComponent {
  mentors: mentor[] = [];

  constructor(private mentorsService: MentorsService) {}

  ngOnInit() {
    this.fetchMentors();
  }


  fetchMentors() {
    this.mentorsService.getMentors().subscribe(
      (data) => {
        this.mentors = data;
      },
      (error) => {
        console.error('Error fetching mentors:', error);
      }
    );
  }

}
