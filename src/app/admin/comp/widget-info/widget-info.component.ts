import { Component, OnInit, Input } from '@angular/core';
import { WidgetInfo } from '../../../shared/views_models/widget-info';

@Component({
  selector: 'app-widget-info',
  templateUrl: './widget-info.component.html',
  styleUrls: ['./widget-info.component.scss']
})
export class WidgetInfoComponent implements OnInit {
  @Input('widget') widget: WidgetInfo;
  @Input('w_number') w_number: number;
  
  constructor() { }

  ngOnInit() {
  }

}
