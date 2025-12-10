import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchNote'
})
export class SearchNotePipe implements PipeTransform {

  transform(notes: any[], searchNote:string): any[] {
    return notes.filter((note)=>{
      return note.title.toUpperCase().includes(searchNote.toUpperCase())
    });
  }

}
