import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Checklist } from '../../models/checklist';
import { ChecklistService } from '../../services/checklist.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-view-checklist',
  templateUrl: './view-checklist.component.html',
  styleUrls: ['./view-checklist.component.scss']
})
export class ViewChecklistComponent implements OnInit {

  role: string;
  checklist: Checklist = {role: '', sections: []};
  constructor(private route: ActivatedRoute, private checklistService: ChecklistService, private userService: UserService) {
    this.role = this.route.snapshot.paramMap.get('role');

    this.userService.getUserIdToken().subscribe((id) => {
      this.checklistService.getUserChecklist(id, this.role).subscribe((retrievedChecklist) => {
        this.checklist = retrievedChecklist.checklist;
        for (const section of this.checklist.sections) {
          for (const item of section.items) {
            if (item.trainer) {
              this.userService.getUserFullName(item.trainer).subscribe((name) => item.trainer = name);
            }
          }
        }
      });
    });

    // this.checklistService.getUserChecklist(localStorage.getItem('id_token'), this.role).subscribe((retrievedChecklist) => {
    //   console.log(retrievedChecklist)
    //   this.checklist = retrievedChecklist.checklist;
    //   console.log(this.checklist);
    // });

   }


  ngOnInit() {
  }

  private determineSectionStatus(section) {
    let status_arr = []
    for (let item of section.items) {
      status_arr.push(item.status)
    }
    if (status_arr.includes(1) || (status_arr.includes(0) && status_arr.includes(2))) {
      return 1
    } else if (status_arr.includes(0) && !(status_arr.includes(1) || status_arr.includes(2))) {
      return 0
    } else if (status_arr.includes(2) && !(status_arr.includes(1) || status_arr.includes(0))) {
      return 2
    }
  }

  private formatDate(dt){
    let date = new Date(dt);
    return ((date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear());
  }

}
