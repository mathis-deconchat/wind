import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import * as echarts from 'echarts';
import { provideEchartsCore } from 'ngx-echarts';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';


bootstrapApplication(AppComponent, {
  providers: [
    provideEchartsCore({ echarts }),
    provideRouter(routes)
  ]
}).catch(err => console.error('Error bootstrapping app:', err));