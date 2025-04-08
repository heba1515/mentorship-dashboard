import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { mentor } from '../interfaces/mentor';
import { MentorsService } from '../services/mentors.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-mentors',
  imports: [CommonModule, FormsModule, SpinnerComponent],
  templateUrl: './mentors.component.html',
  styleUrl: './mentors.component.css'
})

export class MentorsComponent {
  mentors: mentor[] = [];
  isLoading: boolean = false;

  constructor(private mentorsService: MentorsService) {}

  ngOnInit() {
    this.fetchMentors();
  }


  fetchMentors() {
    this.isLoading = true;
    this.mentorsService.getMentors().subscribe(
      (data) => {
        this.mentors = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching mentors:', error);
        this.isLoading = false;
      }
    );
  }

}
