/* tslint:disable */

// Angular
import '@angular/common';
import '@angular/core';
import '@angular/http';
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/router';

// RxJS
import 'rxjs';

// hammerjs
import 'hammerjs';

// Alfresco
import 'alfresco-js-api';
import '@alfresco/adf-core';
import '@alfresco/adf-content-services';
import '@alfresco/adf-process-services';
import '@alfresco/adf-insights';

import 'chart.js';
import 'ng2-charts';
require('script-loader!raphael/raphael.min.js');

require('script-loader!moment/min/moment.min.js');

require('pdfjs-dist/web/compatibility.js');

// Setting worker path to worker bundle.
let pdfjsLib = require('pdfjs-dist');
pdfjsLib.PDFJS.workerSrc = 'pdf.worker.js';

require('pdfjs-dist/web/pdf_viewer.js');
