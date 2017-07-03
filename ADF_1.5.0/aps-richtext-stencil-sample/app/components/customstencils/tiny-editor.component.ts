import {
  Component,
  AfterViewInit,
  EventEmitter,
  OnDestroy,
  Input,
  Output,
  NgModule,
  ViewChild
} from '@angular/core';

import { WidgetComponent } from 'ng2-activiti-form';
import 'tinymce';
import 'tinymce/themes/modern';
import 'tinymce/plugins/table';
import 'tinymce/plugins/link';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/lists';


declare var tinymce: any;

@Component({
  selector: 'app-tiny-editor',
  template: `<textarea id="{{elementId}}"></textarea>`
})
export class TinyEditorComponent implements AfterViewInit, OnDestroy {
  @Input() elementId: String;
  @Input() contentValue: String;
  @Output() onEditorContentChange = new EventEmitter();

  editor;

  ngAfterViewInit() {
    tinymce.init({
      selector: '#' + this.elementId,
      plugins: ['link', 'table', 'advlist', 'lists'],
      skin_url: 'skins/lightgray',
      setup: editor => {
        this.editor = editor;
        editor.on('init', () => {

          if (this.contentValue) {
            this.editor.setContent(this.contentValue);
          }
        });
        editor.on('keyup change', () => {
          const content = editor.getContent();
          this.onEditorContentChange.emit(content);
        });
      }
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}

// A wrapper over rich-text-editor component.
@Component({
  selector: 'rich-text-editor',
  templateUrl: 'rich-text-editor.html'
})
export class RichTextEditor extends WidgetComponent {

  @ViewChild(TinyEditorComponent) tinyEditor: TinyEditorComponent;

  keyupHandler(event: any) {
    this.field.value = this.tinyEditor.editor.getContent();
  }
}

@NgModule({
  declarations: [TinyEditorComponent, RichTextEditor],
  exports: [TinyEditorComponent, RichTextEditor],
  entryComponents: [TinyEditorComponent, RichTextEditor]
})

export class TinyEditorModule { }
