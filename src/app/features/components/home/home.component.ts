import { Component, inject, OnInit } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CardModule } from 'primeng/card';
import { NoteService } from '../../../core/services/note.service';
import { SearchNotePipe } from '../../../core/pipes/search-note.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    CardModule,
    SearchNotePipe,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  visible: boolean = false;
  visible1: boolean = false;
  userNotes: any;
  noteId: string = '';
  searchText: string = '';
  private _note = inject(NoteService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  ngOnInit(): void {
    this.getNotes();
  }

  showDialog() {
    this.visible = true;
  }

  addNoteForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    content: new FormControl(null, [Validators.required]),
  });
  updateNoteForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    content: new FormControl(null, [Validators.required]),
  });
  // add
  addNewNote() {
    this._note.addNote(this.addNoteForm.value).subscribe({
      next: (res) => {
        this.toastr.success('Add Note Success', res.msg);
        this.visible = false;
        this.getNotes();
        this.addNoteForm.reset()
      },
    });
  }
  // update
  getNoteById(note: any) {
    this.visible1 = true;
    this.noteId = note._id;
    this.updateNoteForm.patchValue(note);
  }
  updateNote() {
    this._note.updateNote(this.updateNoteForm.value, this.noteId).subscribe({
      next: (res) => {
        this.toastr.success('Update Note Success', res.msg);
        this.visible1 = false;
        this.getNotes();
      },
    });
  }
  getNotes() {
    this._note.getUserNotes().subscribe({
      next: (res) => {
        this.userNotes = res.notes;
        console.log(res);
      },
    });
  }
  deleteNote(id: string) {
    this._note.deleteNote(id).subscribe({
      next: (res) => {
        this.toastr.success('Delete Note Success', res.msg);
        this.getNotes();
      },
    });
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/signin']);
  }
}
