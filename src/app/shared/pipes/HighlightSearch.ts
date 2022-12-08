/*
* ========================================================================
* (c) Copyright 2022 Micro Focus or one of its affiliates.
* ========================================================================
*/
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'highlightSearch' })
export class HighlightSearch implements PipeTransform {
  transform(text: string, filter: string): string {
    const highlightIndex = text.toLowerCase().indexOf(filter.toLowerCase());
    return (highlightIndex < 0) ?
      text :
      text.substr(0, highlightIndex) +
      '<b>' + text.substr(highlightIndex, filter.length) + '</b>' +
      text.substr(highlightIndex + filter.length);
  }
}